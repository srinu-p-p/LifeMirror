import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  AddictionCategory,
  CategoryInfo,
  Lead,
  Registration,
  RegistrationPipelineStatus,
  ToastMessage,
  VideoItem,
  WhatsAppSendProgress,
  WhatsAppStatus,
} from '../types';
import {
  ADDICTION_CATEGORIES_DATA,
  INITIAL_LEADS,
  INITIAL_REGISTRATIONS,
  VIDEO_LIBRARY_DATA,
} from '../data/mockData';
import { whatsAppService } from '../services/WhatsAppService';

interface AppContextType {
  // Navigation & View
  currentView: string;
  setCurrentView: (view: string) => void;

  // Data
  leads: Lead[];
  videos: VideoItem[];
  categories: CategoryInfo[];
  registrations: Registration[];

  // Selected entities for modals & flows
  selectedLeadForDetail: Lead | null;
  setSelectedLeadForDetail: (lead: Lead | null) => void;
  selectedLeadForOutreach: Lead | null;
  setSelectedLeadForOutreach: (lead: Lead | null) => void;
  previewVideo: VideoItem | null;
  setPreviewVideo: (video: VideoItem | null) => void;

  // User Experience State (The simulated end-user perspective)
  userExperienceCategory: AddictionCategory;
  userExperienceLead: Lead | null;
  launchUserExperience: (category?: AddictionCategory, lead?: Lead | null) => void;
  exitUserExperience: () => void;

  // Core Actions
  getVideoForCategory: (category: AddictionCategory) => VideoItem;
  sendWhatsAppOutreach: (leadId: string, customMessage?: string) => Promise<boolean>;
  recordVideoViewed: (leadId?: string, category?: AddictionCategory) => void;
  recordHelpRequested: (leadId?: string, category?: AddictionCategory) => void;
  submitRegistration: (formData: Omit<Registration, 'id' | 'createdAt' | 'status'>) => string;
  updateRegistrationStatus: (id: string, status: RegistrationPipelineStatus, assignedCounselor?: string, notes?: string) => void;
  addOrUpdateLead: (lead: Lead) => void;
  updateVideo: (videoId: string, partial: Partial<VideoItem>) => void;
  resetDemoData: () => void;

  // WhatsApp Sending Gateway Modal State
  isSendModalOpen: boolean;
  setIsSendModalOpen: (open: boolean) => void;
  sendProgress: WhatsAppSendProgress;

  // Direct Number Dispatcher Modal (Judge Demo)
  isDirectDispatchModalOpen: boolean;
  setIsDirectDispatchModalOpen: (open: boolean) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, description: string, type?: 'success' | 'info' | 'warning' | 'error' | 'gateway') => void;
  removeToast: (id: string) => void;

  // Computed KPIs
  kpiStats: {
    totalLeads: number;
    eligibleLeads: number;
    videosReady: number;
    messagesSent: number;
    messagesDelivered: number;
    videosViewed: number;
    helpRequests: number;
    registrations: number;
  };
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY_LEADS = 'lifemirror_leads_v2';
const STORAGE_KEY_REGISTRATIONS = 'lifemirror_registrations_v2';
const STORAGE_KEY_VIDEOS = 'lifemirror_videos_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<string>('dashboard');

  // Leads
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LEADS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_LEADS;
  });

  // Registrations
  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REGISTRATIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_REGISTRATIONS;
  });

  // Videos
  const [videos, setVideos] = useState<VideoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VIDEOS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return VIDEO_LIBRARY_DATA;
  });

  const categories = useMemo(() => ADDICTION_CATEGORIES_DATA, []);

  // Modals & Selection
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<Lead | null>(null);
  const [selectedLeadForOutreach, setSelectedLeadForOutreach] = useState<Lead | null>(null);
  const [previewVideo, setPreviewVideo] = useState<VideoItem | null>(null);

  // User Experience (Public-facing simulation)
  const [userExperienceCategory, setUserExperienceCategory] = useState<AddictionCategory>('Online Betting');
  const [userExperienceLead, setUserExperienceLead] = useState<Lead | null>(null);

  // WhatsApp Send Gateway state
  const [isSendModalOpen, setIsSendModalOpen] = useState<boolean>(false);
  const [isDirectDispatchModalOpen, setIsDirectDispatchModalOpen] = useState<boolean>(false);
  const [sendProgress, setSendProgress] = useState<WhatsAppSendProgress>({
    step: 'idle',
    progressPercentage: 0,
    currentMessage: 'Idle',
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
    } catch (e) {
      console.error(e);
    }
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(registrations));
    } catch (e) {
      console.error(e);
    }
  }, [registrations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_VIDEOS, JSON.stringify(videos));
    } catch (e) {
      console.error(e);
    }
  }, [videos]);

  const addToast = (
    title: string,
    description: string,
    type: 'success' | 'info' | 'warning' | 'error' | 'gateway' = 'info'
  ) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev.slice(-4), { id, title, description, type, timestamp: Date.now() }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Helper to get video for category
  const getVideoForCategory = (category: AddictionCategory): VideoItem => {
    const matched = videos.find(v => v.category === category);
    if (matched) return matched;
    return videos[0];
  };

  // Launch User Experience
  const launchUserExperience = (category?: AddictionCategory, lead?: Lead | null) => {
    const chosenCategory = category || (lead ? lead.addictionCategory : 'Online Betting');
    setUserExperienceCategory(chosenCategory);
    setUserExperienceLead(lead || null);
    setCurrentView('user-experience');
    addToast(
      'Simulated User Experience Opened',
      `Switched to confidential recipient view for ${chosenCategory} experience.`,
      'info'
    );
  };

  const exitUserExperience = () => {
    setCurrentView('dashboard');
  };

  // Send WhatsApp Outreach (with realistic progressive simulation)
  const sendWhatsAppOutreach = async (leadId: string, customMessage?: string): Promise<boolean> => {
    const targetLead = leads.find(l => l.id === leadId);
    if (!targetLead) return false;

    // Check eligibility
    if (targetLead.consent !== 'Opted In' && targetLead.consent !== 'Partner Referral') {
      addToast(
        'Outreach Prohibited',
        `Lead ${targetLead.id} status is "${targetLead.consent}". Only Opted In and Partner Referral are eligible for WhatsApp outreach.`,
        'warning'
      );
      return false;
    }

    const matchedVid = getVideoForCategory(targetLead.addictionCategory);
    setIsSendModalOpen(true);
    setSendProgress({
      step: 'preparing',
      progressPercentage: 15,
      currentMessage: `Loading video asset "${matchedVid.filename}" for ${targetLead.addictionCategory}...`,
    });

    try {
      const result = await whatsAppService.sendVideoMessage({
        recipientPhone: targetLead.rawPhone,
        leadId: targetLead.id,
        category: targetLead.addictionCategory,
        videoId: matchedVid.id,
        videoFilename: matchedVid.filename,
        videoTitle: matchedVid.title,
        messageText: customMessage || 'We created a short experience to help you reflect on how today choices can shape tomorrow.',
        experienceUrl: `https://lifemirror.app/exp/${targetLead.id}`,
        onProgress: (step, percent, msg) => {
          setSendProgress({
            step,
            progressPercentage: percent,
            currentMessage: msg,
          });
        },
      });

      // Update lead state
      setLeads(prev =>
        prev.map(l =>
          l.id === leadId
            ? {
                ...l,
                whatsappStatus: 'Delivered' as WhatsAppStatus,
                lastUpdated: new Date().toISOString(),
              }
            : l
        )
      );

      addToast(
        'WhatsApp Video Sent',
        `Delivered "${matchedVid.title}" to ${targetLead.phone} via simulated gateway.`,
        'success'
      );

      return true;
    } catch (err: any) {
      setSendProgress({
        step: 'error',
        progressPercentage: 0,
        currentMessage: 'Simulation error encountered',
        error: err?.message || 'Unknown error',
      });
      addToast('Outreach Failed', 'Could not dispatch message.', 'error');
      return false;
    }
  };

  // Record Video Viewed
  const recordVideoViewed = (leadId?: string, category?: AddictionCategory) => {
    if (leadId) {
      setLeads(prev =>
        prev.map(l =>
          l.id === leadId
            ? {
                ...l,
                videoStatus: 'Viewed',
                lastUpdated: new Date().toISOString(),
              }
            : l
        )
      );
    }
    addToast(
      'Video Engagement Recorded',
      `User opened and watched awareness experience (${category || 'General'}).`,
      'info'
    );
  };

  // Record Help Requested
  const recordHelpRequested = (leadId?: string, category?: AddictionCategory) => {
    if (leadId) {
      setLeads(prev =>
        prev.map(l =>
          l.id === leadId
            ? {
                ...l,
                registrationStatus: l.registrationStatus === 'Registered' ? 'Registered' : 'Help Requested',
                lastUpdated: new Date().toISOString(),
              }
            : l
        )
      );
    }
    addToast(
      'Support Intent Triggered',
      'User clicked "I WANT SUPPORT" after video reflection.',
      'success'
    );
  };

  // Submit Support Registration
  const submitRegistration = (formData: Omit<Registration, 'id' | 'createdAt' | 'status'>): string => {
    const regNumber = 10022 + registrations.length;
    const newId = `LM-R-${regNumber}`;

    const newReg: Registration = {
      ...formData,
      id: newId,
      status: 'New',
      createdAt: new Date().toISOString(),
    };

    setRegistrations(prev => [newReg, ...prev]);

    // If attached to a lead, update lead status
    if (formData.leadId) {
      setLeads(prev =>
        prev.map(l =>
          l.id === formData.leadId
            ? {
                ...l,
                registrationStatus: 'Registered',
                lastUpdated: new Date().toISOString(),
              }
            : l
        )
      );
    } else {
      // Find matching lead by phone if possible
      const matched = leads.find(l => l.rawPhone.replace(/\s+/g, '') === formData.phone.replace(/\s+/g, ''));
      if (matched) {
        setLeads(prev =>
          prev.map(l =>
            l.id === matched.id
              ? {
                  ...l,
                  registrationStatus: 'Registered',
                  lastUpdated: new Date().toISOString(),
                }
              : l
          )
        );
      }
    }

    addToast(
      'Registration Created',
      `Support case ${newId} registered and assigned to outreach queue.`,
      'success'
    );

    return newId;
  };

  const updateRegistrationStatus = (
    id: string,
    status: RegistrationPipelineStatus,
    assignedCounselor?: string,
    notes?: string
  ) => {
    setRegistrations(prev =>
      prev.map(r =>
        r.id === id
          ? {
              ...r,
              status,
              assignedCounselor: assignedCounselor !== undefined ? assignedCounselor : r.assignedCounselor,
              notes: notes !== undefined ? notes : r.notes,
            }
          : r
      )
    );
    addToast('Status Updated', `Case ${id} updated to "${status}".`, 'info');
  };

  const addOrUpdateLead = (lead: Lead) => {
    setLeads(prev => {
      const idx = prev.findIndex(l => l.id === lead.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = lead;
        return copy;
      }
      return [lead, ...prev];
    });
  };

  const updateVideo = (videoId: string, partial: Partial<VideoItem>) => {
    setVideos(prev =>
      prev.map(v => (v.id === videoId ? { ...v, ...partial } : v))
    );
    addToast('Video Updated', `Updated video parameters for ID ${videoId}`, 'info');
  };

  const resetDemoData = () => {
    setLeads(INITIAL_LEADS);
    setRegistrations(INITIAL_REGISTRATIONS);
    setVideos(VIDEO_LIBRARY_DATA);
    localStorage.removeItem(STORAGE_KEY_LEADS);
    localStorage.removeItem(STORAGE_KEY_REGISTRATIONS);
    localStorage.removeItem(STORAGE_KEY_VIDEOS);
    addToast('Demo Data Reset', 'Prototype restored to baseline scenario.', 'info');
  };

  // Dynamic KPI calculation
  const kpiStats = useMemo(() => {
    // Base scale multipliers + active dynamic delta
    const localDelivered = leads.filter(l => l.whatsappStatus === 'Delivered').length;
    const localSent = leads.filter(l => l.whatsappStatus === 'Sent' || l.whatsappStatus === 'Delivered').length;
    const localViewed = leads.filter(l => l.videoStatus === 'Viewed').length;
    const localHelp = leads.filter(l => l.registrationStatus === 'Help Requested' || l.registrationStatus === 'Registered').length;
    const localRegs = registrations.length;

    return {
      totalLeads: 500 + Math.max(0, leads.length - INITIAL_LEADS.length),
      eligibleLeads: 386,
      videosReady: 386,
      messagesSent: 214 + (localSent - 11),
      messagesDelivered: 198 + (localDelivered - 10),
      videosViewed: 142 + (localViewed - 9),
      helpRequests: 37 + (localHelp - 8),
      registrations: 18 + (localRegs - INITIAL_REGISTRATIONS.length),
    };
  }, [leads, registrations]);

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        leads,
        videos,
        categories,
        registrations,
        selectedLeadForDetail,
        setSelectedLeadForDetail,
        selectedLeadForOutreach,
        setSelectedLeadForOutreach,
        previewVideo,
        setPreviewVideo,
        userExperienceCategory,
        userExperienceLead,
        launchUserExperience,
        exitUserExperience,
        getVideoForCategory,
        sendWhatsAppOutreach,
        recordVideoViewed,
        recordHelpRequested,
        submitRegistration,
        updateRegistrationStatus,
        addOrUpdateLead,
        updateVideo,
        resetDemoData,
        isSendModalOpen,
        setIsSendModalOpen,
        isDirectDispatchModalOpen,
        setIsDirectDispatchModalOpen,
        sendProgress,
        toasts,
        addToast,
        removeToast,
        kpiStats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
