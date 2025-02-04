// hooks/useDateFormatter.ts
import { useCallback } from 'react';

const useDateFormatter = (locale: string = 'en-US', options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
}) => {
    return useCallback((date: string | Date) => {
        return new Intl.DateTimeFormat(locale, options).format(new Date(date));
    }, [locale, options]);
};

export default useDateFormatter;
