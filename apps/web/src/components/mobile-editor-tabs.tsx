"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Film, Music, Type, Settings, Layers } from 'lucide-react';
import { MediaPanel } from '@/components/editor/media-panel';
import { PropertiesPanel } from '@/components/editor/properties-panel';

interface MobileEditorTabsProps {
  className?: string;
}

type TabId = 'media' | 'properties' | 'effects' | 'audio' | 'text';

const tabs = [
  { id: 'media' as TabId, label: 'Media', icon: Film },
  { id: 'text' as TabId, label: 'Text', icon: Type },
  { id: 'audio' as TabId, label: 'Audio', icon: Music },
  { id: 'effects' as TabId, label: 'Effects', icon: Layers },
  { id: 'properties' as TabId, label: 'Props', icon: Settings },
];

export function MobileEditorTabs({ className }: MobileEditorTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('media');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'media':
        return <MediaPanel />;
      case 'properties':
        return <PropertiesPanel />;
      case 'text':
        return (
          <div className="p-4 text-muted-foreground">
            Text tools coming soon...
          </div>
        );
      case 'audio':
        return (
          <div className="p-4 text-muted-foreground">
            Audio tools coming soon...
          </div>
        );
      case 'effects':
        return (
          <div className="p-4 text-muted-foreground">
            Effects coming soon...
          </div>
        );
      default:
        return <MediaPanel />;
    }
  };

  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>
      {/* Tab Bar */}
      <div className="flex border-b bg-background">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-2 px-1 min-h-[60px] transition-colors",
                "border-b-2 border-transparent",
                activeTab === tab.id
                  ? "text-primary border-primary bg-accent/50"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {renderTabContent()}
      </div>
    </div>
  );
}
