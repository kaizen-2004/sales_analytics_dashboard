import type { ClientRevenue } from '../types/SalesTransaction';
import { formatCurrency, toNumber } from '../utils/currency';

interface TopClientsListProps {
  data: ClientRevenue[];
}

export function TopClientsList({ data }: TopClientsListProps) {
  const maxRevenue = Math.max(...data.map((item) => toNumber(item.totalRevenue)), 1);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-5">
        <h2 className="text-lg font-black text-slate-950">Top Clients by Revenue</h2>
        <p className="text-sm text-slate-500">Highest-value simulated clients</p>
      </div>
      <div className="space-y-4">
        {data.map((client) => {
          const revenue = toNumber(client.totalRevenue);
          return (
            <div key={client.clientName}>
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className="font-bold text-slate-800">{client.clientName}</span>
                <span className="font-semibold text-slate-500">{formatCurrency(client.totalRevenue)}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-slate-950" style={{ width: `${(revenue / maxRevenue) * 100}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
