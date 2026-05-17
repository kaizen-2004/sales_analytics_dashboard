export type MoneyValue = number | string | null;

export interface SalesTransaction {
  id: number;
  transactionId: string;
  transactionDate: string;
  year: number;
  month: string;
  quarter: string;
  clientName: string;
  projectName: string;
  serviceCategory: string;
  projectType: string;
  location: string;
  amount: MoneyValue;
  cost: MoneyValue;
  profit: MoneyValue;
  profitMargin: MoneyValue;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  durationDays: number;
  projectManager: string;
}

export interface DashboardSummary {
  totalRevenue: MoneyValue;
  totalCost: MoneyValue;
  totalProfit: MoneyValue;
  profitMargin: MoneyValue;
  averageProjectValue: MoneyValue;
  transactionCount: number;
}

export interface MonthlyRevenue {
  year: number;
  month: string;
  totalRevenue: MoneyValue;
}

export interface CategoryRevenue {
  category: string;
  totalRevenue: MoneyValue;
}

export interface LocationRevenue {
  location: string;
  totalRevenue: MoneyValue;
}

export interface StatusCount {
  status: string;
  count: number;
}

export interface ClientRevenue {
  clientName: string;
  totalRevenue: MoneyValue;
}

export interface TransactionFilters {
  keyword: string;
  category: string;
  status: string;
  paymentStatus: string;
}
