import { UiFiledInput } from "./fileds/ui-filed-input";
import { UiFiledHelperText } from "./fileds/ui-filed-helper-text";
import { UiFiledLabel } from "./fileds/ui-filed-label";

/**
 * @param {{
 *   label?: string,
 *   className?: string,
 *   errorText?: string,
 *   helperText?: string,
 *   required?: boolean
 * } & import('react').HTMLAttributes<HTMLInputElement>} props
 */
export function UITextField({
  label,
  required,
  helperText,
  errorText,
  className,
  ...inputProps
}) {
  const fieldId = "example2";

  return (
    <div className={className}>
      <div>
        <UiFiledLabel label={label} required={required} htmlFor={fieldId} />

        <UiFiledInput
          required={required}
          errorText={errorText}
          id={fieldId}
          {...inputProps}
        />

        <UiFiledHelperText helperText={helperText} errorText={errorText} />
      </div>
    </div>
  );
}
