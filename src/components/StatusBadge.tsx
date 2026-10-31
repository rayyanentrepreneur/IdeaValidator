import React from 'react';
import { EvidenceStatus } from '../types';

interface StatusBadgeProps {
  status: EvidenceStatus;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  className = '',
  size = 'md' 
}) => {
  const sizeClasses = size === 'sm' 
    ? 'h-5 px-1.5 text-[10px] gap-1' 
    : 'h-[22px] px-2 text-[11px] gap-1.5';

  switch (status) {
    case 'supported':
      return (
        <span
          className={`inline-flex items-center font-medium rounded-md border bg-emerald-50/70 border-emerald-200/70 text-emerald-700 whitespace-nowrap shrink-0 ${sizeClasses} ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
          <span>Validated</span>
        </span>
      );
    case 'in_progress':
      return (
        <span
          className={`inline-flex items-center font-medium rounded-md border bg-amber-50/70 border-amber-200/70 text-amber-800 whitespace-nowrap shrink-0 ${sizeClasses} ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
          <span>Testing</span>
        </span>
      );
    case 'invalidated':
      return (
        <span
          className={`inline-flex items-center font-medium rounded-md border bg-rose-50/70 border-rose-200/70 text-rose-700 whitespace-nowrap shrink-0 ${sizeClasses} ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" aria-hidden="true" />
          <span>Refuted</span>
        </span>
      );
    case 'neutral':
    default:
      return (
        <span
          className={`inline-flex items-center font-medium rounded-md border bg-slate-50 border-slate-200 text-slate-600 whitespace-nowrap shrink-0 ${sizeClasses} ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" aria-hidden="true" />
          <span>Backlog</span>
        </span>
      );
  }
};
