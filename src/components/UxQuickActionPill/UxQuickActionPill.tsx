import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import { techOrganicColors, techOrganicRadii, techOrganicShadows, techOrganicSpacing } from "../../tokens";

export type UxQuickActionPillProps = HTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  primary?: boolean;
};

export function UxQuickActionPill({
  children,
  icon,
  primary = false,
  style,
  ...props
}: UxQuickActionPillProps) {
  const base: CSSProperties = primary
    ? {
        background: techOrganicColors.primary,
        color: techOrganicColors.onPrimary,
        border: `1px solid ${techOrganicColors.primary}`,
        boxShadow: techOrganicShadows.mintGlow,
        fontWeight: 700,
      }
    : {
        background: "transparent",
        color: techOrganicColors.secondary,
        border: `1px solid ${techOrganicColors.outlineVariant}80`,
        fontWeight: 500,
      };

  return (
    <button
      type="button"
      {...props}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: techOrganicSpacing.xs,
        padding: `${techOrganicSpacing.sm}px ${techOrganicSpacing.lg}px`,
        borderRadius: techOrganicRadii.pill,
        cursor: "pointer",
        transition: "transform 150ms ease, background 150ms ease",
        ...base,
        ...style,
      }}
      onMouseEnter={e => {
        if (!primary) {
          e.currentTarget.style.background = `${techOrganicColors.secondary}0d`;
        }
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={e => {
        if (!primary) {
          e.currentTarget.style.background = "transparent";
        }
        props.onMouseLeave?.(e);
      }}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
