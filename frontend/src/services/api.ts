import type {
  CategoryRevenue,
  ClientRevenue,
  DashboardSummary,
  LocationRevenue,
  MonthlyRevenue,
  SalesTransaction,
  StatusCount,
  TransactionFilters,
} from '../types/SalesTransaction';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api';

const request = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};

const toQueryString = (params: Record<string, string>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value.trim()) {
      searchParams.set(key, value.trim());
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
};

export const api = {
  getTransactions: () => request<SalesTransaction[]>('/transactions'),
  searchTransactions: (keyword: string) =>
    request<SalesTransaction[]>(`/transactions/search${toQueryString({ keyword })}`),
  filterTransactions: (filters: TransactionFilters) =>
    request<SalesTransaction[]>(
      `/transactions/filter${toQueryString({
        category: filters.category,
        status: filters.status,
        paymentStatus: filters.paymentStatus,
      })}`,
    ),
  getSummary: () => request<DashboardSummary>('/dashboard/summary'),
  getRevenueByMonth: () => request<MonthlyRevenue[]>('/dashboard/revenue-by-month'),
  getRevenueByCategory: () => request<CategoryRevenue[]>('/dashboard/revenue-by-category'),
  getRevenueByLocation: () => request<LocationRevenue[]>('/dashboard/revenue-by-location'),
  getProjectStatus: () => request<StatusCount[]>('/dashboard/project-status'),
  getPaymentStatus: () => request<StatusCount[]>('/dashboard/payment-status'),
  getTopClients: () => request<ClientRevenue[]>('/dashboard/top-clients'),
};
