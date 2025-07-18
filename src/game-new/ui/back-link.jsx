import Link from "next/link";
import { ArrowLeftIcon } from "./Icons/arrow-left-icon";

export function BackLink() {
  return (
    <Link
      href="#"
      className="flex items-center gap-2 text-xs text-[hsl(225,100%,80%)] -mb-0.5"
    >
      <ArrowLeftIcon />
      На главную
    </Link>
  );
}
