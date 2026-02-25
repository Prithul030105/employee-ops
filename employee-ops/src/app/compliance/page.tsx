"use client";

import { useMemo } from "react";

export default function ComplianceVault() {
  const today = new Date();

  const staffData = [
    {
      name: "Sarah Jenkins",
      role: "Support Worker",
      credentials: [
        { type: "NDIS Screening", expiry: "2027-03-14" },
        { type: "First Aid", expiry: "2026-03-12" },
        { type: "Police Check", expiry: "2025-12-02" },
      ],
    },
    {
      name: "Mike Ross",
      role: "Senior Carer",
      credentials: [
        { type: "NDIS Screening", expiry: "2026-01-05" },
        { type: "First Aid", expiry: "2026-02-28" },
        { type: "Police Check", expiry: "2026-02-25" },
      ],
    },
    {
      name: "Jessica Pearson",
      role: "Case Manager",
      credentials: [
        { type: "NDIS Screening", expiry: null },
        { type: "First Aid", expiry: "2026-08-01" },
      ],
    },
  ];

  const calculateStatus = (credentials: any[]) => {
    let hasMissing = false;
    let hasExpiring = false;

    credentials.forEach((cred) => {
      if (!cred.expiry) {
        hasMissing = true;
        return;
      }

      const expiryDate = new Date(cred.expiry);
      const diffTime = expiryDate.getTime() - today.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays <= 30) {
        hasExpiring = true;
      }
    });

    if (hasMissing) return { label: "Missing", style: "bg-red-100 text-red-600" };
    if (hasExpiring) return { label: "Expiring Soon", style: "bg-yellow-100 text-yellow-700" };
    return { label: "Compliant", style: "bg-green-100 text-green-600" };
  };

  return (
    <div className="p-12 max-w-7xl mx-auto bg-[#F8FAFC] min-h-screen space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Compliance Vault
          </h1>
          <p className="text-slate-500 font-medium">
            Centralized credential monitoring & expiry tracking
          </p>
        </div>

        <div className="flex gap-4">
          <button className="px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600">
            Filter
          </button>
          <button className="px-6 py-2 bg-[#1A56DB] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-100">
            + Add Credential
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b">
            <tr>
              <th className="px-10 py-6">Staff Member</th>
              <th className="px-10 py-6">Role</th>
              <th className="px-10 py-6">Credentials</th>
              <th className="px-10 py-6 text-center">Overall Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {staffData.map((staff) => {
              const status = calculateStatus(staff.credentials);

              return (
                <tr key={staff.name} className="hover:bg-slate-50/50 transition">
                  <td className="px-10 py-6 font-bold text-slate-900">
                    {staff.name}
                  </td>

                  <td className="px-10 py-6 text-slate-500 font-medium">
                    {staff.role}
                  </td>

                  <td className="px-10 py-6 space-y-2">
                    {staff.credentials.map((cred, index) => {
                      if (!cred.expiry) {
                        return (
                          <div
                            key={index}
                            className="text-xs font-semibold text-red-600"
                          >
                            {cred.type} — Missing
                          </div>
                        );
                      }

                      const expiryDate = new Date(cred.expiry);
                      const diffTime =
                        expiryDate.getTime() - today.getTime();
                      const diffDays =
                        diffTime / (1000 * 60 * 60 * 24);

                      const isExpiring = diffDays <= 30;

                      return (
                        <div
                          key={index}
                          className={`text-xs font-semibold ${
                            isExpiring
                              ? "text-yellow-600"
                              : "text-slate-600"
                          }`}
                        >
                          {cred.type} — Expires{" "}
                          {expiryDate.toLocaleDateString()}
                        </div>
                      );
                    })}
                  </td>

                  <td className="px-10 py-6 text-center">
                    <span
                      className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${status.style}`}
                    >
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
