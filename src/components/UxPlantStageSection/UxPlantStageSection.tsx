import type { CSSProperties, ReactNode } from "react";

import { techOrganicColors, techOrganicRadii, techOrganicSpacing, techOrganicTypography } from "../../tokens";
import { UxMonoLabel } from "../UxMonoLabel";
import { UxSurfaceCard } from "../UxSurfaceCard";

export type UxPlantStageTone = "planned" | "pool" | "seated";

export type UxPlantStageItem = {
  id: string;
  name: string;
  subtitle?: string;
  imageUrl?: string;
  trailing?: ReactNode;
};

export type UxPlantStageSectionProps = {
  stage: UxPlantStageTone;
  title: string;
  count?: number;
  items: UxPlantStageItem[];
  onItemClick?: (id: string) => void;
  emptyLabel?: string;
  style?: CSSProperties;
};

const stageDotColor: Record<UxPlantStageTone, string> = {
  planned: `${techOrganicColors.onSurfaceVariant}66`,
  pool: techOrganicColors.secondary,
  seated: techOrganicColors.primary,
};

export function UxPlantStageSection({
  stage,
  title,
  count,
  items,
  onItemClick,
  emptyLabel = "Нет растений",
  style,
}: UxPlantStageSectionProps) {
  const heading = count !== undefined ? `${title} (${count})` : title;

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: techOrganicSpacing.md, ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: techOrganicSpacing.sm }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: stageDotColor[stage],
            flexShrink: 0,
          }}
        />
        <h3
          style={{
            margin: 0,
            ...techOrganicTypography.headlineSm,
            fontFamily: techOrganicTypography.fontSans,
            color: techOrganicColors.onSurface,
          }}
        >
          {heading}
        </h3>
      </div>

      {items.length === 0 ? (
        <UxMonoLabel variant="dataSm" muted>
          {emptyLabel}
        </UxMonoLabel>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: techOrganicSpacing.md,
          }}
        >
          {items.map(item => (
            <UxSurfaceCard
              key={item.id}
              hoverable={Boolean(onItemClick)}
              onClick={onItemClick ? () => onItemClick(item.id) : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: techOrganicSpacing.md,
                cursor: onItemClick ? "pointer" : "default",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: techOrganicRadii.md,
                  overflow: "hidden",
                  background: techOrganicColors.surfaceContainerLow,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <UxMonoLabel variant="labelSm" muted>
                    PL
                  </UxMonoLabel>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    ...techOrganicTypography.bodySm,
                    fontFamily: techOrganicTypography.fontSans,
                    fontWeight: 700,
                    color: techOrganicColors.onSurface,
                  }}
                >
                  {item.name}
                </div>
                {item.subtitle ? (
                  <UxMonoLabel variant="dataSm" muted style={{ display: "block", marginTop: 4 }}>
                    {item.subtitle}
                  </UxMonoLabel>
                ) : null}
              </div>

              {item.trailing}
            </UxSurfaceCard>
          ))}
        </div>
      )}
    </section>
  );
}
