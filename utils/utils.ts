import { ICompany } from "@/models/company.model";

/**
 * Truncate a long text to a limited number of words
 * @param text - string to truncate
 * @param wordLimit - maximum number of words
 * @returns truncated string
 */
const truncateText = (text: string = "", wordLimit = 10): string => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + " ...";
};

/**
 * Returns CSS classes based on company status
 * @param status - "pending" | "active" | "finished"
 * @returns CSS string
 */
const statusClass = (status: ICompany["status"]): string => {
    const baseClasses = "inline-block text-xs font-semibold px-2 py-0.5 rounded-full";

    switch (status) {
        case "active":
            return `${baseClasses} bg-green-100 text-green-800`;
        case "pending":
            return `${baseClasses} bg-yellow-100 text-yellow-800`;
        case "finished":
            return `${baseClasses} bg-red-100 text-red-800`;
        default:
            return baseClasses;
    }
};

export { truncateText, statusClass };
