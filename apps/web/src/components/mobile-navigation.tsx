"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MobileSheet } from '@/components/ui/mobile-sheet';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

interface MobileNavigationProps {
  className?: string;
}

export function MobileNavigation({ className }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="text"
        size="sm"
        className="md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </Button>

      {/* Mobile Navigation Sheet */}
      <MobileSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Navigation"
        side="left"
      >
        <div className="flex flex-col space-y-4 p-4">
          <Link
            href="/contributors"
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Contributors
          </Link>
          
          {process.env.NODE_ENV === "development" ? (
            <Link
              href="/projects"
              className="text-lg font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
          ) : (
            <Link
              href="https://github.com/OpenCut-app/OpenCut"
              target="_blank"
              className="text-lg font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              GitHub
            </Link>
          )}

          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-muted-foreground">
              A simple but powerful video editor that gets the job done.
            </p>
          </div>
        </div>
      </MobileSheet>
    </>
  );
}
