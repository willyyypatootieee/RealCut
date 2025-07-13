"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileLayout({ children, className }: MobileLayoutProps) {
  const [viewportHeight, setViewportHeight] = useState('100vh');

  useEffect(() => {
    // Handle mobile viewport height properly
    const updateHeight = () => {
      setViewportHeight(`${window.innerHeight}px`);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);

    // Also update on visual viewport changes (mobile keyboard, etc.)
    if ('visualViewport' in window) {
      window.visualViewport?.addEventListener('resize', updateHeight);
    }

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
      if ('visualViewport' in window) {
        window.visualViewport?.removeEventListener('resize', updateHeight);
      }
    };
  }, []);

  return (
    <div 
      className={cn("md:hidden", className)}
      style={{ height: viewportHeight }}
    >
      {children}
    </div>
  );
}
