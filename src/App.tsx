/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from './components/ToastContainer';
import { DemoGatewayModal } from './components/DemoGatewayModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { LeadDetailModal } from './components/LeadDetailModal';
import { DirectWhatsAppDispatcherModal } from './components/DirectWhatsAppDispatcherModal';

// Views
import { Dashboard } from './components/Dashboard';
import { LeadsView } from './components/LeadsView';
import { CategoriesView } from './components/CategoriesView';
import { VideoLibraryView } from './components/VideoLibraryView';
import { WhatsAppOutreachView } from './components/WhatsAppOutreachView';
import { RegistrationsView } from './components/RegistrationsView';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';
import { UserExperienceView } from './components/UserExperienceView';

const MainLayout: React.FC = () => {
  const {
    currentView,
    isUserExperienceActive,
    selectedLeadForDetail,
    setSelectedLeadForDetail,
    previewVideo,
    setPreviewVideo,
    isDirectDispatchModalOpen,
    setIsDirectDispatchModalOpen,
  } = useApp();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // If in recipient mode (User Experience), display the cinematic, minimal immersive viewport
  if (isUserExperienceActive) {
    return (
      <div className="min-h-screen bg-[#05070c] text-white">
        <UserExperienceView />
        <ToastContainer />
      </div>
    );
  }

  // Render active admin view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <LeadsView />;
      case 'categories':
        return <CategoriesView />;
      case 'videos':
        return <VideoLibraryView />;
      case 'outreach':
        return <WhatsAppOutreachView />;
      case 'registrations':
        return <RegistrationsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#0b0f17] via-[#0d121d] to-[#090d14]">
          {renderCurrentView()}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <LeadDetailModal
        lead={selectedLeadForDetail}
        onClose={() => setSelectedLeadForDetail(null)}
      />
      <DemoGatewayModal />
      <VideoPlayerModal
        video={previewVideo}
        onClose={() => setPreviewVideo(null)}
      />
      <DirectWhatsAppDispatcherModal
        isOpen={isDirectDispatchModalOpen}
        onClose={() => setIsDirectDispatchModalOpen(false)}
      />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
