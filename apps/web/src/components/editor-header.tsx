"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronLeft, Download } from "lucide-react";
import { useTimelineStore } from "@/stores/timeline-store";
import { HeaderBase } from "./header-base";
import { formatTimeCode } from "@/lib/time";
import { useProjectStore } from "@/stores/project-store";

export function EditorHeader() {
  const { getTotalDuration } = useTimelineStore();
  const { activeProject } = useProjectStore();

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Export project");
  };

  const leftContent = (
    <div className="flex items-center gap-2">
      <Link
        href="/projects"
        className="font-medium tracking-tight flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">{activeProject?.name}</span>
      </Link>
    </div>
  );

  const centerContent = (
    <div className="hidden sm:flex items-center gap-2 text-xs">
      <span>
        {formatTimeCode(
          getTotalDuration(),
          "HH:MM:SS:FF",
          activeProject?.fps || 30
        )}
      </span>
    </div>
  );

  const rightContent = (
    <nav className="flex items-center gap-2">
      <Button
        size="sm"
        variant="primary"
        className="h-7 text-xs px-2 sm:px-3"
        onClick={handleExport}
      >
        <Download className="h-4 w-4" />
        <span className="hidden sm:inline text-sm ml-1">Export</span>
      </Button>
    </nav>
  );

  return (
    <HeaderBase
      leftContent={leftContent}
      centerContent={centerContent}
      rightContent={rightContent}
      className="bg-background h-[3.2rem] px-2 sm:px-4"
    />
  );
}
