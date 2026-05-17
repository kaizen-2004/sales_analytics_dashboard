import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { MonthlyRevenue } from '../types/SalesTransaction';
import { formatCompactCurrency, formatCurrency, toNumber } from '../utils/currency';

interface RevenueByMonthChartProps {
  data: MonthlyRevenue[];
}

export function RevenueByMonthChart({ data }: RevenueByMonthChartProps) {
  const chartData = data.map((item) => ({
    month: item.month,
    revenue: toNumber(item.totalRevenue),
  }));

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-5">
        <h2 className="text-lg font-black text-slate-950">Revenue by Month</h2>
        <p className="text-sm text-slate-500">Monthly project revenue trend</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#64748b" />
            <YAxis tickFormatter={(value) => formatCompactCurrency(value)} tick={{ fontSize: 12 }} stroke="#64748b" />
            <Tooltip formatter={(value) => formatCurrency(value as number)} labelClassName="font-bold" />
            <Bar dataKey="revenue" radius={[12, 12, 0, 0]} fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
