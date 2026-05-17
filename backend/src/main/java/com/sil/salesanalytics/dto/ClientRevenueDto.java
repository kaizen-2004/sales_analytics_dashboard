package com.sil.salesanalytics.dto;

import java.math.BigDecimal;

public record ClientRevenueDto(
        String clientName,
        BigDecimal totalRevenue
) {
}
