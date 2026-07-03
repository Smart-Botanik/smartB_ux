import type { CSSProperties, ReactNode } from "react";

import { techOrganicColors, techOrganicRadii, techOrganicSpacing, techOrganicTypography } from "../../tokens";
import { UxMonoLabel } from "../UxMonoLabel";
import { UxStatusBadge } from "../UxStatusBadge";
import { UxSurfaceCard } from "../UxSurfaceCard";

export type UxLocationCardAccent = "primary" | "secondary";

export type UxLocationCardProps = {
  title: string;
  subtitle?: string;
  plantCount?: number;
  icon?: ReactNode;
  accent?: UxLocationCardAccent;
  minWidth?: number;
  onClick?: () => void;
  style?: CSSProperties;
};

const accentStyles: Record<UxLocationCardAccent, { bg: string; color: string }> = {
  primary: {
    bg: `${techOrganicColors.primaryContainer}33`,
    color: techOrganicColors.primary,
  },
  secondary: {
    bg: `${techOrganicColors.secondaryContainer}33`,
    color: techOrganicColors.secondary,
  },
};

export function UxLocationCard({
  title,
  subtitle,
  plantCount,
  icon,
  accent = "primary",
  minWidth = 320,
  onClick,
  style,
}: UxLocationCardProps) {
  const accentStyle = accentStyles[accent];

  return (
    <UxSurfaceCard
      hoverable={Boolean(onClick)}
      onClick={onClick}
      style={{
        minWidth,
        cursor: onClick ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        gap: techOrganicSpacing.md,
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: techOrganicSpacing.sm }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: techOrganicRadii.md,
            background: accentStyle.bg,
            color: accentStyle.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          {icon ?? "▦"}
        </div>
        {plantCount !== undefined ? (
          <UxStatusBadge label={`${plantCount} растений`} tone="neutral" />
        ) : null}
      </div>

      <div>
        <h4
          style={{
            margin: 0,
            ...techOrganicTypography.headlineSm,
            fontFamily: techOrganicTypography.fontSans,
            color: techOrganicColors.onSurface,
          }}
        >
          {title}
        </h4>
        {subtitle ? (
          <UxMonoLabel variant="dataSm" muted style={{ display: "block", marginTop: 4 }}>
            {subtitle}
          </UxMonoLabel>
        ) : null}
      </div>
    </UxSurfaceCard>
  );
}
