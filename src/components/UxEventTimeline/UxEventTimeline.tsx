import type { CSSProperties, ReactNode } from "react";

import { techOrganicColors, techOrganicRadii, techOrganicShadows, techOrganicSpacing, techOrganicTypography } from "../../tokens";
import { UxMonoLabel } from "../UxMonoLabel";
import { UxStatusBadge } from "../UxStatusBadge";

export type UxEventTimelineItem = {
  id: string;
  title: string;
  subtitle?: string;
  detail?: string;
  timestamp: string;
  badge?: string;
  icon?: ReactNode;
  featured?: boolean;
  thumbnailUrl?: string;
};

export type UxEventTimelineProps = {
  items: UxEventTimelineItem[];
  title?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  onItemClick?: (id: string) => void;
  maxHeight?: number;
  style?: CSSProperties;
};

function DefaultEventIcon({ featured }: { featured?: boolean }) {
  return (
    <span
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: featured ? techOrganicColors.primary : techOrganicColors.outlineVariant,
        boxShadow: featured ? techOrganicShadows.mintGlow : undefined,
        border: `4px solid ${techOrganicColors.background}`,
        display: "block",
        flexShrink: 0,
      }}
    />
  );
}

export function UxEventTimeline({
  items,
  title,
  actionLabel,
  onActionClick,
  onItemClick,
  maxHeight,
  style,
}: UxEventTimelineProps) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: techOrganicSpacing.md, ...style }}>
      {title || actionLabel ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {title ? (
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
          ) : (
            <span />
          )}
          {actionLabel ? (
            <button
              type="button"
              onClick={onActionClick}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: onActionClick ? "pointer" : "default",
                color: techOrganicColors.primary,
                ...techOrganicTypography.labelSm,
                fontFamily: techOrganicTypography.fontMono,
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              {actionLabel}
            </button>
          ) : null}
        </div>
      ) : null}

      <div
        style={{
          position: "relative",
          paddingLeft: 32,
          maxHeight,
          overflowY: maxHeight ? "auto" : undefined,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 7,
            top: 8,
            bottom: 0,
            width: 2,
            background: `${techOrganicColors.outlineVariant}66`,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: techOrganicSpacing.md }}>
          {items.map(item => (
            <div key={item.id} style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: -30, top: 16, zIndex: 1 }}>
                {item.icon ?? <DefaultEventIcon featured={item.featured} />}
              </div>

              <button
                type="button"
                onClick={onItemClick ? () => onItemClick(item.id) : undefined}
                style={{
                  width: "100%",
                  textAlign: "left",
                  cursor: onItemClick ? "pointer" : "default",
                  background: techOrganicColors.surfaceContainerLowest,
                  border: `1px solid ${techOrganicColors.outlineVariant}4d`,
                  borderRadius: techOrganicRadii.lg,
                  padding: techOrganicSpacing.md,
                  boxShadow: techOrganicShadows.panel,
                  transition: "border-color 200ms ease",
                }}
                onMouseEnter={e => {
                  if (onItemClick) {
                    e.currentTarget.style.borderColor = `${techOrganicColors.primary}80`;
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${techOrganicColors.outlineVariant}4d`;
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: techOrganicSpacing.sm }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: techOrganicSpacing.sm, flexWrap: "wrap" }}>
                      <span
                        style={{
                          ...techOrganicTypography.bodySm,
                          fontFamily: techOrganicTypography.fontSans,
                          fontWeight: 700,
                          color: techOrganicColors.onSurface,
                        }}
                      >
                        {item.title}
                      </span>
                      {item.badge ? <UxStatusBadge label={item.badge} tone="success" /> : null}
                    </div>
                    {item.subtitle ? (
                      <UxMonoLabel variant="dataSm" muted style={{ display: "block", marginTop: 4 }}>
                        {item.subtitle}
                      </UxMonoLabel>
                    ) : null}
                    {item.detail ? (
                      <UxMonoLabel variant="dataSm" muted style={{ display: "block", marginTop: 8 }}>
                        {item.detail}
                      </UxMonoLabel>
                    ) : null}
                  </div>
                  <UxMonoLabel variant="dataSm" muted style={{ flexShrink: 0 }}>
                    {item.timestamp}
                  </UxMonoLabel>
                </div>

                {item.thumbnailUrl ? (
                  <img
                    src={item.thumbnailUrl}
                    alt=""
                    style={{
                      marginTop: techOrganicSpacing.sm,
                      width: 64,
                      height: 64,
                      borderRadius: techOrganicRadii.md,
                      objectFit: "cover",
                      border: `1px solid ${techOrganicColors.outlineVariant}33`,
                    }}
                  />
                ) : null}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
