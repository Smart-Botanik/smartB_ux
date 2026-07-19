import type { CSSProperties } from "react";

import { techOrganicColors, techOrganicRadii, techOrganicTypography } from "../../tokens";

export type UxSegmentedControlOption<T extends string = string> = {
  value: T;
  label: string;
};

export type UxSegmentedControlProps<T extends string = string> = {
  options: UxSegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  fullWidth?: boolean;
  style?: CSSProperties;
};

export function UxSegmentedControl<T extends string>({
  options,
  value,
  onChange,
  fullWidth = true,
  style,
}: UxSegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      style={{
        display: "flex",
        gap: 4,
        padding: 4,
        borderRadius: techOrganicRadii.lg,
        background: techOrganicColors.surfaceContainerLow,
        border: `1px solid ${techOrganicColors.outlineVariant}33`,
        width: fullWidth ? "100%" : "auto",
        ...style,
      }}
    >
      {options.map(option => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            style={{
              flex: fullWidth ? 1 : undefined,
              border: "none",
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: techOrganicRadii.md,
              background: active ? techOrganicColors.surfaceContainerLowest : "transparent",
              color: active ? techOrganicColors.primary : techOrganicColors.onSurfaceVariant,
              boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : undefined,
              ...techOrganicTypography.bodySm,
              fontFamily: techOrganicTypography.fontSans,
              fontWeight: 700,
              transition: "background 150ms ease, color 150ms ease, box-shadow 150ms ease",
            }}
            onMouseEnter={e => {
              if (!active) {
                e.currentTarget.style.background = `${techOrganicColors.surfaceContainerLowest}80`;
              }
            }}
            onMouseLeave={e => {
              if (!active) {
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
