import type { DashboardSummary } from '../types/SalesTransaction';
import { formatCurrency, formatPercent } from '../utils/currency';
import { SummaryCard } from './SummaryCard';

interface DashboardCardsProps {
  summary: DashboardSummary;
}

export function DashboardCards({ summary }: DashboardCardsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <SummaryCard title="Total Revenue" value={formatCurrency(summary.totalRevenue)} helper="Gross project sales" tone="blue" />
      <SummaryCard title="Total Cost" value={formatCurrency(summary.totalCost)} helper="Recorded project cost" tone="slate" />
      <SummaryCard title="Total Profit" value={formatCurrency(summary.totalProfit)} helper="Revenue less cost" tone="green" />
      <SummaryCard title="Profit Margin" value={formatPercent(summary.profitMargin)} helper="Backend-calculated margin" tone="amber" />
      <SummaryCard title="Transactions" value={summary.transactionCount.toLocaleString()} helper="Imported sales records" tone="rose" />
      <SummaryCard
        title="Average Project Value"
        value={formatCurrency(summary.averageProjectValue)}
        helper="Revenue divided by transactions"
        tone="blue"
      />
    </section>
  );
}
