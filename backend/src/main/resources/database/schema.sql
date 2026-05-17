CREATE DATABASE IF NOT EXISTS sales_analytics_db;
USE sales_analytics_db;

CREATE TABLE IF NOT EXISTS sales_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id VARCHAR(50) NOT NULL UNIQUE,
    transaction_date DATE NOT NULL,
    year INT,
    month VARCHAR(20),
    quarter VARCHAR(10),
    client_name VARCHAR(150),
    project_name VARCHAR(255),
    service_category VARCHAR(100),
    project_type VARCHAR(100),
    location VARCHAR(150),
    amount DECIMAL(15,2),
    cost DECIMAL(15,2),
    profit DECIMAL(15,2),
    profit_margin DECIMAL(8,2),
    status VARCHAR(50),
    payment_status VARCHAR(50),
    payment_method VARCHAR(50),
    duration_days INT,
    project_manager VARCHAR(100)
);
