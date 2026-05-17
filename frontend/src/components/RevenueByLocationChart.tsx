import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { LocationRevenue } from '../types/SalesTransaction';
import { formatCompactCurrency, formatCurrency, toNumber } from '../utils/currency';

interface RevenueByLocationChartProps {
  data: LocationRevenue[];
}

export function RevenueByLocationChart({ data }: RevenueByLocationChartProps) {
  const chartData = data.slice(0, 8).map((item) => ({
    location: item.location,
    revenue: toNumber(item.totalRevenue),
  }));

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-5">
        <h2 className="text-lg font-black text-slate-950">Revenue by Location</h2>
        <p className="text-sm text-slate-500">Top locations by project value</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 15, left: 25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis type="number" tickFormatter={(value) => formatCompactCurrency(value)} tick={{ fontSize: 12 }} stroke="#64748b" />
            <YAxis dataKey="location" type="category" width={110} tick={{ fontSize: 12 }} stroke="#64748b" />
            <Tooltip formatter={(value) => formatCurrency(value as number)} labelClassName="font-bold" />
            <Bar dataKey="revenue" radius={[0, 12, 12, 0]} fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
