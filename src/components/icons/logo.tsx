import type { SVGProps } from "react";
import { TractorIcon } from "./tractor";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center justify-center bg-primary rounded-full p-2" >
        <TractorIcon className="h-6 w-6 text-primary-foreground" />
    </div>
  );
}
