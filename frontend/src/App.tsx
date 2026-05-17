import { useEffect, useState } from 'react';
import { DashboardCards } from './components/DashboardCards';
import { DashboardHeader } from './components/DashboardHeader';
import { FiltersBar } from './components/FiltersBar';
import { PaymentStatusChart } from './components/PaymentStatusChart';
import { ProjectStatusChart } from './components/ProjectStatusChart';
import { RevenueByCategoryChart } from './components/RevenueByCategoryChart';
import { RevenueByLocationChart } from './components/RevenueByLocationChart';
import { RevenueByMonthChart } from './components/RevenueByMonthChart';
import { TopClientsList } from './components/TopClientsList';
import { TransactionTable } from './components/TransactionTable';
import { api } from './services/api';
import type {
  CategoryRevenue,
  ClientRevenue,
  DashboardSummary,
  LocationRevenue,
  MonthlyRevenue,
  SalesTransaction,
  StatusCount,
  TransactionFilters,
} from './types/SalesTransaction';

const emptyFilters: TransactionFilters = {
  keyword: '',
  category: '',
  status: '',
  paymentStatus: '',
};

const uniqueSorted = (values: string[]): string[] =>
  Array.from(new Set(values.filter(Boolean))).sort((first, second) => first.localeCompare(second));

const matchesSelectedFilters = (transaction: SalesTransaction, filters: TransactionFilters): boolean => {
  const categoryMatches = !filters.category || transaction.serviceCategory === filters.category;
  const statusMatches = !filters.status || transaction.status === filters.status;
  const paymentMatches = !filters.paymentStatus || transaction.paymentStatus === filters.paymentStatus;
  return categoryMatches && statusMatches && paymentMatches;
};

function App() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);
  const [categoryRevenue, setCategoryRevenue] = useState<CategoryRevenue[]>([]);
  const [locationRevenue, setLocationRevenue] = useState<LocationRevenue[]>([]);
  const [projectStatus, setProjectStatus] = useState<StatusCount[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<StatusCount[]>([]);
  const [topClients, setTopClients] = useState<ClientRevenue[]>([]);
  const [allTransactions, setAllTransactions] = useState<SalesTransaction[]>([]);
  const [transactions, setTransactions] = useState<SalesTransaction[]>([]);
  const [filters, setFilters] = useState<TransactionFilters>(emptyFilters);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError(null);

      try {
        const [
          summaryData,
          monthlyData,
          categoryData,
          locationData,
          projectStatusData,
          paymentStatusData,
          topClientData,
          transactionData,
        ] = await Promise.all([
          api.getSummary(),
          api.getRevenueByMonth(),
          api.getRevenueByCategory(),
          api.getRevenueByLocation(),
          api.getProjectStatus(),
          api.getPaymentStatus(),
          api.getTopClients(),
          api.getTransactions(),
        ]);

        setSummary(summaryData);
        setMonthlyRevenue(monthlyData);
        setCategoryRevenue(categoryData);
        setLocationRevenue(locationData);
        setProjectStatus(projectStatusData);
        setPaymentStatus(paymentStatusData);
        setTopClients(topClientData);
        setAllTransactions(transactionData);
        setTransactions(transactionData);
      } catch (caughtError) {
        setError(caughtError instanceof Error ? caughtError.message : 'Unable to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  const categories = uniqueSorted(allTransactions.map((transaction) => transaction.serviceCategory));
  const statuses = uniqueSorted(allTransactions.map((transaction) => transaction.status));
  const paymentStatuses = uniqueSorted(allTransactions.map((transaction) => transaction.paymentStatus));

  const applyFilters = async () => {
    setTableLoading(true);
    setError(null);

    try {
      const hasKeyword = filters.keyword.trim().length > 0;
      const hasDropdownFilter = Boolean(filters.category || filters.status || filters.paymentStatus);
      let result = allTransactions;

      if (hasKeyword) {
        result = await api.searchTransactions(filters.keyword);
      } else if (hasDropdownFilter) {
        result = await api.filterTransactions(filters);
      }

      if (hasKeyword && hasDropdownFilter) {
        result = result.filter((transaction) => matchesSelectedFilters(transaction, filters));
      }

      setTransactions(result);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to filter transactions.');
    } finally {
      setTableLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters(emptyFilters);
    setTransactions(allTransactions);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dff7ff,transparent_32rem),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <DashboardHeader />

        {error && (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 font-semibold text-rose-700">
            {error}. Check that the Spring Boot backend is running at http://localhost:8080 and the database has imported data.
          </div>
        )}

        {loading && !summary ? (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-40 animate-pulse rounded-3xl border border-slate-200 bg-white/70 shadow-soft" />
            ))}
          </section>
        ) : (
          summary && <DashboardCards summary={summary} />
        )}

        <div className="grid gap-6 xl:grid-cols-2">
          <RevenueByMonthChart data={monthlyRevenue} />
          <RevenueByCategoryChart data={categoryRevenue} />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <RevenueByLocationChart data={locationRevenue} />
          <TopClientsList data={topClients} />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <ProjectStatusChart data={projectStatus} />
          <PaymentStatusChart data={paymentStatus} />
        </div>

        <FiltersBar
          filters={filters}
          categories={categories}
          statuses={statuses}
          paymentStatuses={paymentStatuses}
          loading={tableLoading}
          onChange={setFilters}
          onApply={applyFilters}
          onReset={resetFilters}
        />

        <TransactionTable transactions={transactions} loading={tableLoading || loading} />

        <footer className="pb-4 text-center text-sm font-medium text-slate-500">
          Dataset is simulated for academic and demonstration purposes only. It is not actual confidential company data.
        </footer>
      </div>
    </main>
  );
}

export default App;
