import type { CSSProperties } from "react";

import { techOrganicColors, techOrganicRadii, techOrganicSpacing, techOrganicTypography } from "../../tokens";
import { UxMonoLabel } from "../UxMonoLabel";

export type UxSeatCellState = "occupied" | "empty" | "disabled";

export type UxSeatCell = {
  id: string;
  label: string;
  state: UxSeatCellState;
  plantName?: string;
  stageLabel?: string;
  imageUrl?: string;
};

export type UxSeatGridProps = {
  title?: string;
  seats: UxSeatCell[];
  columns?: number;
  onSeatClick?: (id: string) => void;
  style?: CSSProperties;
};

export function UxSeatGrid({ title, seats, columns = 2, onSeatClick, style }: UxSeatGridProps) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: techOrganicSpacing.md, ...style }}>
      {title ? (
        <UxMonoLabel variant="labelSm" uppercase muted>
          {title}
        </UxMonoLabel>
      ) : null}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: techOrganicSpacing.md,
        }}
      >
        {seats.map(seat => {
          const isEmpty = seat.state === "empty";
          const isDisabled = seat.state === "disabled";

          return (
            <button
              key={seat.id}
              type="button"
              disabled={isDisabled}
              onClick={onSeatClick && !isDisabled ? () => onSeatClick(seat.id) : undefined}
              style={{
                position: "relative",
                minHeight: 134,
                padding: techOrganicSpacing.md,
                borderRadius: techOrganicRadii.lg,
                border: isEmpty
                  ? `2px dashed ${techOrganicColors.outlineVariant}4d`
                  : `1px solid ${techOrganicColors.outlineVariant}4d`,
                background: isEmpty ? "transparent" : techOrganicColors.surfaceContainerLowest,
                cursor: onSeatClick && !isDisabled ? "pointer" : "default",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: isEmpty ? "center" : "flex-start",
                transition: "border-color 200ms ease, background 200ms ease",
              }}
              onMouseEnter={e => {
                if (onSeatClick && !isDisabled) {
                  e.currentTarget.style.borderColor = `${techOrganicColors.primary}80`;
                  if (isEmpty) {
                    e.currentTarget.style.background = `${techOrganicColors.primary}0d`;
                  }
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = isEmpty
                  ? `${techOrganicColors.outlineVariant}4d`
                  : `${techOrganicColors.outlineVariant}4d`;
                if (isEmpty) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <UxMonoLabel
                variant="labelSm"
                muted
                style={{ position: "absolute", top: 8, left: 8 }}
              >
                {seat.label}
              </UxMonoLabel>

              {isEmpty ? (
                <>
                  <span style={{ fontSize: 28, color: techOrganicColors.outline, lineHeight: 1 }}>+</span>
                  <UxMonoLabel variant="labelSm" uppercase muted style={{ marginTop: 8 }}>
                    Свободно
                  </UxMonoLabel>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: `2px solid ${techOrganicColors.primary}33`,
                      marginTop: techOrganicSpacing.sm,
                      marginBottom: techOrganicSpacing.sm,
                      background: techOrganicColors.surfaceContainerLow,
                    }}
                  >
                    {seat.imageUrl ? (
                      <img src={seat.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : null}
                  </div>
                  {seat.plantName ? (
                    <span
                      style={{
                        ...techOrganicTypography.bodySm,
                        fontFamily: techOrganicTypography.fontSans,
                        fontWeight: 700,
                        color: techOrganicColors.onSurface,
                      }}
                    >
                      {seat.plantName}
                    </span>
                  ) : null}
                  {seat.stageLabel ? (
                    <UxMonoLabel variant="labelSm" uppercase style={{ color: techOrganicColors.primary, marginTop: 4 }}>
                      {seat.stageLabel}
                    </UxMonoLabel>
                  ) : null}
                </>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
