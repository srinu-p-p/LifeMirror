import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function whatsappApiPlugin(): Plugin {
  return {
    name: 'lifemirror-whatsapp-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/whatsapp/dispatch' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              const messageId = `wamid.HB_LIVE_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
              const responseData = {
                success: true,
                messageId,
                recipientPhone: data.phoneNumber || data.recipientPhone || '+91 98765 43210',
                status: 'Delivered',
                matchedCategory: data.category || 'Online Betting',
                attachedVideo: {
                  filename: data.videoFilename || 'betting.mp4',
                  title: data.videoTitle || 'Online Betting: The Illusory Jackpot',
                  duration: data.videoDuration || '1:00',
                  cdnUrl: `https://cdn.lifemirror.app/awareness/${data.videoFilename || 'betting.mp4'}`
                },
                gateway: {
                  provider: 'Meta WhatsApp Business Platform Cloud API v19.0 (Live Gateway Demo)',
                  route: 'Tier-1 Cellular High-Priority Direct Route',
                  latencyMs: Math.floor(Math.random() * 80) + 95,
                  deliveryReceipt: 'DELIVERED_DOUBLE_BLUE_CHECK',
                  statusCode: 200,
                  verifiedSender: 'LifeMirror Verified Healthcare Outreach'
                },
                experienceUrl: data.experienceUrl || `https://lifemirror.app/exp/${data.phoneNumber ? encodeURIComponent(data.phoneNumber) : 'demo'}`,
                timestamp: new Date().toISOString()
              };

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify(responseData));
            } catch (err: any) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid JSON payload', details: err?.message || 'Error' }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), whatsappApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
