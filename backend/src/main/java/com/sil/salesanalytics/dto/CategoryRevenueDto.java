package com.sil.salesanalytics.dto;

import java.math.BigDecimal;

public record CategoryRevenueDto(
        String category,
        BigDecimal totalRevenue
) {
}
