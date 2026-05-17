package com.sil.salesanalytics;

import com.sil.salesanalytics.dto.DashboardSummaryDto;
import com.sil.salesanalytics.model.SalesTransaction;
import com.sil.salesanalytics.repository.SalesTransactionRepository;
import com.sil.salesanalytics.service.SalesAnalyticsService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SalesAnalyticsServiceTest {

    @Mock
    private SalesTransactionRepository repository;

    @InjectMocks
    private SalesAnalyticsService service;

    @Test
    void getDashboardSummaryCalculatesTotalsAndMargin() {
        SalesTransaction first = transaction("1000000", "700000", "300000");
        SalesTransaction second = transaction("500000", "400000", "100000");
        when(repository.findAll()).thenReturn(List.of(first, second));

        DashboardSummaryDto summary = service.getDashboardSummary();

        assertThat(summary.totalRevenue()).isEqualByComparingTo("1500000.00");
        assertThat(summary.totalCost()).isEqualByComparingTo("1100000.00");
        assertThat(summary.totalProfit()).isEqualByComparingTo("400000.00");
        assertThat(summary.profitMargin()).isEqualByComparingTo("26.67");
        assertThat(summary.averageProjectValue()).isEqualByComparingTo("750000.00");
        assertThat(summary.transactionCount()).isEqualTo(2);
    }

    private static SalesTransaction transaction(String amount, String cost, String profit) {
        SalesTransaction transaction = new SalesTransaction();
        transaction.setAmount(new BigDecimal(amount));
        transaction.setCost(new BigDecimal(cost));
        transaction.setProfit(new BigDecimal(profit));
        return transaction;
    }
}
