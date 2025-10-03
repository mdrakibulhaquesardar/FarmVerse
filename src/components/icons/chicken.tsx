import type { SVGProps } from "react";

export function ChickenIcon(props: SVGProps<SVGSVGElement>) {
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
            <path d="M15.26 12.72a2 2 0 0 1 1.41 1.41l2.48-2.48a2 2 0 0 0-1.41-3.41l-2.33 2.33a2 2 0 0 1-.15.15z" />
            <path d="M13 22a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
            <path d="M12 14v-2" />
            <path d="M15 11.5 13.5 13" />
            <path d="m8.5 7.5-1 1" />
            <path d="M6 9c-3 0-3 3-3 3v1" />
            <path d="M11 2a2 2 0 0 0-2 2v2" />
        </svg>
    );
}
