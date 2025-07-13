"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../../../components/ui/resizable";
import { MediaPanel } from "../../../components/editor/media-panel";
import { PropertiesPanel } from "../../../components/editor/properties-panel";
import { Timeline } from "../../../components/editor/timeline";
import { MobileTimelineWrapper } from "@/components/mobile-timeline-wrapper";
import { PreviewPanel } from "../../../components/editor/preview-panel";
import { EditorHeader } from "@/components/editor-header";
import { MobileEditorTabs } from "@/components/mobile-editor-tabs";
import { usePanelStore } from "@/stores/panel-store";
import { useProjectStore } from "@/stores/project-store";
import { EditorProvider } from "@/components/editor-provider";
import { MobileLayout } from "@/components/mobile-layout";
import { usePlaybackControls } from "@/hooks/use-playback-controls";

export default function Editor() {
  const {
    toolsPanel,
    previewPanel,
    mainContent,
    timeline,
    setToolsPanel,
    setPreviewPanel,
    setMainContent,
    setTimeline,
    propertiesPanel,
    setPropertiesPanel,
  } = usePanelStore();

  const { activeProject, loadProject, createNewProject } = useProjectStore();
  const params = useParams();
  const projectId = params.project_id as string;

  usePlaybackControls();

  useEffect(() => {
    const initializeProject = async () => {
      if (projectId && (!activeProject || activeProject.id !== projectId)) {
        try {
          await loadProject(projectId);
        } catch (error) {
          console.error("Failed to load project:", error);
          // If project doesn't exist, create a new one
          await createNewProject("Untitled Project");
        }
      }
    };

    initializeProject();
  }, [projectId, activeProject, loadProject, createNewProject]);

  return (
    <EditorProvider>
      <div className="h-screen w-screen flex flex-col bg-background overflow-hidden">
        <EditorHeader />
        <div className="flex-1 min-h-0 min-w-0 pb-[65px]">
          {/* Mobile Layout */}
          <MobileLayout className="h-full w-full flex flex-col">
            {/* Mobile Top Panel - Preview */}
            <div className="h-[45%] min-h-0 p-2">
              <PreviewPanel />
            </div>
            {/* Mobile Bottom Panel - Timeline and Tools */}
            <div className="h-[55%] min-h-0 flex flex-col">
              {/* Timeline */}
              <div className="h-full min-h-0 px-2 pb-1">
                <MobileTimelineWrapper />
              </div>
              {/* Tools Panel with Tabs - More space when expanded */}
              <MobileEditorTabs />
            </div>
          </MobileLayout>

          {/* Desktop Layout */}
          <ResizablePanelGroup
            direction="vertical"
            className="hidden md:flex h-full w-full gap-1"
          >
            <ResizablePanel
              defaultSize={mainContent}
              minSize={30}
              maxSize={85}
              onResize={setMainContent}
              className="min-h-0"
            >
              {/* Main content area */}
              <ResizablePanelGroup
                direction="horizontal"
                className="h-full w-full gap-1 px-2"
              >
                {/* Tools Panel */}
                <ResizablePanel
                  defaultSize={toolsPanel}
                  minSize={15}
                  maxSize={40}
                  onResize={setToolsPanel}
                  className="min-w-0"
                >
                  <MediaPanel />
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Preview Area */}
                <ResizablePanel
                  defaultSize={previewPanel}
                  minSize={30}
                  onResize={setPreviewPanel}
                  className="min-w-0 min-h-0 flex-1"
                >
                  <PreviewPanel />
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel
                  defaultSize={propertiesPanel}
                  minSize={15}
                  maxSize={40}
                  onResize={setPropertiesPanel}
                  className="min-w-0"
                >
                  <PropertiesPanel />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Timeline */}
            <ResizablePanel
              defaultSize={timeline}
              minSize={15}
              maxSize={70}
              onResize={setTimeline}
              className="min-h-0 px-2 pb-2"
            >
              <Timeline />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </EditorProvider>
  );
}
