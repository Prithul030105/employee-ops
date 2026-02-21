export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Premium Navigation Sidebar */}
      <aside className="w-72 bg-[#0F172A] text-white p-8 hidden lg:flex flex-col border-r border-slate-800">
        <div className="mb-12 px-2">
          <span className="text-2xl font-black tracking-tighter italic">HANSONIUM<span className="text-blue-500">.</span></span>
        </div>
        <nav className="space-y-4 flex-1">
          <div className="bg-blue-600 text-white p-4 rounded-2xl font-bold text-sm shadow-lg shadow-blue-900/20">Executive Hub</div>
          <div className="text-slate-400 p-4 hover:bg-white/5 rounded-2xl font-medium text-sm transition-all cursor-pointer">DEX Compliance</div>
          <div className="text-slate-400 p-4 hover:bg-white/5 rounded-2xl font-medium text-sm transition-all cursor-pointer">Staff Oversight</div>
        </nav>
      </aside>

      <main className="flex-1 p-12 max-w-7xl mx-auto overflow-y-auto">
        <header className="flex justify-between items-end mb-16">
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-[10px]">Administrative Suite</span>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight mt-2">Command Center</h1>
          </div>
          <button className="bg-[#1A56DB] text-white px-8 py-4 rounded-2xl font-bold shadow-[0_20px_40px_-10px_rgba(26,86,219,0.4)] hover:scale-105 transition-all">
            Export NDIS Batch
          </button>
        </header>

        {/* Top KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-50">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Gross Revenue</p>
            <h3 className="text-5xl font-black text-slate-900 tracking-tighter">$1.24M</h3>
            <div className="mt-4 inline-flex items-center px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-lg">↑ 12.4%</div>
          </div>
          <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-50">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Compliance Purity</p>
            <h3 className="text-5xl font-black text-slate-900 tracking-tighter">98.5%</h3>
            <div className="w-full bg-slate-100 h-3 rounded-full mt-6 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-full" style={{ width: '98.5%' }}></div>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-50">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Active Participants</p>
            <h3 className="text-5xl font-black text-slate-900 tracking-tighter">142</h3>
            <p className="text-sm font-bold text-slate-400 mt-4">Verified SLK-581</p>
          </div>
        </div>
      </main>
    </div>
  );
}