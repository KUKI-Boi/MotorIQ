import React from 'react';
import { cn } from '@/lib/utils';

export const PageContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("w-full min-h-full max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6", className)}>
    {children}
  </div>
);

export const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="mb-2">
    <h1 className="text-3xl md:text-4xl font-aquire text-text-primary tracking-wide uppercase">{title}</h1>
    <p className="text-sm md:text-base text-text-secondary mt-1">{subtitle}</p>
  </div>
);
