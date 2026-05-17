import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { StatusCount } from '../types/SalesTransaction';

interface ProjectStatusChartProps {
  data: StatusCount[];
}

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function ProjectStatusChart({ data }: ProjectStatusChartProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-5">
        <h2 className="text-lg font-black text-slate-950">Project Status</h2>
        <p className="text-sm text-slate-500">Completed, ongoing, pending, and cancelled projects</p>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_0.8fr] md:items-center">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="count" nameKey="status" innerRadius={55} outerRadius={90} paddingAngle={4}>
                {data.map((entry, index) => (
                  <Cell key={entry.status} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} records`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={item.status} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="font-semibold text-slate-700">{item.status}</span>
              </div>
              <span className="font-black text-slate-950">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
