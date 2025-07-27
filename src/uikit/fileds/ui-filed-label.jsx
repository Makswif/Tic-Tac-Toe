import { clsx } from "clsx";

/**
 * @param {{
 *   label?: string,
 *   required?: boolean,
 *   htmlFor?: string
 * }} props
 */
export function UiFiledLabel({ label, required, htmlFor }) {
  if (!label) return null;

  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        required && "after:text-red-500 after:content-['*']",
        "mb-1 block text-sm font-medium text-slate-900 after:ml-0.5",
      )}
    >
      {label}
    </label>
  );
}
