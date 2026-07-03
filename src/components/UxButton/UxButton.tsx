import type {
  ButtonHTMLAttributes,
  CSSProperties,
  PropsWithChildren
} from "react";

import { techOrganicColors, techOrganicRadii, techOrganicShadows, techOrganicSpacing } from "../../tokens";

type UxButtonVariant = "primary" | "secondary" | "ghost" | "growPrimary" | "growSecondary" | "growPill";

export type UxButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: UxButtonVariant;
  }
>;

const legacyVariantStyles: Record<"primary" | "secondary" | "ghost", CSSProperties> = {
  primary: { background: "#2264ff", color: "#ffffff", border: "1px solid #2264ff" },
  secondary: { background: "#f3f6ff", color: "#1a3fb0", border: "1px solid #b8ccff" },
  ghost: { background: "transparent", color: "#1a3fb0", border: "1px dashed #b8ccff" },
};

const growVariantStyles: Record<"growPrimary" | "growSecondary" | "growPill", CSSProperties> = {
  growPrimary: {
    background: techOrganicColors.primaryContainer,
    color: techOrganicColors.secondaryFixed,
    border: `1px solid ${techOrganicColors.primaryContainer}`,
    boxShadow: techOrganicShadows.mintGlow,
  },
  growSecondary: {
    background: "transparent",
    color: techOrganicColors.secondary,
    border: `1px solid ${techOrganicColors.outlineVariant}80`,
  },
  growPill: {
    background: techOrganicColors.primary,
    color: techOrganicColors.onPrimary,
    border: `1px solid ${techOrganicColors.primary}`,
    boxShadow: techOrganicShadows.mintGlow,
    borderRadius: techOrganicRadii.pill,
  },
};

function isGrowVariant(variant: UxButtonVariant): variant is "growPrimary" | "growSecondary" | "growPill" {
  return variant === "growPrimary" || variant === "growSecondary" || variant === "growPill";
}

function isLegacyVariant(variant: UxButtonVariant): variant is "primary" | "secondary" | "ghost" {
  return variant === "primary" || variant === "secondary" || variant === "ghost";
}

export function UxButton({
  children,
  variant = "primary",
  style,
  ...props
}: UxButtonProps) {
  const variantStyle = isGrowVariant(variant)
    ? growVariantStyles[variant]
    : isLegacyVariant(variant)
      ? legacyVariantStyles[variant]
      : legacyVariantStyles.primary;

  const borderRadius =
    variant === "growPill" ? techOrganicRadii.pill : variant.startsWith("grow") ? techOrganicRadii.md : 10;

  return (
    <button
      type="button"
      {...props}
      style={{
        padding: variant.startsWith("grow")
          ? `${techOrganicSpacing.sm}px ${techOrganicSpacing.lg}px`
          : "10px 16px",
        borderRadius,
        fontWeight: variant.startsWith("grow") ? 700 : 600,
        cursor: "pointer",
        transition: "all 150ms ease",
        ...variantStyle,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
