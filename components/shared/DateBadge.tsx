// components/DateBadge.tsx
// 'use client';

import { formatDateISO } from '@/utils/formatDate';
import React from 'react';

type DateBadgeProps = {
    iso: string | Date;
    includeWeekday?: boolean;
    locale?: string;
    className?: string;
};

export default function DateBadge({
    iso,
    includeWeekday = false,
    locale = 'en-US',
    className = '',
}: DateBadgeProps) {
    const formatted = formatDateISO(iso, { includeWeekday, locale });

    return (
        <time
            dateTime={typeof iso === 'string' ? iso : iso.toISOString()}
            aria-label={formatted}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium shadow-sm bg-white ${className}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
            >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
            </svg>
            <span>{formatted}</span>
        </time>
    );
}
