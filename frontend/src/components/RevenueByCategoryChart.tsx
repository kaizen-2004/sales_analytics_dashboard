import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { CategoryRevenue } from '../types/SalesTransaction';
import { formatCompactCurrency, formatCurrency, toNumber } from '../utils/currency';

interface RevenueByCategoryChartProps {
  data: CategoryRevenue[];
}

export function RevenueByCategoryChart({ data }: RevenueByCategoryChartProps) {
  const chartData = data.slice(0, 8).map((item) => ({
    category: item.category,
    revenue: toNumber(item.totalRevenue),
  }));

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-5">
        <h2 className="text-lg font-black text-slate-950">Revenue by Service Category</h2>
        <p className="text-sm text-slate-500">Top categories by sales value</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 70 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="category" angle={-35} textAnchor="end" interval={0} tick={{ fontSize: 11 }} stroke="#64748b" />
            <YAxis tickFormatter={(value) => formatCompactCurrency(value)} tick={{ fontSize: 12 }} stroke="#64748b" />
            <Tooltip formatter={(value) => formatCurrency(value as number)} labelClassName="font-bold" />
            <Bar dataKey="revenue" radius={[12, 12, 0, 0]} fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
