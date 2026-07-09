import React from 'react';
import { Html, useProgress } from '@react-three/drei';

export const LoadingScreen: React.FC = () => {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm p-6 rounded-2xl border border-navigation shadow-xl w-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <h3 className="text-sm font-sora font-semibold text-text-primary mb-1 uppercase tracking-widest">Digital Twin</h3>
        <p className="text-xs text-text-secondary font-medium tabular-nums">{progress.toFixed(0)}% Loaded</p>
        
        {/* Progress bar */}
        <div className="w-full bg-navigation h-1.5 rounded-full mt-4 overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Html>
  );
};
