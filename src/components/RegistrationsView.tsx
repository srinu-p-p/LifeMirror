import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Registration, RegistrationStatus } from '../types';
import {
  ClipboardList,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  MapPin,
  Filter,
  UserCheck,
  Sparkles,
  Lock,
  Unlock,
  AlertCircle,
  Calendar,
} from 'lucide-react';

export const RegistrationsView: React.FC = () => {
  const { registrations, updateRegistrationStatus, setSelectedLeadForDetail, leads } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [unmaskPhone, setUnmaskPhone] = useState(false);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      if (categoryFilter !== 'all' && reg.category !== categoryFilter) return false;
      if (statusFilter !== 'all' && reg.status !== statusFilter) return false;
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesId = reg.id.toLowerCase().includes(query);
        const matchesName = reg.fullName.toLowerCase().includes(query);
        const matchesPhone = reg.phone.includes(query);
        const matchesCity = reg.city.toLowerCase().includes(query);
        if (!matchesId && !matchesName && !matchesPhone && !matchesCity) return false;
      }
      return true;
    });
  }, [registrations, categoryFilter, statusFilter, searchTerm]);

  const newCount = registrations.filter((r) => r.status === 'New').length;
  const contactedCount = registrations.filter((r) => r.status === 'Contacted').length;
  const counselingCount = registrations.filter((r) => r.status === 'In Counseling').length;

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Support Requests & Care Registry</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Registrations & Rehabilitation Intake
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Active participants who requested support following the LifeMirror future-simulation experience.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setUnmaskPhone(!unmaskPhone)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 transition-colors"
          >
            {unmaskPhone ? <Lock className="w-3.5 h-3.5 text-purple-400" /> : <Unlock className="w-3.5 h-3.5 text-slate-400" />}
            <span>{unmaskPhone ? 'Mask Numbers' : 'Reveal Numbers'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Total Registrations</span>
          <p className="text-2xl font-bold font-mono text-white">{registrations.length}</p>
          <p className="text-[11px] text-purple-300">Directly from video outreach</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">New Intake Pending</span>
          <p className="text-2xl font-bold font-mono text-emerald-400">{newCount}</p>
          <p className="text-[11px] text-slate-400">Needs initial clinical contact</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Contacted</span>
          <p className="text-2xl font-bold font-mono text-cyan-400">{contactedCount}</p>
          <p className="text-[11px] text-slate-400">First call or chat completed</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Active In Counseling</span>
          <p className="text-2xl font-bold font-mono text-purple-400">{counselingCount}</p>
          <p className="text-[11px] text-slate-400">Enrolled in certified recovery</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Registration ID, name, city, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="Online Betting">Online Betting</option>
              <option value="Alcohol">Alcohol</option>
              <option value="Smoking">Smoking</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Gaming">Gaming</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none"
            >
              <option value="all">All Intake Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="In Counseling">In Counseling</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Case ID</th>
                <th className="py-3.5 px-4">Participant Name</th>
                <th className="py-3.5 px-4">Phone Number</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Pref. Contact & Time</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Intake Status</th>
                <th className="py-3.5 px-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400">
                    No registrations found.
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((reg) => {
                  const lead = leads.find((l) => l.id === reg.leadId);

                  return (
                    <tr key={reg.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                        {reg.id}
                        {reg.leadId && (
                          <button
                            onClick={() => lead && setSelectedLeadForDetail(lead)}
                            className="block text-[10px] text-slate-500 hover:text-purple-300 font-normal"
                          >
                            Lead: {reg.leadId}
                          </button>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-slate-200 font-semibold">
                        {reg.fullName}
                        <span className="block text-[10px] text-slate-400 font-normal">
                          Age: {reg.ageRange}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {unmaskPhone ? reg.phone : reg.phone.replace(/(\+91\s?)(\d{5})(\d{4})/, '$1••••••$3')}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[11px] whitespace-nowrap">
                          {reg.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-300">
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-200">
                          {reg.preferredContact === 'WhatsApp' ? (
                            <MessageSquare className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Phone className="w-3 h-3 text-cyan-400" />
                          )}
                          <span>{reg.preferredContact}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono block">
                          {reg.preferredTime}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-300 text-[11px]">
                        <span className="flex items-center gap-1 font-semibold text-white">
                          <MapPin className="w-3 h-3 text-emerald-400" />
                          <span>{reg.city}</span>
                        </span>
                        {reg.notes && (
                          <span className="text-[10px] text-slate-400 block truncate max-w-[200px]" title={reg.notes}>
                            {reg.notes}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            reg.status === 'New'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : reg.status === 'In Counseling'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : reg.status === 'Contacted'
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {reg.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <select
                          value={reg.status}
                          onChange={(e) => updateRegistrationStatus(reg.id, e.target.value as any)}
                          className="px-2.5 py-1 bg-slate-950 border border-slate-700 rounded-lg text-[11px] text-slate-200 focus:outline-none focus:border-purple-500"
                        >
                          <option value="New">Mark: New</option>
                          <option value="Contacted">Mark: Contacted</option>
                          <option value="In Counseling">Mark: In Counseling</option>
                          <option value="Completed">Mark: Completed</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
