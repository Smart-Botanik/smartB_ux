import type { CSSProperties, ReactNode } from "react";

import { techOrganicColors, techOrganicRadii, techOrganicSpacing, techOrganicTypography } from "../../tokens";
import { UxMonoLabel } from "../UxMonoLabel";
import { UxSurfaceCard } from "../UxSurfaceCard";

export type UxChartPanelSeries = {
  key: string;
  label: string;
  color: string;
};

export type UxChartPanelPeriod = {
  key: string;
  label: string;
};

export type UxChartPanelProps = {
  title?: string;
  values?: number[];
  chartColor?: string;
  series?: UxChartPanelSeries[];
  periods?: UxChartPanelPeriod[];
  activePeriodKey?: string;
  onPeriodChange?: (key: string) => void;
  axisLabels?: string[];
  placeholder?: string;
  height?: number;
  children?: ReactNode;
  style?: CSSProperties;
};

function buildLinePath(values: number[], width: number, height: number): string {
  if (values.length === 0) {
    return "";
  }
  const max = Math.max(...values, 1);
  const step = values.length > 1 ? width / (values.length - 1) : width;
  return values
    .map((value, index) => {
      const x = index * step;
      const y = height - (value / max) * (height - 8) - 4;
      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

function buildAreaPath(values: number[], width: number, height: number): string {
  const line = buildLinePath(values, width, height);
  if (!line) {
    return "";
  }
  return `${line} L${width},${height} L0,${height} Z`;
}

export function UxChartPanel({
  title,
  values = [],
  chartColor = techOrganicColors.primary,
  series = [],
  periods = [],
  activePeriodKey,
  onPeriodChange,
  axisLabels = [],
  placeholder = "Визуализация данных…",
  height = 160,
  children,
  style,
}: UxChartPanelProps) {
  const chartWidth = 400;
  const chartHeight = height - 24;
  const gradientId = `ux-chart-gradient-${chartColor.replace("#", "")}`;

  return (
    <UxSurfaceCard style={{ display: "flex", flexDirection: "column", gap: techOrganicSpacing.md, ...style }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: techOrganicSpacing.md, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: techOrganicSpacing.sm }}>
          {title ? (
            <UxMonoLabel variant="labelSm" uppercase muted>
              {title}
            </UxMonoLabel>
          ) : null}
          {series.length > 0 ? (
            <div style={{ display: "flex", gap: techOrganicSpacing.md, flexWrap: "wrap" }}>
              {series.map(item => (
                <div key={item.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: item.color,
                      display: "inline-block",
                    }}
                  />
                  <UxMonoLabel variant="labelSm" uppercase muted>
                    {item.label}
                  </UxMonoLabel>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {periods.length > 0 ? (
          <div
            style={{
              display: "flex",
              gap: 4,
              padding: 4,
              borderRadius: techOrganicRadii.md,
              background: techOrganicColors.surfaceContainerLow,
              border: `1px solid ${techOrganicColors.outlineVariant}1a`,
            }}
          >
            {periods.map(period => {
              const active = period.key === activePeriodKey;
              return (
                <button
                  key={period.key}
                  type="button"
                  onClick={onPeriodChange ? () => onPeriodChange(period.key) : undefined}
                  style={{
                    border: "none",
                    cursor: onPeriodChange ? "pointer" : "default",
                    padding: "4px 12px",
                    borderRadius: techOrganicRadii.sm,
                    background: active ? techOrganicColors.surfaceContainerLowest : "transparent",
                    color: active ? techOrganicColors.primary : techOrganicColors.onSurfaceVariant,
                    boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : undefined,
                    ...techOrganicTypography.labelSm,
                    fontFamily: techOrganicTypography.fontMono,
                    fontWeight: 700,
                  }}
                >
                  {period.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div
        style={{
          height,
          borderRadius: techOrganicRadii.md,
          background: `${techOrganicColors.surfaceContainerLow}80`,
          border: `1px dashed ${techOrganicColors.outlineVariant}33`,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {children ?? (values.length > 0 ? (
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <defs>
              <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={chartColor} stopOpacity={0.15} />
                <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <path d={buildAreaPath(values, chartWidth, chartHeight)} fill={`url(#${gradientId})`} />
            <path
              d={buildLinePath(values, chartWidth, chartHeight)}
              fill="none"
              stroke={chartColor}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UxMonoLabel variant="labelSm" uppercase muted>
              {placeholder}
            </UxMonoLabel>
          </div>
        ))}
      </div>

      {axisLabels.length > 0 ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {axisLabels.map(label => (
            <UxMonoLabel key={label} variant="dataSm" muted>
              {label}
            </UxMonoLabel>
          ))}
        </div>
      ) : null}
    </UxSurfaceCard>
  );
}
