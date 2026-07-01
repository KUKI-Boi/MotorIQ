import React from 'react';

interface ConnectionBadgeProps {
  label: string;
  status: 'connected' | 'disconnected' | 'error';
}

export const ConnectionBadge: React.FC<ConnectionBadgeProps> = ({ label, status }) => {
  const statusColors = {
    connected: 'bg-success',
    disconnected: 'bg-text-secondary',
    error: 'bg-danger'
  };

  const textColors = {
    connected: 'text-success',
    disconnected: 'text-text-secondary',
    error: 'text-danger'
  };

  return (
    <div className="flex flex-col">
      <span className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">{label}</span>
      <div className="flex items-center gap-1.5 mt-0.5">
        <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
        <span className={`text-xs font-semibold capitalize tracking-wide ${textColors[status]}`}>{status}</span>
      </div>
    </div>
  );
};
