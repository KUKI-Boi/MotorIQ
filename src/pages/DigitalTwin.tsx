import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { DigitalTwinPanel } from '../features/dashboard/components/DigitalTwinPanel';

export default function DigitalTwin() {
  return (
    <PageContainer className="p-4 md:p-6 lg:p-8 space-y-6 flex flex-col h-[calc(100vh-64px)]">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl md:text-3xl font-sora font-bold text-text-primary">Digital Twin</h1>
          <p className="text-sm text-text-secondary mt-1">Live 3D visualization of the intelligent motor.</p>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0 border border-navigation rounded-xl overflow-hidden shadow-floating">
        <DigitalTwinPanel />
      </div>
    </PageContainer>
  );
}
