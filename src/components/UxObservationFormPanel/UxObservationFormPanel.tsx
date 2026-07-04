import type { PropsWithChildren, ReactNode } from "react";

import { techOrganicSpacing, techOrganicTypography, techOrganicColors } from "../../tokens";
import { UxSurfaceCard } from "../UxSurfaceCard";

export type UxObservationFormPanelProps = PropsWithChildren<{
  title?: string;
  description?: string;
  footer?: ReactNode;
}>;

/** Grow-styled shell for registry profile / observation forms. */
export function UxObservationFormPanel({
  title = "Записать наблюдение",
  description,
  footer,
  children,
}: UxObservationFormPanelProps) {
  return (
    <UxSurfaceCard
      style={{
        display: "flex",
        flexDirection: "column",
        gap: techOrganicSpacing.lg,
        flex: "0 0 auto",
      }}
    >
      <div style={{ flex: "0 0 auto" }}>
        <h3
          style={{
            margin: 0,
            ...techOrganicTypography.headlineSm,
            fontFamily: techOrganicTypography.fontSans,
            color: techOrganicColors.onSurface,
          }}
        >
          {title}
        </h3>
        {description ? (
          <p
            style={{
              margin: `${techOrganicSpacing.xs}px 0 0`,
              ...techOrganicTypography.bodySm,
              fontFamily: techOrganicTypography.fontSans,
              color: techOrganicColors.onSurfaceVariant,
            }}
          >
            {description}
          </p>
        ) : null}
      </div>
      {children}
      {footer}
    </UxSurfaceCard>
  );
}
