export type AddictionCategory =
  | 'Alcohol'
  | 'Smoking'
  | 'Smartphone'
  | 'Online Betting'
  | 'Gaming'
  | 'Other';

export type RiskLevel = 'Low' | 'Moderate' | 'High';

export type ConsentStatus =
  | 'Opted In'
  | 'Partner Referral'
  | 'Consent Required'
  | 'Do Not Contact';

export type WhatsAppStatus =
  | 'Not Sent'
  | 'Pending'
  | 'Sent'
  | 'Delivered'
  | 'Failed';

export type VideoStatus = 'Not Viewed' | 'Viewed' | 'Completed';

export type RegistrationStatus = 'None' | 'Help Requested' | 'Registered';

export type RegistrationPipelineStatus =
  | 'New'
  | 'Contact Pending'
  | 'Counselor Assigned'
  | 'Assessment'
  | 'Rehabilitation Referred'
  | 'Completed';

export interface Lead {
  id: string;
  phone: string;
  rawPhone: string;
  addictionCategory: AddictionCategory;
  risk: RiskLevel;
  consent: ConsentStatus;
  matchedVideoId: string;
  whatsappStatus: WhatsAppStatus;
  videoStatus: VideoStatus;
  registrationStatus: RegistrationStatus;
  location: string;
  referralSource: string;
  createdAt: string;
  lastUpdated: string;
  notes?: string;
}

export interface VideoChapter {
  timeSec: number;
  title: string;
  narrativeText: string;
  visualMood: string;
  reflectionPrompt: string;
}

export interface VideoItem {
  id: string;
  title: string;
  category: AddictionCategory;
  filename: string;
  duration: string;
  durationSec: number;
  status: 'Ready' | 'Processing' | 'Archived';
  description: string;
  thumbnailGradient: string;
  accentColor: string;
  keyThemes: string[];
  simulatedNarrative: string;
  chapters: VideoChapter[];
  previewAudioTone: string;
}

export interface Registration {
  id: string;
  leadId?: string;
  fullName: string;
  phone: string;
  ageRange: string;
  city: string;
  preferredContact: 'WhatsApp' | 'Phone Call' | 'Confidential Email';
  preferredTime: 'Morning (9am - 12pm)' | 'Afternoon (12pm - 4pm)' | 'Evening (4pm - 8pm)' | 'Anytime';
  category: AddictionCategory;
  consentAgreed: boolean;
  status: RegistrationPipelineStatus;
  assignedCounselor?: string;
  createdAt: string;
  notes?: string;
}

export interface CategoryInfo {
  category: AddictionCategory;
  name: string;
  tagline: string;
  description: string;
  videoFilename: string;
  matchedVideoId: string;
  iconName: string;
  colorScheme: {
    badge: string;
    border: string;
    bgGlow: string;
    accent: string;
  };
  impactStats: {
    avgEscalationMonths: number;
    recoverySuccessRate: string;
    primaryImpactArea: string;
  };
}

export interface WhatsAppSendProgress {
  step: 'idle' | 'preparing' | 'uploading' | 'composing' | 'sending' | 'delivered' | 'error';
  progressPercentage: number;
  currentMessage: string;
  error?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'info' | 'warning' | 'error' | 'gateway';
  timestamp: number;
}

export interface CustomDispatchLog {
  id: string;
  recipientPhone: string;
  category: AddictionCategory;
  videoFilename: string;
  videoTitle: string;
  messageText: string;
  messageId: string;
  status: 'Sent' | 'Delivered' | 'Failed';
  timestamp: string;
  latencyMs: number;
  apiProvider: string;
  experienceUrl: string;
}

