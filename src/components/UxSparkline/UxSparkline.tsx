import type { CSSProperties } from "react";

import { techOrganicColors, techOrganicRadii, techOrganicSpacing } from "../../tokens";

export type UxSparklineProps = {
  values: number[];
  height?: number;
  color?: string;
  style?: CSSProperties;
};

function normalize(values: number[]): number[] {
  if (values.length === 0) {
    return [];
  }
  const max = Math.max(...values, 1);
  return values.map(v => Math.max(0.08, v / max));
}

export function UxSparkline({
  values,
  height = 96,
  color = techOrganicColors.primary,
  style,
}: UxSparklineProps) {
  const normalized = normalize(values);

  return (
    <div
      style={{
        height,
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
        gap: techOrganicSpacing.unit,
        padding: `${techOrganicSpacing.xs}px ${techOrganicSpacing.xs}px ${techOrganicSpacing.unit}px`,
        borderRadius: techOrganicRadii.md,
        background: techOrganicColors.surfaceContainerLow,
        border: `1px solid ${techOrganicColors.outlineVariant}33`,
        ...style,
      }}
    >
      {normalized.map((h, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            height: `${Math.round(h * 100)}%`,
            borderRadius: `${techOrganicRadii.sm}px ${techOrganicRadii.sm}px 0 0`,
            background: color,
            opacity: 0.35 + (index / Math.max(normalized.length - 1, 1)) * 0.65,
          }}
        />
      ))}
    </div>
  );
}
