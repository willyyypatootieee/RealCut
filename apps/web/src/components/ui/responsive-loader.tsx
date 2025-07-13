"use client";

import { cn } from '@/lib/utils';

interface ResponsiveLoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function ResponsiveLoader({ 
  className, 
  size = 'md',
  text = 'Loading...' 
}: ResponsiveLoaderProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6 md:h-8 md:w-8',
    lg: 'h-8 w-8 md:h-12 md:w-12'
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-2 sm:gap-3", className)}>
      <div className={cn(
        "animate-spin rounded-full border-2 border-gray-300 border-t-primary",
        sizeClasses[size]
      )} />
      {text && (
        <p className="text-sm sm:text-base text-muted-foreground">
          {text}
        </p>
      )}
    </div>
  );
}
