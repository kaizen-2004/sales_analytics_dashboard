package com.sil.salesanalytics.service;

import com.sil.salesanalytics.dto.CategoryRevenueDto;
import com.sil.salesanalytics.dto.ClientRevenueDto;
import com.sil.salesanalytics.dto.DashboardSummaryDto;
import com.sil.salesanalytics.dto.LocationRevenueDto;
import com.sil.salesanalytics.dto.MonthlyRevenueDto;
import com.sil.salesanalytics.dto.StatusCountDto;
import com.sil.salesanalytics.model.SalesTransaction;
import com.sil.salesanalytics.repository.SalesTransactionRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Objects;

@Service
public class SalesAnalyticsService {

    private static final BigDecimal ONE_HUNDRED = BigDecimal.valueOf(100);

    private final SalesTransactionRepository repository;

    public SalesAnalyticsService(SalesTransactionRepository repository) {
        this.repository = repository;
    }

    public List<SalesTransaction> getAllTransactions() {
        return repository.findAllByOrderByTransactionDateDescTransactionIdDesc();
    }

    public List<SalesTransaction> searchTransactions(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return getAllTransactions();
        }
        return repository.search(keyword.trim());
    }

    public List<SalesTransaction> filterTransactions(String category, String status, String paymentStatus) {
        return repository.filter(blankToNull(category), blankToNull(status), blankToNull(paymentStatus));
    }

    public DashboardSummaryDto getDashboardSummary() {
        List<SalesTransaction> transactions = repository.findAll();
        BigDecimal totalRevenue = sum(transactions.stream().map(SalesTransaction::getAmount).toList());
        BigDecimal totalCost = sum(transactions.stream().map(SalesTransaction::getCost).toList());
        BigDecimal totalProfit = sum(transactions.stream().map(SalesTransaction::getProfit).toList());
        long transactionCount = transactions.size();

        BigDecimal profitMargin = BigDecimal.ZERO;
        if (totalRevenue.compareTo(BigDecimal.ZERO) > 0) {
            profitMargin = totalProfit.multiply(ONE_HUNDRED).divide(totalRevenue, 2, RoundingMode.HALF_UP);
        }

        BigDecimal averageProjectValue = BigDecimal.ZERO;
        if (transactionCount > 0) {
            averageProjectValue = totalRevenue.divide(BigDecimal.valueOf(transactionCount), 2, RoundingMode.HALF_UP);
        }

        return new DashboardSummaryDto(
                totalRevenue.setScale(2, RoundingMode.HALF_UP),
                totalCost.setScale(2, RoundingMode.HALF_UP),
                totalProfit.setScale(2, RoundingMode.HALF_UP),
                profitMargin,
                averageProjectValue,
                transactionCount
        );
    }

    public List<MonthlyRevenueDto> getRevenueByMonth() {
        return repository.findRevenueByMonth();
    }

    public List<CategoryRevenueDto> getRevenueByCategory() {
        return repository.findRevenueByCategory();
    }

    public List<LocationRevenueDto> getRevenueByLocation() {
        return repository.findRevenueByLocation();
    }

    public List<StatusCountDto> getProjectStatusCounts() {
        return repository.findProjectStatusCounts();
    }

    public List<StatusCountDto> getPaymentStatusCounts() {
        return repository.findPaymentStatusCounts();
    }

    public List<ClientRevenueDto> getTopClients() {
        return repository.findTopClients(PageRequest.of(0, 5));
    }

    private static BigDecimal sum(List<BigDecimal> values) {
        return values.stream()
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private static String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
