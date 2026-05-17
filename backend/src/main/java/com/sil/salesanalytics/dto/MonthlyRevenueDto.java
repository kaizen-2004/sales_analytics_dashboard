package com.sil.salesanalytics.dto;

import java.math.BigDecimal;

public record MonthlyRevenueDto(
        Integer year,
        String month,
        BigDecimal totalRevenue
) {
}
