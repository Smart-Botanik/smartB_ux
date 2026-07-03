import type { CSSProperties, HTMLAttributes } from "react";

import { techOrganicColors, techOrganicTypography } from "../../tokens";

export type UxMonoLabelVariant = "labelSm" | "labelMd" | "dataSm" | "dataLg";

export type UxMonoLabelProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: UxMonoLabelVariant;
  uppercase?: boolean;
  muted?: boolean;
};

const variantStyles: Record<UxMonoLabelVariant, CSSProperties> = {
  labelSm: {
    ...techOrganicTypography.labelSm,
    fontFamily: techOrganicTypography.fontMono,
  },
  labelMd: {
    ...techOrganicTypography.labelMd,
    fontFamily: techOrganicTypography.fontMono,
  },
  dataSm: {
    ...techOrganicTypography.dataSm,
    fontFamily: techOrganicTypography.fontMono,
  },
  dataLg: {
    ...techOrganicTypography.dataLg,
    fontFamily: techOrganicTypography.fontMono,
  },
};

export function UxMonoLabel({
  variant = "labelSm",
  uppercase = false,
  muted = false,
  style,
  children,
  ...props
}: UxMonoLabelProps) {
  return (
    <span
      {...props}
      style={{
        ...variantStyles[variant],
        textTransform: uppercase ? "uppercase" : undefined,
        color: muted ? techOrganicColors.onSurfaceVariant : techOrganicColors.onSurface,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
