import type { CSSProperties, HTMLAttributes, PropsWithChildren } from "react";

import { techOrganicColors, techOrganicRadii, techOrganicShadows, techOrganicSpacing } from "../../tokens";

export type UxSurfaceCardProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    padding?: keyof typeof techOrganicSpacing | number;
    hoverable?: boolean;
    glass?: boolean;
  }
>;

const paddingMap: Partial<Record<keyof typeof techOrganicSpacing, number>> = {
  unit: techOrganicSpacing.unit,
  xs: techOrganicSpacing.xs,
  sm: techOrganicSpacing.sm,
  md: techOrganicSpacing.md,
  lg: techOrganicSpacing.lg,
  xl: techOrganicSpacing.xl,
  gutter: techOrganicSpacing.gutter,
};

export function UxSurfaceCard({
  children,
  padding = "lg",
  hoverable = false,
  glass = true,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: UxSurfaceCardProps) {
  const pad =
    typeof padding === "number" ? padding : (paddingMap[padding as keyof typeof paddingMap] ?? techOrganicSpacing.lg);

  const base: CSSProperties = {
    background: glass ? techOrganicColors.surfaceContainerLowest : techOrganicColors.surfaceContainerLow,
    border: `1px solid ${techOrganicColors.outlineVariant}33`,
    borderRadius: techOrganicRadii.lg,
    padding: pad,
    boxShadow: techOrganicShadows.panel,
    transition: "border-color 200ms ease, box-shadow 200ms ease",
    ...style,
  };

  return (
    <div
      {...props}
      style={base}
      onMouseEnter={e => {
        if (hoverable) {
          e.currentTarget.style.borderColor = `${techOrganicColors.primary}4d`;
        }
        onMouseEnter?.(e);
      }}
      onMouseLeave={e => {
        if (hoverable) {
          e.currentTarget.style.borderColor = `${techOrganicColors.outlineVariant}33`;
        }
        onMouseLeave?.(e);
      }}
    >
      {children}
    </div>
  );
}
