package com.funcoders.happy_pet_shop.repository;

import com.funcoders.happy_pet_shop.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {
    List<Invoice> findAllByCustomer_Id(UUID id);
    List<Invoice> findAllByStaff_Id(UUID id);

    List<Invoice> findAllByCreatedAtBetween(LocalDateTime startInclusive, LocalDateTime endExclusive);

    /**
     * Native query for PostgreSQL: aggregates + top 5 by revenue.
     * (JPQL + interface projection with CONCAT/GROUP BY was failing at runtime.)
     */
    @Query(
            value = """
                    SELECT i.customer_id,
                           TRIM(BOTH FROM CONCAT(COALESCE(u.last_name, ''), ' ', COALESCE(u.first_name, ''))),
                           SUM(i.total_amount),
                           SUM(i.real_amount),
                           COUNT(i.id)
                    FROM invoices i
                    INNER JOIN customers c ON i.customer_id = c.id
                    INNER JOIN users u ON c.user_id = u.id
                    GROUP BY i.customer_id, u.last_name, u.first_name
                    ORDER BY SUM(i.real_amount) DESC
                    LIMIT 5
                    """,
            nativeQuery = true
    )
    List<Object[]> findTop5CustomersByRealAmountRaw();
}
