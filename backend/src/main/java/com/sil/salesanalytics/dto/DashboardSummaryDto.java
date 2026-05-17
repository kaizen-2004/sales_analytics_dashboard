package com.sil.salesanalytics.dto;

import java.math.BigDecimal;

public record DashboardSummaryDto(
        BigDecimal totalRevenue,
        BigDecimal totalCost,
        BigDecimal totalProfit,
        BigDecimal profitMargin,
        BigDecimal averageProjectValue,
        long transactionCount
) {
}
