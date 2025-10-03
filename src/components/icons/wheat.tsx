import type { SVGProps } from "react";

export function WheatIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 22s1-1 2-2c1-1 2-2 2-4s-1-3-2-3s-2 1-2 3" />
            <path d="M22 22s-1-1-2-2c-1-1-2-2-2-4s1-3 2-3s2 1 2 3" />
            <path d="M12 22V2" />
            <path d="M7 4H2" />
            <path d="M22 4h-5" />
            <path d="M7 8H4" />
            <path d="M20 8h-3" />
            <path d="M7 12H5" />
            <path d="M19 12h-2" />
            <path d="M7 16H6" />
            <path d="M18 16h-1" />
        </svg>
    )
}