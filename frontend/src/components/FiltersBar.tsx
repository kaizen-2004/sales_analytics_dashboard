import type { TransactionFilters } from '../types/SalesTransaction';

interface FiltersBarProps {
  filters: TransactionFilters;
  categories: string[];
  statuses: string[];
  paymentStatuses: string[];
  loading: boolean;
  onChange: (filters: TransactionFilters) => void;
  onApply: () => void;
  onReset: () => void;
}

export function FiltersBar({
  filters,
  categories,
  statuses,
  paymentStatuses,
  loading,
  onChange,
  onApply,
  onReset,
}: FiltersBarProps) {
  const updateField = (field: keyof TransactionFilters, value: string) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <form
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft"
      onSubmit={(event) => {
        event.preventDefault();
        onApply();
      }}
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-950">Transaction Search and Filters</h2>
          <p className="text-sm text-slate-500">Search by transaction ID, client, project, location, or manager.</p>
        </div>
        <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-500">
          Backend REST API
        </p>
      </div>
      <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto_auto]">
        <input
          value={filters.keyword}
          onChange={(event) => updateField('keyword', event.target.value)}
          placeholder="Search transactions..."
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-400 focus:bg-white"
        />
        <select
          value={filters.category}
          onChange={(event) => updateField('category', event.target.value)}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-400 focus:bg-white"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={filters.status}
          onChange={(event) => updateField('status', event.target.value)}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-400 focus:bg-white"
        >
          <option value="">All project statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select
          value={filters.paymentStatus}
          onChange={(event) => updateField('paymentStatus', event.target.value)}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-400 focus:bg-white"
        >
          <option value="">All payment statuses</option>
          {paymentStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Loading...' : 'Apply'}
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={loading}
          className="rounded-2xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
