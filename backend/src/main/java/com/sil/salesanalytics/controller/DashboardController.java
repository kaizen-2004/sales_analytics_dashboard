package com.sil.salesanalytics.controller;

import com.sil.salesanalytics.dto.CategoryRevenueDto;
import com.sil.salesanalytics.dto.ClientRevenueDto;
import com.sil.salesanalytics.dto.DashboardSummaryDto;
import com.sil.salesanalytics.dto.LocationRevenueDto;
import com.sil.salesanalytics.dto.MonthlyRevenueDto;
import com.sil.salesanalytics.dto.StatusCountDto;
import com.sil.salesanalytics.service.SalesAnalyticsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final SalesAnalyticsService salesAnalyticsService;

    public DashboardController(SalesAnalyticsService salesAnalyticsService) {
        this.salesAnalyticsService = salesAnalyticsService;
    }

    @GetMapping("/summary")
    public DashboardSummaryDto getSummary() {
        return salesAnalyticsService.getDashboardSummary();
    }

    @GetMapping("/revenue-by-month")
    public List<MonthlyRevenueDto> getRevenueByMonth() {
        return salesAnalyticsService.getRevenueByMonth();
    }

    @GetMapping("/revenue-by-category")
    public List<CategoryRevenueDto> getRevenueByCategory() {
        return salesAnalyticsService.getRevenueByCategory();
    }

    @GetMapping("/revenue-by-location")
    public List<LocationRevenueDto> getRevenueByLocation() {
        return salesAnalyticsService.getRevenueByLocation();
    }

    @GetMapping("/project-status")
    public List<StatusCountDto> getProjectStatus() {
        return salesAnalyticsService.getProjectStatusCounts();
    }

    @GetMapping("/payment-status")
    public List<StatusCountDto> getPaymentStatus() {
        return salesAnalyticsService.getPaymentStatusCounts();
    }

    @GetMapping("/top-clients")
    public List<ClientRevenueDto> getTopClients() {
        return salesAnalyticsService.getTopClients();
    }
}
