import type { CSSProperties } from "react";

import { techOrganicColors, techOrganicSpacing, techOrganicTypography } from "../../tokens";
import { UxMonoLabel } from "../UxMonoLabel";

/** hub — приветствие на главной; section — списки; detail — карточка сущности. */
export type UxPageHeaderVariant = "hub" | "section" | "detail";

export type UxPageHeaderProps = {
  title: string;
  subtitle?: string;
  variant?: UxPageHeaderVariant;
  style?: CSSProperties;
  className?: string;
};

const variantTypography = {
  hub: techOrganicTypography.headlineMd,
  section: techOrganicTypography.headlineSm,
  detail: techOrganicTypography.headlineSm,
} as const;

export function UxPageHeader({
  title,
  subtitle,
  variant = "section",
  style,
  className,
}: UxPageHeaderProps) {
  const titleTypography = variantTypography[variant];

  return (
    <section
      className={["ux-page-header", `ux-page-header--${variant}`, className].filter(Boolean).join(" ")}
      style={{
        display: "block",
        flex: "0 0 auto",
        width: "100%",
        minHeight: 0,
        ...style,
      }}
    >
      <h1
        className="ux-page-header__title"
        style={{
          margin: 0,
          fontSize: titleTypography.fontSize,
          lineHeight: `${titleTypography.lineHeight}px`,
          fontWeight: titleTypography.fontWeight,
          letterSpacing:
            "letterSpacing" in titleTypography ? titleTypography.letterSpacing : undefined,
          fontFamily: techOrganicTypography.fontSans,
          color: techOrganicColors.onSurface,
          overflowWrap: "anywhere",
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
    </section>
  );
}
