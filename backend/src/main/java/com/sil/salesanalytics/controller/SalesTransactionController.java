package com.sil.salesanalytics.controller;

import com.sil.salesanalytics.model.SalesTransaction;
import com.sil.salesanalytics.service.SalesAnalyticsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class SalesTransactionController {

    private final SalesAnalyticsService salesAnalyticsService;

    public SalesTransactionController(SalesAnalyticsService salesAnalyticsService) {
        this.salesAnalyticsService = salesAnalyticsService;
    }

    @GetMapping
    public List<SalesTransaction> getTransactions() {
        return salesAnalyticsService.getAllTransactions();
    }

    @GetMapping("/search")
    public List<SalesTransaction> searchTransactions(@RequestParam(required = false) String keyword) {
        return salesAnalyticsService.searchTransactions(keyword);
    }

    @GetMapping("/filter")
    public List<SalesTransaction> filterTransactions(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String paymentStatus
    ) {
        return salesAnalyticsService.filterTransactions(category, status, paymentStatus);
    }
}
