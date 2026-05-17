package com.sil.salesanalytics.repository;

import com.sil.salesanalytics.dto.CategoryRevenueDto;
import com.sil.salesanalytics.dto.ClientRevenueDto;
import com.sil.salesanalytics.dto.LocationRevenueDto;
import com.sil.salesanalytics.dto.MonthlyRevenueDto;
import com.sil.salesanalytics.dto.StatusCountDto;
import com.sil.salesanalytics.model.SalesTransaction;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SalesTransactionRepository extends JpaRepository<SalesTransaction, Integer> {

    List<SalesTransaction> findAllByOrderByTransactionDateDescTransactionIdDesc();

    @Query("""
            SELECT t FROM SalesTransaction t
            WHERE LOWER(t.transactionId) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(t.clientName) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(t.projectName) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(t.location) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(t.projectManager) LIKE LOWER(CONCAT('%', :keyword, '%'))
            ORDER BY t.transactionDate DESC, t.transactionId DESC
            """)
    List<SalesTransaction> search(@Param("keyword") String keyword);

    @Query("""
            SELECT t FROM SalesTransaction t
            WHERE (:category IS NULL OR :category = '' OR t.serviceCategory = :category)
              AND (:status IS NULL OR :status = '' OR t.status = :status)
              AND (:paymentStatus IS NULL OR :paymentStatus = '' OR t.paymentStatus = :paymentStatus)
            ORDER BY t.transactionDate DESC, t.transactionId DESC
            """)
    List<SalesTransaction> filter(
            @Param("category") String category,
            @Param("status") String status,
            @Param("paymentStatus") String paymentStatus
    );

    @Query("""
            SELECT new com.sil.salesanalytics.dto.MonthlyRevenueDto(t.year, t.month, SUM(t.amount))
            FROM SalesTransaction t
            GROUP BY t.year, t.month
            ORDER BY t.year ASC, t.month ASC
            """)
    List<MonthlyRevenueDto> findRevenueByMonth();

    @Query("""
            SELECT new com.sil.salesanalytics.dto.CategoryRevenueDto(t.serviceCategory, SUM(t.amount))
            FROM SalesTransaction t
            GROUP BY t.serviceCategory
            ORDER BY SUM(t.amount) DESC
            """)
    List<CategoryRevenueDto> findRevenueByCategory();

    @Query("""
            SELECT new com.sil.salesanalytics.dto.LocationRevenueDto(t.location, SUM(t.amount))
            FROM SalesTransaction t
            GROUP BY t.location
            ORDER BY SUM(t.amount) DESC
            """)
    List<LocationRevenueDto> findRevenueByLocation();

    @Query("""
            SELECT new com.sil.salesanalytics.dto.StatusCountDto(t.status, COUNT(t))
            FROM SalesTransaction t
            GROUP BY t.status
            ORDER BY COUNT(t) DESC
            """)
    List<StatusCountDto> findProjectStatusCounts();

    @Query("""
            SELECT new com.sil.salesanalytics.dto.StatusCountDto(t.paymentStatus, COUNT(t))
            FROM SalesTransaction t
            GROUP BY t.paymentStatus
            ORDER BY COUNT(t) DESC
            """)
    List<StatusCountDto> findPaymentStatusCounts();

    @Query("""
            SELECT new com.sil.salesanalytics.dto.ClientRevenueDto(t.clientName, SUM(t.amount))
            FROM SalesTransaction t
            GROUP BY t.clientName
            ORDER BY SUM(t.amount) DESC
            """)
    List<ClientRevenueDto> findTopClients(Pageable pageable);
}
