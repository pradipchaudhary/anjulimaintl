// components/ui/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "ghost";
}

export default function Button({ children, variant = "primary", ...rest }: ButtonProps) {
    const base = "px-4 py-2 rounded shadow-sm disabled:opacity-50";
    const cls = variant === "primary" ? `${base} bg-blue-600 text-white` : `${base} bg-transparent`;
    return (
        <button className={cls} {...rest}>
            {children}
        </button>
    );
}
