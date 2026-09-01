import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AddictionCategory, Lead } from '../types';
import { REHAB_CENTERS_DATABASE, RehabCenter, POPULAR_CITIES } from '../data/rehabCenters';
import {
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
  X,
  Sparkles,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  MapPin,
  ArrowRight,
  Building2,
  Star,
  ExternalLink,
  Navigation,
  Check,
  Award,
  Calendar,
  AlertCircle,
  Search,
  Filter,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SupportRegistrationModalProps {
  category: AddictionCategory;
  lead?: Lead | null;
  onClose: () => void;
}

export const SupportRegistrationModal: React.FC<SupportRegistrationModalProps> = ({
  category,
  lead,
  onClose,
}) => {
  const { submitRegistration, setCurrentView, addToast } = useApp();

  // Step 1: Details & Location, Step 2: Nearest Rehabs & Intake Confirmation
  const [step, setStep] = useState<'form' | 'rehabs' | 'success'>('form');

  // Form Fields
  const [fullName, setFullName] = useState(
    lead ? (lead.id === 'LM-004' ? 'Arjun Varma' : 'Anonymous Participant') : ''
  );
  const [phone, setPhone] = useState(lead ? lead.rawPhone : '+91 9014848294');
  const [ageRange, setAgeRange] = useState('25-34');
  const [city, setCity] = useState(lead?.location?.split(',')[0] || 'Hyderabad');
  const [customCitySearch, setCustomCitySearch] = useState('');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Phone Call' | 'Confidential Email'>('WhatsApp');
  const [preferredTime, setPreferredTime] = useState<'Morning (9am - 12pm)' | 'Afternoon (12pm - 4pm)' | 'Evening (4pm - 8pm)' | 'Anytime'>('Evening (4pm - 8pm)');
  const [selectedCategory, setSelectedCategory] = useState<AddictionCategory>(category);
  const [urgencyLevel, setUrgencyLevel] = useState<'Immediate Detox & Admission' | 'Outpatient Counseling' | 'Tele-Consultation' | 'Information Only'>('Outpatient Counseling');
  const [consentAgreed, setConsentAgreed] = useState<boolean>(true);

  // Selected rehab
  const [selectedRehab, setSelectedRehab] = useState<RehabCenter | null>(null);
  const [registrationId, setRegistrationId] = useState<string | null>(null);

  // Filter nearest rehabs based on selected city & category
  const matchedRehabs = useMemo(() => {
    const activeCity = customCitySearch.trim() || city;
    const query = activeCity.toLowerCase();

    // Find city matches first
    const inCity = REHAB_CENTERS_DATABASE.filter(
      (r) =>
        r.city.toLowerCase().includes(query) ||
        r.state.toLowerCase().includes(query) ||
        r.address.toLowerCase().includes(query)
    );

    // Online / Tele-rehab fallback
    const onlineCenters = REHAB_CENTERS_DATABASE.filter((r) => r.city.includes('Online'));

    let results = inCity.length > 0 ? inCity : REHAB_CENTERS_DATABASE;

    // Prioritize ones that match selectedCategory
    return results.slice().sort((a, b) => {
      const aMatches = a.specialties.includes(selectedCategory) ? 1 : 0;
      const bMatches = b.specialties.includes(selectedCategory) ? 1 : 0;
      if (aMatches !== bMatches) return bMatches - aMatches;
      return a.distanceKm - b.distanceKm;
    });
  }, [city, customCitySearch, selectedCategory]);

  const handleNextToRehabs = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.trim().length < 6) {
      addToast('Enter Phone Number', 'Please provide a contact phone number.', 'warning');
      return;
    }
    // Auto-select first recommended rehab
    if (matchedRehabs.length > 0 && !selectedRehab) {
      setSelectedRehab(matchedRehabs[0]);
    }
    setStep('rehabs');
  };

  const handleFinalSubmit = (chosenRehab?: RehabCenter) => {
    const finalRehab = chosenRehab || selectedRehab || matchedRehabs[0];
    const newId = submitRegistration({
      leadId: lead?.id,
      fullName: fullName || 'Confidential Member',
      phone: phone || '+91 9014848294',
      ageRange,
      city: customCitySearch.trim() || city,
      preferredContact,
      preferredTime,
      category: selectedCategory,
      consentAgreed: true,
      notes: `Intake registered for ${selectedCategory}. Assigned / Matched Nearest Center: ${finalRehab?.name} (${finalRehab?.city}). Urgency: ${urgencyLevel}.`,
    });

    setRegistrationId(newId);
    setStep('success');

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#a855f7', '#3b82f6'],
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div
        id="support-registration-modal"
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Confidential Care Registration & Nearest Rehabs
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Step {step === 'form' ? '1/2' : step === 'rehabs' ? '2/2' : 'Done'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                "Every habit has a story. And every story can have a different next chapter."
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Navigation */}
        <div className="grid grid-cols-2 border-b border-slate-800 bg-slate-950/40 text-xs text-center font-medium">
          <button
            type="button"
            onClick={() => setStep('form')}
            className={`py-2.5 flex items-center justify-center gap-1.5 transition-colors ${
              step === 'form'
                ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold bg-emerald-950/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>1. Your Information & City</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (phone) setStep('rehabs');
            }}
            className={`py-2.5 flex items-center justify-center gap-1.5 transition-colors ${
              step === 'rehabs'
                ? 'text-purple-400 border-b-2 border-purple-400 font-bold bg-purple-950/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>2. Suggested Nearest Rehab Centers ({matchedRehabs.length})</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* STEP 1: INFORMATION & CITY INPUT */}
          {step === 'form' && (
            <form onSubmit={handleNextToRehabs} className="space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">100% Confidential & Free of Charge</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    We only use this information to match you with accredited de-addiction centers and verified medical counselors nearest to your city.
                  </p>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Your Name or Preferred Alias
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arjun Varma (or Anonymous)"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Contact Phone Number (WhatsApp / Call)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9014848294"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Addiction Category & Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Habit / Addiction Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as AddictionCategory)}
                    className="w-full px-3.5 py-2.5 bg-purple-950/40 border border-purple-500/50 rounded-xl text-purple-200 font-bold focus:outline-none"
                  >
                    <option value="Online Betting">🎰 Online Betting / Gambling</option>
                    <option value="Alcohol">🍺 Alcohol Dependency</option>
                    <option value="Smoking">🚬 Smoking / Nicotine</option>
                    <option value="Smartphone">📱 Smartphone / Screen Addiction</option>
                    <option value="Gaming">🎮 Gaming Addiction</option>
                    <option value="Other">🌐 Other Substance / Behavioral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Age Group
                  </label>
                  <select
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="18-24">18 - 24 years</option>
                    <option value="25-34">25 - 34 years</option>
                    <option value="35-44">35 - 44 years</option>
                    <option value="45-54">45 - 54 years</option>
                    <option value="55+">55+ years</option>
                  </select>
                </div>
              </div>

              {/* City Selection for Nearest Rehab Suggestion */}
              <div className="space-y-2 pt-1">
                <label className="block text-slate-300 font-bold flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-emerald-300">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Select Your City (To Locate Nearest Rehabs)</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {matchedRehabs.length} verified centers found
                  </span>
                </label>

                {/* Popular City Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_CITIES.map((c) => {
                    const isSelected = city === c && !customCitySearch;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          setCity(c);
                          setCustomCitySearch('');
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                            : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>

                {/* Custom City input */}
                <div className="relative pt-1">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    placeholder="Or type other city / locality (e.g. Visakhapatnam, Vijayawada, Kochi)..."
                    value={customCitySearch}
                    onChange={(e) => setCustomCitySearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Contact Method & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Preferred Confidential Contact
                  </label>
                  <select
                    value={preferredContact}
                    onChange={(e) => setPreferredContact(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none"
                  >
                    <option value="WhatsApp">💬 WhatsApp Message</option>
                    <option value="Phone Call">📞 Confidential Phone Call</option>
                    <option value="Confidential Email">✉️ Confidential Email</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Best Time to Connect
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 focus:outline-none"
                  >
                    <option value="Evening (4pm - 8pm)">Evening (4pm - 8pm)</option>
                    <option value="Morning (9am - 12pm)">Morning (9am - 12pm)</option>
                    <option value="Afternoon (12pm - 4pm)">Afternoon (12pm - 4pm)</option>
                    <option value="Anytime">Anytime (24/7)</option>
                  </select>
                </div>
              </div>

              {/* Consent checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer text-slate-300 select-none pt-1">
                <input
                  type="checkbox"
                  required
                  checked={consentAgreed}
                  onChange={(e) => setConsentAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
                />
                <span className="leading-snug text-[11px] text-slate-400">
                  I agree to receive confidential recommendations for verified rehabs and recovery counselors. Zero spam, 100% private.
                </span>
              </label>

              {/* Next Step Button */}
              <div className="pt-2">
                <button
                  id="btn-view-nearest-rehabs"
                  type="submit"
                  disabled={!consentAgreed}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>SEE NEAREST SUGGESTED REHABS IN {customCitySearch || city}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: NEAREST SUGGESTED REHABS & INTAKE SELECTION */}
          {step === 'rehabs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-400" />
                    <span>Verified Nearest Rehabs for {selectedCategory} in {customCitySearch || city}</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Showing top accredited facilities with specialized doctors & 24/7 care.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="text-xs text-purple-400 hover:underline font-semibold"
                >
                  ← Edit City / Details
                </button>
              </div>

              {/* Rehab Cards List */}
              <div className="space-y-3">
                {matchedRehabs.map((rehab) => {
                  const isSelected = selectedRehab?.id === rehab.id;
                  const matchesSpecialty = rehab.specialties.includes(selectedCategory);

                  return (
                    <div
                      key={rehab.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-slate-950 border-emerald-500 ring-2 ring-emerald-500/30 shadow-xl'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-white">{rehab.name}</span>
                            {matchesSpecialty && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                                ⭐ Matched for {selectedCategory}
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {rehab.pricing}
                            </span>
                          </div>

                          <p className="text-xs text-slate-300">{rehab.tagline}</p>

                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                            <span className="flex items-center gap-1 text-emerald-400 font-bold">
                              <MapPin className="w-3 h-3" />
                              <span>{rehab.distanceKm} km away ({rehab.area}, {rehab.city})</span>
                            </span>
                            <span className="flex items-center gap-1 text-amber-400 font-semibold">
                              <Star className="w-3 h-3 fill-amber-400" />
                              <span>{rehab.rating} ({rehab.reviewsCount} reviews)</span>
                            </span>
                            <span className="flex items-center gap-1 text-slate-400 font-mono">
                              <Award className="w-3 h-3 text-cyan-400" />
                              <span>{rehab.accreditation}</span>
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedRehab(rehab)}
                          className={`p-2 rounded-xl border shrink-0 transition-all ${
                            isSelected
                              ? 'bg-emerald-500 text-slate-950 border-emerald-500 font-bold'
                              : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                          }`}
                        >
                          {isSelected ? <Check className="w-4 h-4" /> : <span className="text-xs px-1">Select</span>}
                        </button>
                      </div>

                      {/* Doctor & Treatment Highlights */}
                      <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-slate-500 block uppercase text-[9px] font-bold">Doctors & Clinical Team</span>
                          <span className="text-slate-300 font-medium">{rehab.doctorsAvailable}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block uppercase text-[9px] font-bold">Key Treatments</span>
                          <span className="text-purple-300 font-medium truncate block">
                            {rehab.treatmentTypes.slice(0, 3).join(' • ')}
                          </span>
                        </div>
                      </div>

                      {/* Direct Actions on Card */}
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
                        <div className="flex items-center gap-3">
                          <a
                            href={`tel:${rehab.phone.replace(/[^0-9+]/g, '')}`}
                            className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Helpline: {rehab.phone}</span>
                          </a>
                          <a
                            href={`https://wa.me/${rehab.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I am reaching out through LifeMirror for confidential support regarding ${selectedCategory}.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-[#25D366] hover:underline flex items-center gap-1 font-semibold"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp Center</span>
                          </a>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleFinalSubmit(rehab)}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1"
                        >
                          <span>Register with this Rehab</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Confirm Registration CTA */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  ← Back to Details
                </button>

                <button
                  type="button"
                  onClick={() => handleFinalSubmit()}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>CONFIRM REGISTRATION & PRIORITY INTAKE</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REGISTRATION SUCCESS SCREEN */}
          {step === 'success' && (
            <div className="text-center py-6 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/20">
                  ✓ Priority Care Intake Confirmed
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  You're not alone. The next chapter starts here.
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Your confidential support intake has been registered. You have been connected with your nearest certified recovery team.
                </p>
              </div>

              {/* Matched Rehab & Case ID Card */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">Confidential Case ID:</span>
                  <span className="text-sm font-mono font-bold text-emerald-400">{registrationId}</span>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Assigned Nearest Facility</span>
                  <p className="text-sm font-bold text-white">{selectedRehab?.name || matchedRehabs[0]?.name}</p>
                  <p className="text-xs text-purple-300">{selectedRehab?.address || matchedRehabs[0]?.address}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Preferred Contact: <strong className="text-white">{preferredContact} ({preferredTime})</strong></span>
                  <span className="text-emerald-400 font-mono font-bold">Priority Status: Active</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  Close & Return to Video
                </button>

                <button
                  id="btn-view-in-admin-registrations"
                  onClick={() => {
                    onClose();
                    setCurrentView('registrations');
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>View in Admin Care Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-slate-950/80 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>End-to-end encrypted clinical intake</span>
          </span>
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
