interface SummaryCardProps {
  title: string;
  value: string;
  helper: string;
  tone?: 'blue' | 'green' | 'amber' | 'rose' | 'slate';
}

const toneClasses = {
  blue: 'from-blue-500 to-cyan-400 text-blue-950',
  green: 'from-emerald-500 to-lime-400 text-emerald-950',
  amber: 'from-amber-400 to-orange-400 text-amber-950',
  rose: 'from-rose-500 to-pink-400 text-rose-950',
  slate: 'from-slate-700 to-slate-500 text-slate-950',
};

export function SummaryCard({ title, value, helper, tone = 'blue' }: SummaryCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className={`mb-5 h-2 w-20 rounded-full bg-gradient-to-r ${toneClasses[tone]}`} />
      <p className="text-sm font-semibold text-slate-500">{title}</p>
      <p className="mt-3 text-2xl font-black tracking-tight text-slate-950">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{helper}</p>
    </article>
  );
}
