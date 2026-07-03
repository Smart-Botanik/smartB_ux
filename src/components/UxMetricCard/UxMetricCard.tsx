import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import { techOrganicColors, techOrganicRadii, techOrganicSpacing, techOrganicTypography } from "../../tokens";
import { UxMonoLabel } from "../UxMonoLabel";
import { UxSparkline } from "../UxSparkline";
import { UxSurfaceCard } from "../UxSurfaceCard";

export type UxMetricCardAvatar = {
  src?: string;
  alt?: string;
  label?: string;
};

export type UxMetricCardProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  subtitle?: string;
  sparklineValues?: number[];
  sparklineColor?: string;
  avatars?: UxMetricCardAvatar[];
  overflowCount?: number;
  updatedAt?: string;
  variant?: "default" | "hero";
  heroImageUrl?: string;
  heroBadge?: string;
  trailing?: ReactNode;
};

function AvatarStack({
  avatars,
  overflowCount,
}: {
  avatars: UxMetricCardAvatar[];
  overflowCount?: number;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {avatars.map((avatar, index) => (
        <div
          key={`${avatar.src ?? avatar.label ?? index}`}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            overflow: "hidden",
            border: `2px solid ${techOrganicColors.surfaceContainerLowest}`,
            marginLeft: index === 0 ? 0 : -8,
            background: techOrganicColors.surfaceVariant,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            fontWeight: 700,
            color: techOrganicColors.onSurfaceVariant,
          }}
        >
          {avatar.src ? (
            <img src={avatar.src} alt={avatar.alt ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            avatar.label
          )}
        </div>
      ))}
      {overflowCount && overflowCount > 0 ? (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: `2px solid ${techOrganicColors.surfaceContainerLowest}`,
            marginLeft: -8,
            background: techOrganicColors.surfaceVariant,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            fontWeight: 700,
            color: techOrganicColors.onSurfaceVariant,
          }}
        >
          +{overflowCount}
        </div>
      ) : null}
    </div>
  );
}

export function UxMetricCard({
  title,
  subtitle,
  sparklineValues,
  sparklineColor,
  avatars = [],
  overflowCount,
  updatedAt,
  variant = "default",
  heroImageUrl,
  heroBadge,
  trailing,
  style,
  ...props
}: UxMetricCardProps) {
  if (variant === "hero" && heroImageUrl) {
    return (
      <UxSurfaceCard
        {...props}
        padding={0}
        hoverable
        style={{ overflow: "hidden", padding: 0, ...style }}
      >
        <div style={{ position: "relative", height: 192 }}>
          <img
            src={heroImageUrl}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(255,255,255,0.9), transparent)",
            }}
          />
          {heroBadge ? (
            <div style={{ position: "absolute", top: 16, left: 16 }}>
              <UxMonoLabel
                variant="labelSm"
                style={{
                  padding: "4px 8px",
                  borderRadius: techOrganicRadii.sm,
                  background: "rgba(255,255,255,0.8)",
                  color: techOrganicColors.secondary,
                }}
              >
                {heroBadge}
              </UxMonoLabel>
            </div>
          ) : null}
        </div>
        <div style={{ padding: techOrganicSpacing.lg, marginTop: -32, position: "relative", zIndex: 1 }}>
          <MetricCardFooter
            subtitle={subtitle}
            sparklineValues={sparklineValues}
            sparklineColor={sparklineColor}
            updatedAt={updatedAt}
          />
        </div>
      </UxSurfaceCard>
    );
  }

  return (
    <UxSurfaceCard {...props} hoverable style={{ display: "flex", flexDirection: "column", gap: techOrganicSpacing.lg, ...style }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
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
          {subtitle ? (
            <UxMonoLabel variant="dataSm" muted style={{ display: "block", marginTop: 4 }}>
              {subtitle}
            </UxMonoLabel>
          ) : null}
        </div>
        {trailing}
      </div>

      {sparklineValues && sparklineValues.length > 0 ? (
        <UxSparkline values={sparklineValues} color={sparklineColor} />
      ) : null}

      <MetricCardFooter
        avatars={avatars}
        overflowCount={overflowCount}
        updatedAt={updatedAt}
      />
    </UxSurfaceCard>
  );
}

function MetricCardFooter({
  subtitle,
  sparklineValues,
  sparklineColor,
  avatars = [],
  overflowCount,
  updatedAt,
}: {
  subtitle?: string;
  sparklineValues?: number[];
  sparklineColor?: string;
  avatars?: UxMetricCardAvatar[];
  overflowCount?: number;
  updatedAt?: string;
}) {
  const footerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
  };

  if (subtitle && sparklineValues) {
    return (
      <div style={footerStyle}>
        <UxMonoLabel variant="dataSm" style={{ fontWeight: 600 }}>
          {subtitle}
        </UxMonoLabel>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <UxSparkline values={sparklineValues} height={32} color={sparklineColor} style={{ width: 64 }} />
          {updatedAt ? (
            <UxMonoLabel variant="dataSm" muted style={{ marginTop: 4 }}>
              {updatedAt}
            </UxMonoLabel>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div style={footerStyle}>
      {avatars.length > 0 ? <AvatarStack avatars={avatars} overflowCount={overflowCount} /> : <span />}
      {updatedAt ? (
        <UxMonoLabel variant="dataSm" muted>
          {updatedAt}
        </UxMonoLabel>
      ) : null}
    </div>
  );
}
