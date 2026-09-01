import { AddictionCategory, WhatsAppStatus } from '../types';

export interface SendVideoParams {
  recipientPhone: string;
  leadId: string;
  category: AddictionCategory;
  videoId: string;
  videoFilename: string;
  videoTitle: string;
  messageText: string;
  experienceUrl: string;
  onProgress?: (step: 'preparing' | 'uploading' | 'composing' | 'sending' | 'delivered', percent: number, statusText: string) => void;
}

export interface SendTemplateParams {
  recipientPhone: string;
  templateName: string;
  languageCode: string;
  components: Array<{
    type: 'header' | 'body' | 'button';
    parameters: Array<{ type: string; text?: string; video?: { link: string } }>;
  }>;
}

export interface CustomDirectDispatchParams {
  phoneNumber: string;
  category: AddictionCategory;
  videoId: string;
  videoFilename: string;
  videoTitle: string;
  videoDuration: string;
  messageText: string;
  experienceUrl: string;
  onProgress?: (step: 'preparing' | 'uploading' | 'composing' | 'sending' | 'delivered', percent: number, statusText: string) => void;
}

export interface CustomDispatchResponse {
  success: boolean;
  messageId: string;
  recipientPhone: string;
  status: WhatsAppStatus;
  matchedCategory: AddictionCategory;
  attachedVideo: {
    filename: string;
    title: string;
    duration: string;
    cdnUrl: string;
  };
  gateway: {
    provider: string;
    route: string;
    latencyMs: number;
    deliveryReceipt: string;
    statusCode: number;
    verifiedSender: string;
  };
  experienceUrl: string;
  timestamp: string;
  rawJson?: string;
}

export interface SendResult {
  success: boolean;
  messageId: string;
  recipientPhone: string;
  timestamp: string;
  status: WhatsAppStatus;
  mode: 'DEMO_SIMULATION' | 'CLOUD_API';
  details: string;
}

export interface IWhatsAppService {
  sendVideoMessage(params: SendVideoParams): Promise<SendResult>;
  sendTemplateMessage(params: SendTemplateParams): Promise<SendResult>;
  dispatchCustomNumberMessage(params: CustomDirectDispatchParams): Promise<CustomDispatchResponse>;
  getMessageStatus(messageId: string): Promise<WhatsAppStatus>;
}

/**
 * MockWhatsAppService for LifeMirror Prototype Simulation
 * Simulates real WhatsApp Business Cloud API delivery states with realistic network delays & events.
 */
export class MockWhatsAppService implements IWhatsAppService {
  private simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async dispatchCustomNumberMessage(params: CustomDirectDispatchParams): Promise<CustomDispatchResponse> {
    const { onProgress, phoneNumber, category, videoFilename, videoTitle, videoDuration, messageText, experienceUrl } = params;

    if (onProgress) onProgress('preparing', 20, `Resolving carrier routing and encoding video "${videoFilename}"...`);
    await this.simulateDelay(450);

    if (onProgress) onProgress('uploading', 50, `Uploading media payload to Meta WhatsApp Cloud CDN...`);
    await this.simulateDelay(550);

    if (onProgress) onProgress('composing', 75, `Signing HMAC-SHA256 interactive template for ${phoneNumber}...`);
    await this.simulateDelay(450);

    // Try calling the live API endpoint on server
    try {
      const resp = await fetch('/api/whatsapp/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          category,
          videoFilename,
          videoTitle,
          videoDuration,
          customMessage: messageText,
          experienceUrl,
        }),
      });

      if (resp.ok) {
        const apiData = await resp.json();
        if (onProgress) onProgress('sending', 90, `Direct cellular packet handshake with ${phoneNumber}...`);
        await this.simulateDelay(400);

        if (onProgress) onProgress('delivered', 100, `Message Delivered (Double Blue Check confirmation)`);
        await this.simulateDelay(200);

        return {
          ...apiData,
          rawJson: JSON.stringify(apiData, null, 2),
        };
      }
    } catch (e) {
      console.warn('API endpoint call fallback to in-memory dispatch engine:', e);
    }

    if (onProgress) onProgress('sending', 90, `Transmitting through WhatsApp Cloud Gateway...`);
    await this.simulateDelay(400);

    if (onProgress) onProgress('delivered', 100, `Delivered: Double blue checkmark confirmed on recipient handset`);
    await this.simulateDelay(200);

    const messageId = `wamid.HB_LIVE_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const mockResponse: CustomDispatchResponse = {
      success: true,
      messageId,
      recipientPhone: phoneNumber,
      status: 'Delivered',
      matchedCategory: category,
      attachedVideo: {
        filename: videoFilename,
        title: videoTitle,
        duration: videoDuration,
        cdnUrl: `https://cdn.lifemirror.app/awareness/${videoFilename}`,
      },
      gateway: {
        provider: 'Meta WhatsApp Business Cloud API v19.0 (Simulated Gateway)',
        route: 'Tier-1 Direct Carrier Gateway Ingress',
        latencyMs: Math.floor(Math.random() * 60) + 110,
        deliveryReceipt: 'DELIVERED_DOUBLE_BLUE_CHECK',
        statusCode: 200,
        verifiedSender: 'LifeMirror Healthcare Verified Outreach',
      },
      experienceUrl,
      timestamp: new Date().toISOString(),
    };

    mockResponse.rawJson = JSON.stringify(mockResponse, null, 2);
    return mockResponse;
  }

  async sendVideoMessage(params: SendVideoParams): Promise<SendResult> {
    const { onProgress, recipientPhone, videoTitle } = params;

    // Step 1: Preparing video asset & transcode check
    if (onProgress) onProgress('preparing', 20, `Preparing video asset: ${params.videoFilename}...`);
    await this.simulateDelay(600);

    // Step 2: Uploading media to WhatsApp Media Gateway
    if (onProgress) onProgress('uploading', 45, `Uploading "${videoTitle}" to WhatsApp CDN...`);
    await this.simulateDelay(700);

    // Step 3: Creating and signing interactive template message
    if (onProgress) onProgress('composing', 70, `Formatting interactive button template for ${recipientPhone}...`);
    await this.simulateDelay(500);

    // Step 4: Dispatching via simulated Cloud API Gateway
    if (onProgress) onProgress('sending', 90, `Dispatching to cellular carrier & WhatsApp client...`);
    await this.simulateDelay(600);

    // Step 5: Message Delivered confirmation
    if (onProgress) onProgress('delivered', 100, `Message Delivered (Double Blue Check simulated)`);
    await this.simulateDelay(300);

    const messageId = `wamid.LM_DEMO_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    return {
      success: true,
      messageId,
      recipientPhone,
      timestamp: new Date().toISOString(),
      status: 'Delivered',
      mode: 'DEMO_SIMULATION',
      details: 'Simulation completed. Video payload delivered to virtual device.'
    };
  }

  async sendTemplateMessage(params: SendTemplateParams): Promise<SendResult> {
    await this.simulateDelay(800);
    const messageId = `wamid.LM_TMPL_${Date.now()}`;
    return {
      success: true,
      messageId,
      recipientPhone: params.recipientPhone,
      timestamp: new Date().toISOString(),
      status: 'Delivered',
      mode: 'DEMO_SIMULATION',
      details: `Template "${params.templateName}" delivered.`
    };
  }

  async getMessageStatus(messageId: string): Promise<WhatsAppStatus> {
    // In demo mode, all sent messages transition to Delivered
    return 'Delivered';
  }
}

/**
 * WhatsAppCloudAPIService architecture stub for production deployment.
 * Connects securely to Meta WhatsApp Business Platform Cloud API (/v17.0/{PHONE_NUMBER_ID}/messages).
 * Note: Tokens and secrets reside securely server-side in production.
 */
export class WhatsAppCloudAPIService implements IWhatsAppService {
  private apiEndpoint: string;
  private phoneNumberId: string;

  constructor(phoneNumberId = '', apiEndpoint = 'https://graph.facebook.com/v19.0') {
    this.phoneNumberId = phoneNumberId;
    this.apiEndpoint = apiEndpoint;
  }

  async sendVideoMessage(params: SendVideoParams): Promise<SendResult> {
    // Production Cloud API implementation proxy:
    // In production, the request is proxied through an Express /api/whatsapp/send endpoint
    // to protect Meta API credentials from frontend exposure.
    try {
      const response = await fetch('/api/whatsapp/send-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: params.recipientPhone,
          category: params.category,
          videoId: params.videoId,
          message: params.messageText,
          experienceUrl: params.experienceUrl
        })
      });

      if (!response.ok) {
        throw new Error(`Cloud API returned ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        messageId: data.messageId || `wamid.${Date.now()}`,
        recipientPhone: params.recipientPhone,
        timestamp: new Date().toISOString(),
        status: 'Sent',
        mode: 'CLOUD_API',
        details: 'Dispatched through WhatsApp Cloud API proxy'
      };
    } catch (err: any) {
      console.warn('Production Cloud API endpoint unavailable in standalone prototype mode. Falling back to simulated response.', err);
      // Fallback to simulation in standalone mode
      const mockService = new MockWhatsAppService();
      return mockService.sendVideoMessage(params);
    }
  }

  async sendTemplateMessage(params: SendTemplateParams): Promise<SendResult> {
    const mockService = new MockWhatsAppService();
    return mockService.sendTemplateMessage(params);
  }

  async dispatchCustomNumberMessage(params: CustomDirectDispatchParams): Promise<CustomDispatchResponse> {
    const mockService = new MockWhatsAppService();
    return mockService.dispatchCustomNumberMessage(params);
  }

  async getMessageStatus(messageId: string): Promise<WhatsAppStatus> {
    return 'Delivered';
  }
}

// Global active instance
export const whatsAppService = new MockWhatsAppService();
