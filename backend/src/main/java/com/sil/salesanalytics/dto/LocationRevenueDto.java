package com.sil.salesanalytics.dto;

import java.math.BigDecimal;

public record LocationRevenueDto(
        String location,
        BigDecimal totalRevenue
) {
}
