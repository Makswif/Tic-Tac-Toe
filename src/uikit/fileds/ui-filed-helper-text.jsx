import { clsx } from "clsx";

/**
 * @param {{
 *   helperText?: string,
 *   errorText?: string
 * }} props
 */
export function UiFiledHelperText({ helperText, errorText }) {
  if (!helperText && !errorText) return null;

  return (
    <p
      className={clsx(
        "mt-1 text-sm",
        errorText ? "text-red-400" : "text-slate-400",
      )}
    >
      {errorText ?? helperText}
    </p>
  );
}
