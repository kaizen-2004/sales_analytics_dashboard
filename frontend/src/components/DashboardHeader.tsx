export function DashboardHeader() {
  return (
    <header className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-soft">
      <div className="relative isolate px-6 py-8 sm:px-8 lg:px-10">
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-24 h-40 w-40 rounded-full bg-amber-300/10 blur-2xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">TESDA SIL Project</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Sales Analytics Dashboard</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Web-based analytics for simulated construction, engineering, contractor, and supplier-style sales
              transactions patterned after a Gigatech Inc. business context.
            </p>
          </div>
          <div className="grid gap-3 text-sm sm:grid-cols-2 lg:min-w-80">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <p className="text-slate-300">Architecture</p>
              <p className="mt-1 font-bold">React - Spring Boot - MySQL</p>
            </div>
            <div className="rounded-2xl border border-amber-200/20 bg-amber-300/10 p-4 backdrop-blur">
              <p className="text-amber-100">Dataset Notice</p>
              <p className="mt-1 font-bold">Simulated academic data only</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
