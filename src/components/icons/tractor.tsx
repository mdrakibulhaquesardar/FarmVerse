import type { SVGProps } from "react";

export function TractorIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M3 4h15" />
      <path d="M12 4v10" />
      <path d="M11.5 10.5h.9" />
      <path d="M18 4h2a1 1 0 0 1 1 1v4" />
      <path d="m21 9-2.3-1.8a.5.5 0 0 0-.7.6l.8 3.2" />
      <path d="M3 10h12" />
      <path d="M5 10V4" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="4" />
    </svg>
  );
}
