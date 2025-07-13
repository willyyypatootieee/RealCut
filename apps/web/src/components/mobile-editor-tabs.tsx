"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Film, Music, Type, Settings, Layers, Sticker, Zap, MessageSquare, SlidersHorizontal } from 'lucide-react';
import { MediaPanel } from '@/components/editor/media-panel';

interface MobileEditorTabsProps {
  className?: string;
}

type TabId = 'media' | 'audio' | 'text' | 'stickers' | 'effects' | 'transitions' | 'captions' | 'adjustment';

const tabs = [
  { id: 'media' as TabId, label: 'Media', icon: Film },
  { id: 'audio' as TabId, label: 'Audio', icon: Music },
  { id: 'text' as TabId, label: 'Text', icon: Type },
  { id: 'stickers' as TabId, label: 'Stickers', icon: Sticker },
  { id: 'effects' as TabId, label: 'Effects', icon: Zap },
  { id: 'transitions' as TabId, label: 'Transitions', icon: Layers },
  { id: 'captions' as TabId, label: 'Captions', icon: MessageSquare },
  { id: 'adjustment' as TabId, label: 'Adjustment', icon: SlidersHorizontal },
];

export function MobileEditorTabs({ className }: MobileEditorTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId | null>(null);

  const handleTabClick = (tabId: TabId) => {
    console.log('Tab clicked:', tabId, 'Current active:', activeTab);
    // Toggle behavior: if clicking the same tab, close it; otherwise, open the new tab
    setActiveTab(activeTab === tabId ? null : tabId);
  };

  const renderTabContent = () => {
    if (!activeTab) return null;
    
    switch (activeTab) {
      case 'media':
        return <MediaPanel />;
      case 'audio':
        return (
          <div className="p-4 text-muted-foreground">
            Audio tools coming soon...
          </div>
        );
      case 'text':
        return (
          <div className="p-4 text-muted-foreground">
            Text tools coming soon...
          </div>
        );
      case 'stickers':
        return (
          <div className="p-4 text-muted-foreground">
            Stickers coming soon...
          </div>
        );
      case 'effects':
        return (
          <div className="p-4 text-muted-foreground">
            Effects coming soon...
          </div>
        );
      case 'transitions':
        return (
          <div className="p-4 text-muted-foreground">
            Transitions coming soon...
          </div>
        );
      case 'captions':
        return (
          <div className="p-4 text-muted-foreground">
            Captions coming soon...
          </div>
        );
      case 'adjustment':
        return (
          <div className="p-4 text-muted-foreground">
            Adjustment tools coming soon...
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>
      {/* Tab Bar - Only visible on mobile */}
      <div className="md:hidden flex-shrink-0 flex bg-gray-900 border-t-2 border-cyan-400 overflow-x-auto scrollbar-hidden">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-1 transition-all duration-200 flex-shrink-0",
                "min-w-[45px] w-[12.5%] max-w-[65px] h-[65px]",
                "border-b-3 touch-manipulation relative",
                // Active/inactive styling with high contrast
                isActive
                  ? "text-cyan-400 border-cyan-400 bg-cyan-400/20 font-bold"
                  : "text-gray-300 border-transparent hover:text-white hover:bg-gray-800/50",
                // Touch feedback
                "active:scale-95 active:bg-gray-700"
              )}
            >
              <Icon className={cn("mb-1 flex-shrink-0", isActive ? "h-5 w-5" : "h-4 w-4")} />
              <span className={cn("font-medium leading-tight text-center", isActive ? "text-[10px]" : "text-[9px]")}>
                {/* Clear, short labels */}
                {tab.id === 'stickers' ? 'Stick' : 
                 tab.id === 'effects' ? 'FX' :
                 tab.id === 'transitions' ? 'Trans' :
                 tab.id === 'captions' ? 'Capt' :
                 tab.id === 'adjustment' ? 'Adj' :
                 tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      {activeTab ? (
        <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-800">
          {renderTabContent()}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-800">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <Film className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm font-medium mb-1">Tap a tool to get started</p>
            <p className="text-xs opacity-70">Tap again to close</p>
          </div>
        </div>
      )}
    </div>
  );
}
