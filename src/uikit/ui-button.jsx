import { clsx } from "clsx";

/**
 * @param {{children, className: string, size: "md" || "lg", variant: 'primary' || 'outline'}} props
 */

export function UiButton({ children, className, size, variant }) {
  const buttonClassName = clsx(
    "transition-colors text-2xs",
    className,
    {
      md: "rounded px-6 py-2 leading-[1.2]",
      lg: "rounded px-5 py-2 leading-[1.2]",
    }[size],
    {
      primary:
        "bg-[hsl(225,_100%,_85%)] text-black font-[Inter] hover:bg-[hsl(225,100%,80%)]",
      outline:
        "border border-[hsl(225,_100%,_85%)]  hover:bg-[hsl(225,100%,80%)]",
    }[variant],
  );

  return <button className={buttonClassName}>{children}</button>;
}
