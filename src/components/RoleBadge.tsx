import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const RoleBadge: React.FC = () => {
  const role = "OPERATOR";
  
  return (
    <div className="group flex items-center gap-2 px-3 py-1.5 bg-navigation/50 hover:bg-navigation border border-primary/20 hover:border-primary/50 rounded-lg transition-all cursor-default">
      <ShieldCheck className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
      <span className="text-xs font-bold tracking-widest text-primary">{role}</span>
    </div>
  );
};
