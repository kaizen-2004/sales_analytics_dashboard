USE sales_analytics_db;

-- Optional import helper for MySQL/MariaDB.
-- Replace the file path with the absolute path to your CSV file.
-- The CSV uses the header "date"; this maps it into transaction_date.
-- The CSV also has source_note; this reads it into @source_note and ignores it.
LOAD DATA LOCAL INFILE '/absolute/path/to/gigatech_style_sales_transactions_300.csv'
INTO TABLE sales_transactions
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(
    transaction_id,
    @transaction_date,
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
    project_manager,
    @source_note
)
SET transaction_date = STR_TO_DATE(@transaction_date, '%Y-%m-%d');
