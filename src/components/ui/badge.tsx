import React from 'react';
import { cn } from '@/lib/utils';
import { ComplaintStatus, SeverityLevel, VerificationStatus } from '@/types/database';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'outline' | 'secondary';
  status?: ComplaintStatus;
  severity?: SeverityLevel;
  verification?: VerificationStatus;
}

export function Badge({ className, variant = 'default', status, severity, verification, children, ...props }: BadgeProps) {
  let badgeStyle = 'bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-200 border-navy-200 dark:border-navy-700';

  if (verification) {
    if (verification === 'VERIFIED') {
      badgeStyle = 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 font-semibold';
    } else if (verification === 'NEEDS_REVIEW') {
      badgeStyle = 'bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800 font-medium';
    } else {
      badgeStyle = 'bg-red-50 dark:bg-red-950/70 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800';
    }
  } else if (severity) {
    if (severity === 'URGENT') {
      badgeStyle = 'bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700 font-bold animate-pulse';
    } else if (severity === 'HIGH') {
      badgeStyle = 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700 font-semibold';
    } else if (severity === 'MEDIUM') {
      badgeStyle = 'bg-blue-50 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    } else {
      badgeStyle = 'bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-navy-300 border-slate-200 dark:border-navy-700';
    }
  } else if (status) {
    switch (status) {
      case 'RESOLVED':
        badgeStyle = 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 font-semibold';
        break;
      case 'IN_PROGRESS':
        badgeStyle = 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800 font-semibold';
        break;
      case 'ACKNOWLEDGED':
        badgeStyle = 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800';
        break;
      case 'EMAIL_SENT':
        badgeStyle = 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
        break;
      case 'EMAIL_FAILED':
        badgeStyle = 'bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800';
        break;
      case 'SUBMITTED':
      case 'EMAIL_QUEUED':
        badgeStyle = 'bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800';
        break;
      default:
        badgeStyle = 'bg-slate-100 dark:bg-navy-800 text-slate-800 dark:text-navy-300 border-slate-200 dark:border-navy-700';
    }
  } else {
    const variants = {
      default: 'bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-200 border-navy-200 dark:border-navy-700',
      success: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      warning: 'bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      danger: 'bg-red-50 dark:bg-red-950/70 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800',
      info: 'bg-blue-50 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      neutral: 'bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-navy-300 border-slate-200 dark:border-navy-700',
      outline: 'bg-transparent border-navy-300 dark:border-navy-700 text-navy-700 dark:text-navy-300',
      secondary: 'bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-200 border-navy-200 dark:border-navy-700',
    };
    badgeStyle = variants[variant] || variants.default;
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border tracking-wide select-none',
        badgeStyle,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
