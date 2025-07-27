import { clsx } from "clsx";

/**
 * @param {{
 *   required?: boolean,
 *   errorText?: string,
 *   id?: string
 * } & import('react').HTMLAttributes<HTMLInputElement>} props
 */
export function UiFiledInput({ required, errorText, id, ...inputProps }) {
  return (
    <input
      required={required}
      type="email"
      id={id}
      className={clsx(
        "block w-full px-2 py-2 leading-[1.2] " +
          "outline-0 border rounded-md shadow-sm focus:ring-opacity-50 " +
          "disabled:cursor-not-allowed " +
          "disabled:bg-gray-50 disabled:text-gray-500",
        errorText
          ? "focus:border-red-400 focus:ring focus:ring-red-600/30 border-red-500"
          : "focus:border-[#235678] focus:ring focus:ring-[#235678]/40 border-slate-200",
      )}
      {...inputProps}
    />
  );
}
