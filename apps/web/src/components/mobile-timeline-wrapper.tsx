"use client";

import { Timeline } from '@/components/editor/timeline';
import { cn } from '@/lib/utils';

interface MobileTimelineWrapperProps {
  className?: string;
}

export function MobileTimelineWrapper({ className }: MobileTimelineWrapperProps) {
  return (
    <div className={cn("h-full w-full", className)}>
      {/* Add custom mobile-specific styling to timeline */}
      <style jsx global>{`
        /* Mobile timeline optimizations */
        @media (max-width: 768px) {
          /* Hide some toolbar items to save space */
          .timeline-toolbar .tooltip-trigger:nth-child(n+8) {
            display: none;
          }
          
          /* Make buttons more touch-friendly */
          .timeline-toolbar button {
            min-height: 40px;
            min-width: 40px;
            padding: 8px;
          }
          
          /* Adjust timeline track heights for touch */
          .timeline-track {
            min-height: 50px;
          }
          
          /* Simplify time display on mobile */
          .timeline-time-display {
            font-size: 0.75rem;
            min-width: 14ch;
          }
          
          /* Better scrolling on mobile */
          .timeline-scroll-area {
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
          }
          
          /* Responsive timeline toolbar */
          .timeline-toolbar {
            padding: 0.25rem;
          }
          
          .timeline-toolbar button {
            margin: 0 1px;
          }
        }
        
        /* Very small screens */
        @media (max-width: 480px) {
          .timeline-track-labels {
            width: 60px;
          }
          
          .timeline-track-label-text {
            display: none;
          }
          
          /* Hide even more toolbar items on very small screens */
          .timeline-toolbar .tooltip-trigger:nth-child(n+6) {
            display: none;
          }
        }
      `}</style>
      
      <div className="md:hidden">
        {/* Mobile-specific timeline container with custom classes */}
        <div className="timeline-mobile-container h-full">
          <Timeline />
        </div>
      </div>
      
      <div className="hidden md:block h-full">
        {/* Desktop timeline - unchanged */}
        <Timeline />
      </div>
    </div>
  );
}
