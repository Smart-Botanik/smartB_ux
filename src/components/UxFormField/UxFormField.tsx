import React from "react";

import { Form as AntdForm } from "antd";
import type { FormItemProps } from "antd";

import { techOrganicColors, techOrganicTypography } from "../../tokens";

/**
 * Canonical label style for all form fields across the app.
 *
 * Uses `labelSm` token from Tech-Organic Precision:
 * - fontSize: 12
 * - lineHeight: 16px
 * - fontWeight: 500
 * - letterSpacing: 0.05em
 * - color: onSurfaceVariant (#3b4a3f)
 */
const UX_FORM_FIELD_LABEL_STYLE: React.CSSProperties = {
  fontSize: techOrganicTypography.labelSm.fontSize,
  lineHeight: `${techOrganicTypography.labelSm.lineHeight}px`,
  fontWeight: techOrganicTypography.labelSm.fontWeight,
  letterSpacing: techOrganicTypography.labelSm.letterSpacing,
  color: techOrganicColors.onSurfaceVariant,
  height: "auto",
  minHeight: 0,
  padding: "0 0 4px",
  margin: 0,
};

const UX_FORM_FIELD_WRAPPER_STYLE: React.CSSProperties = {
  marginBottom: 8,
};

export interface UxFormFieldProps extends Omit<FormItemProps, "className"> {
  /** Extra className applied to the root wrapper div. */
  wrapperClassName?: string;
}

/**
 * `UxFormField` — proxy around `AntdForm.Item` that enforces consistent
 * label typography, spacing and colors across the entire project.
 *
 * Drop-in replacement: accepts all `AntdForm.Item` props (except `className`
 * which is controlled internally). Pass `wrapperClassName` for custom styling.
 *
 * @example
 * ```tsx
 * <UxFormField label="Название" required>
 *   <Input placeholder="Гроубокс 120" />
 * </UxFormField>
 * ```
 */
export const UxFormField: React.FC<UxFormFieldProps> = ({
  label,
  style,
  wrapperClassName,
  children,
  ...rest
}) => {
  // Wrap string labels with consistent styling; pass through custom ReactNode labels
  const styledLabel =
    label != null ? (
      <span style={UX_FORM_FIELD_LABEL_STYLE}>{label}</span>
    ) : undefined;

  return (
    <AntdForm.Item
      {...rest}
      label={styledLabel}
      className={wrapperClassName}
      style={{
        ...UX_FORM_FIELD_WRAPPER_STYLE,
        ...style,
      }}
      // Reset Antd label container padding — we handle it via the span
      labelCol={{ style: { padding: 0 } }}
    >
      {children}
    </AntdForm.Item>
  );
};

/** Re-export the canonical label style for use outside Form.Item (e.g. section titles). */
export { UX_FORM_FIELD_LABEL_STYLE };
