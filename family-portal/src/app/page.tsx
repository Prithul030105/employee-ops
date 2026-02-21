export default function FamilyPortal() {
  return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-white rounded-[60px] shadow-[0_50px_100px_rgba(0,0,0,0.1)] p-16 text-center border-t-[12px] border-[#1A56DB]">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">John's NDIS Plan</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">Utilization Analysis</p>
        </div>

        {/* Thick Stroke Professional Progress Ring */}
        <div className="relative w-72 h-72 mx-auto mb-16">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="144" cy="144" r="120" stroke="#F1F5F9" strokeWidth="28" fill="none" />
            <circle cx="144" cy="144" r="120" stroke="#1A56DB" strokeWidth="28" fill="none" 
                    strokeDasharray="754" strokeDashoffset="324" strokeLinecap="round" 
                    className="drop-shadow-[0_0_15px_rgba(26,86,219,0.3)]" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-black text-slate-900 tracking-tighter">57%</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Used</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-slate-50 p-8 rounded-[32px] text-left border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Total Budget</p>
            <p className="text-3xl font-black text-slate-900">$150,000</p>
          </div>
          <div className="bg-blue-600 p-8 rounded-[32px] text-left shadow-xl shadow-blue-100">
            <p className="text-[10px] font-black text-white/60 uppercase mb-2">Remaining</p>
            <p className="text-3xl font-black text-white">$65,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}