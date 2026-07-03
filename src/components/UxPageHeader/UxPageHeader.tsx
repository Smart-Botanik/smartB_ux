import type { CSSProperties } from "react";

import { techOrganicColors, techOrganicSpacing, techOrganicTypography } from "../../tokens";
import { UxMonoLabel } from "../UxMonoLabel";

export type UxPageHeaderProps = {
  title: string;
  subtitle?: string;
  style?: CSSProperties;
};

export function UxPageHeader({ title, subtitle, style }: UxPageHeaderProps) {
  return (
    <header style={{ marginBottom: techOrganicSpacing.lg, ...style }}>
      <h1
        style={{
          margin: 0,
          ...techOrganicTypography.headlineMd,
          fontFamily: techOrganicTypography.fontSans,
          color: techOrganicColors.onSurface,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h1>
      {subtitle ? (
        <UxMonoLabel
          variant="labelSm"
          uppercase
          style={{
            display: "block",
            marginTop: techOrganicSpacing.unit,
            color: techOrganicColors.primary,
            fontWeight: 600,
          }}
        >
          {subtitle}
        </UxMonoLabel>
      ) : null}
    </header>
  );
}
