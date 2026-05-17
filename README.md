# Sales Analytics Dashboard

Web-based TESDA Supervised Industry Learning project for a simulated construction, engineering, contractor, and supplier-style sales analytics system.

## Project Context

- Project title: Sales Analytics Dashboard
- Purpose: Academic/TESDA Supervised Industry Learning project
- Target company reference: Gigatech Inc.
- Dataset: Simulated Gigatech-style construction project-sales dataset with 300 rows
- Dataset file: `gigatech_style_sales_transactions_300.csv`
- Important note: The dataset is simulated for academic use only and must not be presented as actual confidential company data.

## System Overview

The system provides a dashboard for viewing project-sales revenue, cost, profit, profit margin, project status, payment status, top clients, and transaction records.

Business analytics are calculated by the Spring Boot backend. The React frontend focuses on presentation, charts, search, filters, loading states, and responsive layout.

## Architecture

```text
React frontend -> Spring Boot REST API -> XAMPP MySQL/MariaDB database
```

## Tech Stack

Frontend:

- React
- TypeScript
- Tailwind CSS
- Recharts
- Vite

Backend:

- Java 17 or later
- Spring Boot
- Maven
- Spring Web
- Spring Data JPA
- MySQL Connector/J
- REST API

Database:

- XAMPP MySQL/MariaDB
- Database name: `sales_analytics_db`
- Table name: `sales_transactions`

## Features

- Dashboard header
- Summary cards
- Total revenue, total cost, total profit, profit margin, transaction count, and average project value
- Revenue by month chart
- Revenue by service category chart
- Revenue by location chart
- Project status chart
- Payment status chart
- Top clients by revenue
- Search and filter bar
- Transaction table
- Loading and error states
- Peso currency formatting
- Responsive layout

## Folder Structure

```text
frontend/
  package.json
  vite.config.ts
  index.html
  src/
    main.tsx
    App.tsx
    components/
      DashboardHeader.tsx
      SummaryCard.tsx
      DashboardCards.tsx
      RevenueByMonthChart.tsx
      RevenueByCategoryChart.tsx
      RevenueByLocationChart.tsx
      ProjectStatusChart.tsx
      PaymentStatusChart.tsx
      TopClientsList.tsx
      TransactionTable.tsx
      FiltersBar.tsx
    services/
      api.ts
    types/
      SalesTransaction.ts
    utils/
      currency.ts
      date.ts

backend/
  pom.xml
  src/main/java/com/sil/salesanalytics/
    SalesAnalyticsApplication.java
    config/
      CorsConfig.java
    controller/
      SalesTransactionController.java
      DashboardController.java
    model/
      SalesTransaction.java
    repository/
      SalesTransactionRepository.java
    service/
      SalesAnalyticsService.java
    dto/
      DashboardSummaryDto.java
      MonthlyRevenueDto.java
      CategoryRevenueDto.java
      LocationRevenueDto.java
      StatusCountDto.java
      ClientRevenueDto.java
  src/main/resources/
    application.properties
    database/
      schema.sql
      import_csv_example.sql
    data/
      gigatech_style_sales_transactions_300.csv
  src/test/java/com/sil/salesanalytics/
    SalesAnalyticsServiceTest.java
```

## Database Design

Database: `sales_analytics_db`

Table: `sales_transactions`

The schema is stored in:

```text
backend/src/main/resources/database/schema.sql
```

The CSV file is stored in:

```text
backend/src/main/resources/data/gigatech_style_sales_transactions_300.csv
```

CSV import note:

- The CSV column `date` maps to the database column `transaction_date`.
- The CSV column `source_note` is an academic-use note and is not stored in the database table.
- If using phpMyAdmin import, map columns by position and ignore the first CSV header row.

## XAMPP Database Setup

1. Open XAMPP Control Panel.
2. Start Apache and MySQL.
3. Open phpMyAdmin at `http://localhost/phpmyadmin`.
4. Create database: `sales_analytics_db`.
5. Open the SQL tab and run `backend/src/main/resources/database/schema.sql`.
6. Select the `sales_analytics_db` database.
7. Select the `sales_transactions` table.
8. Open the Import tab.
9. Choose `backend/src/main/resources/data/gigatech_style_sales_transactions_300.csv`.
10. Set format to CSV.
11. Ignore or skip the first row because it contains CSV headers.
12. If phpMyAdmin shows a column names field, paste this list:

```text
transaction_id, transaction_date, year, month, quarter, client_name, project_name, service_category, project_type, location, amount, cost, profit, profit_margin, status, payment_status, payment_method, duration_days, project_manager
```

13. Import the CSV.
14. Confirm that around 300 rows appear in `sales_transactions`.

If phpMyAdmin has trouble importing because the CSV has the extra `source_note` column, use `backend/src/main/resources/database/import_csv_example.sql` as a reference. Replace `/absolute/path/to/gigatech_style_sales_transactions_300.csv` with the absolute path to the CSV file.

## Backend Setup

The backend uses this XAMPP database connection:

```text
jdbc:mysql://localhost:3306/sales_analytics_db
username: root
password: empty string
```

Run the backend:

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend runs at:

```text
http://localhost:8080
```

## Frontend Setup

Run the frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

Optional frontend API base URL override:

```bash
VITE_API_BASE_URL=http://localhost:8080/api npm run dev
```

## Testing

Run backend tests:

```bash
cd backend
mvn test
```

## API Endpoints

Transactions:

- `GET /api/transactions`
- `GET /api/transactions/search?keyword=`
- `GET /api/transactions/filter?category=&status=&paymentStatus=`

Dashboard:

- `GET /api/dashboard/summary`
- `GET /api/dashboard/revenue-by-month`
- `GET /api/dashboard/revenue-by-category`
- `GET /api/dashboard/revenue-by-location`
- `GET /api/dashboard/project-status`
- `GET /api/dashboard/payment-status`
- `GET /api/dashboard/top-clients`

## Dashboard Analytics

- Total revenue
- Total cost
- Total profit
- Profit margin
- Number of transactions
- Average project value
- Revenue by month
- Revenue by service category
- Revenue by location
- Top clients by revenue
- Completed, ongoing, pending, and cancelled projects
- Paid, partial, and unpaid payment status

## Screenshots

Add screenshots here after running the frontend.

```text
screenshots/dashboard-home.png
screenshots/transaction-table.png
```

## Troubleshooting

XAMPP MySQL not running:

- Start MySQL in XAMPP Control Panel.
- Confirm phpMyAdmin opens at `http://localhost/phpmyadmin`.

Wrong database name:

- Confirm the database is named exactly `sales_analytics_db`.
- Confirm `application.properties` uses `jdbc:mysql://localhost:3306/sales_analytics_db`.

Wrong database credentials:

- Default XAMPP credentials are usually `root` with an empty password.
- If your local MySQL has a password, update `backend/src/main/resources/application.properties`.

Port 8080 already in use:

- Stop the process using port `8080`.
- Or change `server.port=8080` in `application.properties`.

Frontend cannot connect to backend:

- Confirm the backend is running at `http://localhost:8080`.
- Confirm the frontend is using `http://localhost:8080/api`.
- Check the browser developer console for the failed request URL.

CORS error:

- Confirm the frontend runs at `http://localhost:5173` or `http://127.0.0.1:5173`.
- Confirm `CorsConfig.java` allows the frontend origin.

Empty dashboard:

- Confirm the CSV was imported into `sales_transactions`.
- Run `SELECT COUNT(*) FROM sales_transactions;` in phpMyAdmin.

CSV import column mismatch:

- The CSV uses `date`, but the database column is `transaction_date`.
- The CSV has `source_note`, but the database table does not.
- Use the column list shown in the XAMPP setup section or the optional `import_csv_example.sql` file.

## Disclaimer

The dataset used in this project is simulated for academic and demonstration purposes only. It is patterned after a construction, engineering, contractor, and supplier-type business. It does not contain actual confidential financial records from Gigatech Inc. or any real company.
