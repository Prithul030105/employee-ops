export default function EmployeeOps() {
  return (
    <div className="p-12 max-w-7xl mx-auto bg-[#F8FAFC] min-h-screen">
      <div className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Staff Compliance</h1>
          <p className="text-slate-500 font-medium">Internal Workforce Monitoring</p>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600">Filters</button>
           <button className="px-6 py-2 bg-[#1A56DB] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-100">+ Add Staff</button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b">
            <tr>
              <th className="px-10 py-8">Staff Member</th>
              <th className="px-10 py-8">Role</th>
              <th className="px-10 py-8 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { name: 'Sarah Jenkins', role: 'Support Worker', status: 'Compliant', color: 'bg-green-50 text-green-600' },
              { name: 'Mike Ross', role: 'Senior Carer', status: 'Expiring Soon', color: 'bg-red-50 text-red-600' },
              { name: 'Jessica Pearson', role: 'Case Manager', status: 'Compliant', color: 'bg-green-50 text-green-600' }
            ].map((staff) => (
              <tr key={staff.name} className="hover:bg-slate-50/50 transition-all">
                <td className="px-10 py-8 font-bold text-slate-900">{staff.name}</td>
                <td className="px-10 py-8 text-slate-500 font-medium">{staff.role}</td>
                <td className="px-10 py-8 text-center">
                  <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${staff.color}`}>
                    {staff.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}