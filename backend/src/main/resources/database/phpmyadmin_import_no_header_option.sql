USE sales_analytics_db;

-- Use this when phpMyAdmin does not show the option:
-- "The first line of the file contains the table column names".
-- This temporary table stores every CSV column as text so the header row can be imported safely.

DROP TABLE IF EXISTS sales_transactions_import;

CREATE TABLE sales_transactions_import (
    transaction_id TEXT,
    date TEXT,
    year TEXT,
    month TEXT,
    quarter TEXT,
    client_name TEXT,
    project_name TEXT,
    service_category TEXT,
    project_type TEXT,
    location TEXT,
    amount TEXT,
    cost TEXT,
    profit TEXT,
    profit_margin TEXT,
    status TEXT,
    payment_status TEXT,
    payment_method TEXT,
    duration_days TEXT,
    project_manager TEXT,
    source_note TEXT
);

-- After creating this table, import gigatech_style_sales_transactions_300.csv
-- into sales_transactions_import using phpMyAdmin Import.
-- It is okay if the CSV header row is imported.

-- Run the statements below after the phpMyAdmin CSV import is complete.
DELETE FROM sales_transactions_import
WHERE transaction_id = 'transaction_id';

INSERT INTO sales_transactions (
    transaction_id,
    transaction_date,
    year,
    month,
    quarter,
    client_name,
    project_name,
    service_category,
    project_type,
    location,
    amount,
    cost,
    profit,
    profit_margin,
    status,
    payment_status,
    payment_method,
    duration_days,
    project_manager
)
SELECT
    transaction_id,
    STR_TO_DATE(date, '%Y-%m-%d'),
    CAST(year AS UNSIGNED),
    month,
    quarter,
    client_name,
    project_name,
    service_category,
    project_type,
    location,
    CAST(amount AS DECIMAL(15,2)),
    CAST(cost AS DECIMAL(15,2)),
    CAST(profit AS DECIMAL(15,2)),
    CAST(profit_margin AS DECIMAL(8,2)),
    status,
    payment_status,
    payment_method,
    CAST(duration_days AS UNSIGNED),
    project_manager
FROM sales_transactions_import;

SELECT COUNT(*) AS imported_rows FROM sales_transactions;
