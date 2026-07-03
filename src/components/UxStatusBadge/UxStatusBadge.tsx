import type { CSSProperties } from "react";

import { techOrganicColors, techOrganicRadii } from "../../tokens";
import { UxMonoLabel } from "../UxMonoLabel";

export type UxStatusBadgeTone = "success" | "warning" | "neutral" | "error";

export type UxStatusBadgeProps = {
  label: string;
  tone?: UxStatusBadgeTone;
  style?: CSSProperties;
};

const toneStyles: Record<UxStatusBadgeTone, CSSProperties> = {
  success: {
    background: `${techOrganicColors.primary}1a`,
    color: techOrganicColors.primary,
  },
  warning: {
    background: techOrganicColors.surfaceVariant,
    color: techOrganicColors.onSurfaceVariant,
  },
  neutral: {
    background: techOrganicColors.surfaceContainerLow,
    color: techOrganicColors.onSurfaceVariant,
  },
  error: {
    background: techOrganicColors.errorContainer,
    color: techOrganicColors.onErrorContainer,
  },
};

export function UxStatusBadge({ label, tone = "neutral", style }: UxStatusBadgeProps) {
  return (
    <UxMonoLabel
      variant="labelSm"
      uppercase
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: techOrganicRadii.sm,
        fontWeight: 700,
        ...toneStyles[tone],
        ...style,
      }}
    >
      {label}
    </UxMonoLabel>
  );
}
