import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AddictionCategory, ConsentStatus, Lead, RiskLevel, WhatsAppStatus } from '../types';
import {
  Search,
  Filter,
  Plus,
  Send,
  Eye,
  CheckCircle2,
  AlertCircle,
  X,
  Lock,
  Unlock,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
} from 'lucide-react';

export const LeadsView: React.FC = () => {
  const {
    leads,
    setSelectedLeadForDetail,
    setSelectedLeadForOutreach,
    setCurrentView,
    addOrUpdateLead,
    getVideoForCategory,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedConsent, setSelectedConsent] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [selectedWhatsApp, setSelectedWhatsApp] = useState<string>('all');
  const [selectedVideoStatus, setSelectedVideoStatus] = useState<string>('all');
  const [selectedRegStatus, setSelectedRegStatus] = useState<string>('all');
  const [unmaskAll, setUnmaskAll] = useState(false);

  // New Lead Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    phone: '+91 98999 12345',
    category: 'Online Betting' as AddictionCategory,
    risk: 'High' as RiskLevel,
    consent: 'Opted In' as ConsentStatus,
    location: 'Bengaluru, KA',
    referralSource: 'Self-Screening Assessment',
    notes: 'Requested awareness review regarding digital gaming wagers.',
  });

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesId = lead.id.toLowerCase().includes(term);
        const matchesPhone = lead.rawPhone.includes(term) || lead.phone.includes(term);
        const matchesLocation = lead.location.toLowerCase().includes(term);
        const matchesSource = lead.referralSource.toLowerCase().includes(term);
        if (!matchesId && !matchesPhone && !matchesLocation && !matchesSource) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && lead.addictionCategory !== selectedCategory) return false;

      // Consent filter
      if (selectedConsent !== 'all' && lead.consent !== selectedConsent) return false;

      // Risk filter
      if (selectedRisk !== 'all' && lead.risk !== selectedRisk) return false;

      // WhatsApp status filter
      if (selectedWhatsApp !== 'all' && lead.whatsappStatus !== selectedWhatsApp) return false;

      // Video status filter
      if (selectedVideoStatus !== 'all' && lead.videoStatus !== selectedVideoStatus) return false;

      // Registration status filter
      if (selectedRegStatus !== 'all' && lead.registrationStatus !== selectedRegStatus) return false;

      return true;
    });
  }, [
    leads,
    searchTerm,
    selectedCategory,
    selectedConsent,
    selectedRisk,
    selectedWhatsApp,
    selectedVideoStatus,
    selectedRegStatus,
  ]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedConsent('all');
    setSelectedRisk('all');
    setSelectedWhatsApp('all');
    setSelectedVideoStatus('all');
    setSelectedRegStatus('all');
  };

  const handleAddNewLead = (e: React.FormEvent) => {
    e.preventDefault();
    const nextNum = leads.length + 1;
    const newId = `LM-${nextNum.toString().padStart(3, '0')}`;
    const rawClean = newLeadForm.phone;
    const masked = rawClean.replace(/(\+91\s?)(\d{5})(\d{4})/, '$1••••••$3');

    const createdLead: Lead = {
      id: newId,
      phone: masked,
      rawPhone: rawClean,
      addictionCategory: newLeadForm.category,
      risk: newLeadForm.risk,
      consent: newLeadForm.consent,
      matchedVideoId: getVideoForCategory(newLeadForm.category).id,
      whatsappStatus: 'Not Sent',
      videoStatus: 'Not Viewed',
      registrationStatus: 'None',
      location: newLeadForm.location,
      referralSource: newLeadForm.referralSource,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      notes: newLeadForm.notes,
    };

    addOrUpdateLead(createdLead);
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Leads & Eligibility Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review screened leads, privacy consent levels, automatic video pairings, and WhatsApp outreach status
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setUnmaskAll(!unmaskAll)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 transition-colors"
          >
            {unmaskAll ? <Lock className="w-3.5 h-3.5 text-purple-400" /> : <Unlock className="w-3.5 h-3.5 text-slate-400" />}
            <span>{unmaskAll ? 'Mask Numbers' : 'Reveal Numbers'}</span>
          </button>

          <button
            id="btn-add-lead"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-600/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Screened Lead</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-xl space-y-3">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Lead ID (e.g. LM-004), phone, city, or referral source..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Categories</option>
              <option value="Alcohol">Alcohol</option>
              <option value="Smoking">Smoking</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Online Betting">Online Betting</option>
              <option value="Gaming">Gaming</option>
              <option value="Other">Other</option>
            </select>

            {/* Consent */}
            <select
              value={selectedConsent}
              onChange={(e) => setSelectedConsent(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Consent Statuses</option>
              <option value="Opted In">Opted In (Eligible)</option>
              <option value="Partner Referral">Partner Referral (Eligible)</option>
              <option value="Consent Required">Consent Required (Locked)</option>
              <option value="Do Not Contact">Do Not Contact (Locked)</option>
            </select>

            {/* Risk */}
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Priority Risks</option>
              <option value="High">High Priority</option>
              <option value="Moderate">Moderate Priority</option>
              <option value="Low">Low Priority</option>
            </select>

            {/* WhatsApp */}
            <select
              value={selectedWhatsApp}
              onChange={(e) => setSelectedWhatsApp(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-purple-500"
            >
              <option value="all">All WhatsApp Status</option>
              <option value="Not Sent">Not Sent</option>
              <option value="Sent">Sent</option>
              <option value="Delivered">Delivered</option>
            </select>

            {/* Video Status */}
            <select
              value={selectedVideoStatus}
              onChange={(e) => setSelectedVideoStatus(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Video Views</option>
              <option value="Not Viewed">Not Viewed</option>
              <option value="Viewed">Viewed</option>
            </select>

            {/* Registration */}
            <select
              value={selectedRegStatus}
              onChange={(e) => setSelectedRegStatus(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Registration States</option>
              <option value="None">None</option>
              <option value="Help Requested">Help Requested</option>
              <option value="Registered">Registered</option>
            </select>

            {/* Reset */}
            <button
              onClick={resetFilters}
              title="Reset all filters"
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Stats Bar */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60 font-mono">
          <span>Showing {filteredLeads.length} of {leads.length} leads in database</span>
          <span className="text-emerald-400">
            {filteredLeads.filter((l) => l.consent === 'Opted In' || l.consent === 'Partner Referral').length} eligible for outreach
          </span>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Lead ID</th>
                <th className="py-3.5 px-4">Phone Number</th>
                <th className="py-3.5 px-4">Addiction</th>
                <th className="py-3.5 px-4">Risk / Priority</th>
                <th className="py-3.5 px-4">Consent Status</th>
                <th className="py-3.5 px-4">Matched Video</th>
                <th className="py-3.5 px-4">WhatsApp Status</th>
                <th className="py-3.5 px-4">Video Status</th>
                <th className="py-3.5 px-4">Registration</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400">
                    <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-300">No leads match your filter criteria.</p>
                    <button
                      onClick={resetFilters}
                      className="mt-2 text-xs text-purple-400 hover:underline"
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const isEligible = lead.consent === 'Opted In' || lead.consent === 'Partner Referral';
                  const isPrimaryDemo = lead.id === 'LM-004';

                  return (
                    <tr
                      key={lead.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isPrimaryDemo ? 'bg-purple-950/15' : ''
                      }`}
                    >
                      {/* Lead ID */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 font-mono font-bold text-slate-200">
                          <span>{lead.id}</span>
                          {isPrimaryDemo && (
                            <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] uppercase font-sans">
                              Demo
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="py-3.5 px-4 font-mono text-slate-300 text-xs">
                        {unmaskAll ? lead.rawPhone : lead.phone}
                      </td>

                      {/* Addiction Category */}
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium whitespace-nowrap">
                          {lead.addictionCategory}
                        </span>
                      </td>

                      {/* Risk */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            lead.risk === 'High'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              : lead.risk === 'Moderate'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {lead.risk}
                        </span>
                      </td>

                      {/* Consent */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap ${
                            isEligible
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {isEligible ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Lock className="w-3 h-3 text-slate-500" />}
                          {lead.consent}
                        </span>
                      </td>

                      {/* Matched Video */}
                      <td className="py-3.5 px-4 font-mono text-purple-300/90 text-xs whitespace-nowrap">
                        {lead.addictionCategory.toLowerCase().replace(/\s+/g, '')}.mp4
                      </td>

                      {/* WhatsApp Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
                            lead.whatsappStatus === 'Delivered'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : lead.whatsappStatus === 'Sent'
                              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {lead.whatsappStatus}
                        </span>
                      </td>

                      {/* Video Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-xs ${
                            lead.videoStatus === 'Viewed'
                              ? 'text-emerald-400 font-semibold flex items-center gap-1'
                              : 'text-slate-500'
                          }`}
                        >
                          {lead.videoStatus === 'Viewed' && <Eye className="w-3 h-3" />}
                          {lead.videoStatus}
                        </span>
                      </td>

                      {/* Registration Status */}
                      <td className="py-3.5 px-4">
                        {lead.registrationStatus === 'Registered' ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-[11px]">
                            Registered
                          </span>
                        ) : lead.registrationStatus === 'Help Requested' ? (
                          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-medium border border-purple-500/30 text-[11px]">
                            Help Requested
                          </span>
                        ) : (
                          <span className="text-slate-500 text-xs">-</span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isEligible && lead.whatsappStatus === 'Not Sent' && (
                            <button
                              onClick={() => {
                                setSelectedLeadForOutreach(lead);
                                setCurrentView('outreach');
                              }}
                              title="Start WhatsApp Outreach"
                              className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            id={`btn-view-lead-${lead.id}`}
                            onClick={() => setSelectedLeadForDetail(lead)}
                            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-300 text-xs font-semibold transition-colors"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Screened Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">+ Add Consented Intake Lead</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewLead} className="py-4 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Phone Number (with Country Code)</label>
                <input
                  type="text"
                  required
                  value={newLeadForm.phone}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Addiction Category</label>
                  <select
                    value={newLeadForm.category}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, category: e.target.value as AddictionCategory })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="Alcohol">Alcohol</option>
                    <option value="Smoking">Smoking</option>
                    <option value="Smartphone">Smartphone</option>
                    <option value="Online Betting">Online Betting</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Risk / Priority</label>
                  <select
                    value={newLeadForm.risk}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, risk: e.target.value as RiskLevel })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="High">High</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Consent Status</label>
                  <select
                    value={newLeadForm.consent}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, consent: e.target.value as ConsentStatus })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="Opted In">Opted In (Eligible)</option>
                    <option value="Partner Referral">Partner Referral (Eligible)</option>
                    <option value="Consent Required">Consent Required</option>
                    <option value="Do Not Contact">Do Not Contact</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">City / Region</label>
                  <input
                    type="text"
                    value={newLeadForm.location}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Referral / Intake Source</label>
                <input
                  type="text"
                  value={newLeadForm.referralSource}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, referralSource: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Clinical / Screening Note</label>
                <textarea
                  rows={2}
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl"
                >
                  Create Screened Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
