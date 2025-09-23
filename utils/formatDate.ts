// utils/formatDate.ts

export type FormatDateOptions = {
    /** If true, adds the weekday (e.g. "Fri,") */
    includeWeekday?: boolean;
    /** BCP 47 locale, e.g. "en-US" | "en-GB" | "ne-NP" */
    locale?: string;
    /** Month display: 'long' => "August", 'short' => "Aug", 'numeric' => "08" */
    monthStyle?: 'long' | 'short' | 'numeric';
};

/**
 * Format an ISO date string or Date to "Day Month Year" (optionally with weekday).
 *
 * Examples:
 *  formatDateISO("1991-08-30T00:00:00.000Z") => "August 30, 1991" (en-US)
 *  formatDateISO("1991-08-30T00:00:00.000Z", { includeWeekday: true }) => "Fri, August 30, 1991"
 *  formatDateISO("1991-08-30T00:00:00.000Z", { locale: "en-GB" }) => "30 August 1991"
 */
export function formatDateISO(
    input: string | Date,
    {
        includeWeekday = false,
        locale = 'en-US',
        monthStyle = 'long',
    }: FormatDateOptions = {}
): string {
    const date = input instanceof Date ? input : new Date(input);

    if (Number.isNaN(date.getTime())) {
        return 'Invalid date';
    }

    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: monthStyle,
        year: 'numeric',
    };

    if (includeWeekday) {
        options.weekday = 'short'; // use short form (e.g., "Fri")
    }

    return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Convert ISO date string or Date to "DD Mon YYYY" format.
 * Example: 1991-08-30T00:00:00.000Z -> "30 Aug 1991"
 */
export function formatDateShort(input: string | Date): string {
    const date = input instanceof Date ? input : new Date(input);

    if (Number.isNaN(date.getTime())) {
        return 'Invalid date';
    }

    return new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short', // Jan, Feb, Mar ...
        year: 'numeric',
    })
        .format(date)
        .replace(',', ''); // remove comma if locale inserts one
}
