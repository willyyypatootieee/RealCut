"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface MobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  side?: 'bottom' | 'left' | 'right';
}

export function MobileSheet({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  side = 'bottom' 
}: MobileSheetProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Prevent body scroll when sheet is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when sheet is closed
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 200); // Wait for animation to complete
  };

  if (!isOpen && !isAnimating) return null;

  const sheetClasses = {
    bottom: cn(
      "fixed inset-x-0 bottom-0 z-50 bg-background border-t rounded-t-xl",
      "transform transition-transform duration-200 ease-out",
      "max-h-[80vh] overflow-hidden",
      isAnimating && isOpen ? "translate-y-0" : "translate-y-full"
    ),
    left: cn(
      "fixed inset-y-0 left-0 z-50 bg-background border-r",
      "transform transition-transform duration-200 ease-out",
      "w-80 max-w-[85vw] overflow-hidden",
      isAnimating && isOpen ? "translate-x-0" : "-translate-x-full"
    ),
    right: cn(
      "fixed inset-y-0 right-0 z-50 bg-background border-l",
      "transform transition-transform duration-200 ease-out",
      "w-80 max-w-[85vw] overflow-hidden",
      isAnimating && isOpen ? "translate-x-0" : "translate-x-full"
    )
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-200",
          isAnimating && isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={handleClose}
      />
      
      {/* Sheet */}
      <div className={sheetClasses[side]}>
        {title && (
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-accent rounded-md transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
}
