import type { SalesTransaction } from '../types/SalesTransaction';
import { formatCurrency, formatPercent } from '../utils/currency';
import { formatDate } from '../utils/date';

interface TransactionTableProps {
  transactions: SalesTransaction[];
  loading: boolean;
}

const statusClass = (status: string): string => {
  const normalized = status.toLowerCase();
  if (normalized.includes('completed') || normalized.includes('paid')) {
    return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
  }
  if (normalized.includes('ongoing') || normalized.includes('partial')) {
    return 'bg-amber-50 text-amber-700 ring-amber-200';
  }
  if (normalized.includes('cancelled') || normalized.includes('unpaid')) {
    return 'bg-rose-50 text-rose-700 ring-rose-200';
  }
  return 'bg-slate-100 text-slate-700 ring-slate-200';
};

export function TransactionTable({ transactions, loading }: TransactionTableProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-950">Transaction Records</h2>
          <p className="text-sm text-slate-500">{transactions.length.toLocaleString()} records shown</p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">sales_transactions</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[1100px] w-full border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="text-slate-500">
              <th className="border-b border-slate-200 px-3 py-3 font-bold">Transaction</th>
              <th className="border-b border-slate-200 px-3 py-3 font-bold">Date</th>
              <th className="border-b border-slate-200 px-3 py-3 font-bold">Client</th>
              <th className="border-b border-slate-200 px-3 py-3 font-bold">Category</th>
              <th className="border-b border-slate-200 px-3 py-3 font-bold">Location</th>
              <th className="border-b border-slate-200 px-3 py-3 font-bold">Amount</th>
              <th className="border-b border-slate-200 px-3 py-3 font-bold">Profit</th>
              <th className="border-b border-slate-200 px-3 py-3 font-bold">Margin</th>
              <th className="border-b border-slate-200 px-3 py-3 font-bold">Status</th>
              <th className="border-b border-slate-200 px-3 py-3 font-bold">Payment</th>
              <th className="border-b border-slate-200 px-3 py-3 font-bold">Manager</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={11} className="px-3 py-10 text-center font-semibold text-slate-500">
                  Loading transaction records...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-3 py-10 text-center font-semibold text-slate-500">
                  No transactions matched the current search or filters.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.transactionId} className="align-top text-slate-700 hover:bg-slate-50">
                  <td className="border-b border-slate-100 px-3 py-4 font-bold text-slate-950">{transaction.transactionId}</td>
                  <td className="border-b border-slate-100 px-3 py-4">{formatDate(transaction.transactionDate)}</td>
                  <td className="border-b border-slate-100 px-3 py-4">{transaction.clientName}</td>
                  <td className="border-b border-slate-100 px-3 py-4">{transaction.serviceCategory}</td>
                  <td className="border-b border-slate-100 px-3 py-4">{transaction.location}</td>
                  <td className="border-b border-slate-100 px-3 py-4 font-bold text-slate-950">{formatCurrency(transaction.amount)}</td>
                  <td className="border-b border-slate-100 px-3 py-4">{formatCurrency(transaction.profit)}</td>
                  <td className="border-b border-slate-100 px-3 py-4">{formatPercent(transaction.profitMargin)}</td>
                  <td className="border-b border-slate-100 px-3 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusClass(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="border-b border-slate-100 px-3 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusClass(transaction.paymentStatus)}`}>
                      {transaction.paymentStatus}
                    </span>
                  </td>
                  <td className="border-b border-slate-100 px-3 py-4">{transaction.projectManager}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
