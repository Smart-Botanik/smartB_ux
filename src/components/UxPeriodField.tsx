import type { CSSProperties } from "react";
import type { PlantPeriodPhase } from "@growing/contracts";

export type UxPeriodValue = PlantPeriodPhase | "";

export type UxPeriodFieldProps = {
  value: UxPeriodValue;
  disabled?: boolean;
  onChange: (value: UxPeriodValue) => void;
  /** Dense pills for forms (e.g. create-batch editor). */
  size?: "default" | "small";
};

export const UX_PERIOD_PHASE_OPTIONS: Array<{
  value: PlantPeriodPhase;
  label: string;
  tone: string;
  text: string;
}> = [
  { value: "germination", label: "Germination", tone: "#e8f9ef", text: "#1f7a43" },
  { value: "vegetation", label: "Vegetation", tone: "#e8f1ff", text: "#1f4fa3" },
  { value: "bloom", label: "Bloom", tone: "#f4e9ff", text: "#6c33a3" },
  { value: "harvest", label: "Harvest", tone: "#fff1e5", text: "#9a5c1c" },
];

export function UxPeriodField({
  value,
  disabled = false,
  onChange,
  size = "default",
}: UxPeriodFieldProps) {
  const dense = size === "small";
  const wrapStyle: CSSProperties = dense ? { ...styles.wrap, ...styles.wrapSmall } : styles.wrap;
  const optionBase: CSSProperties = dense ? { ...styles.option, ...styles.optionSmall } : styles.option;

  return (
    <div style={wrapStyle}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange("")}
        style={{
          ...optionBase,
          ...(value === "" ? styles.optionActive : null)
        }}
      >
        Not selected
      </button>
      {UX_PERIOD_PHASE_OPTIONS.map(option => (
        <button
          key={option.value}
          type="button"
          disabled={disabled}
          onClick={() => onChange(option.value)}
          style={{
            ...optionBase,
            background: option.tone,
            color: option.text,
            borderColor: value === option.value ? option.text : "#d4deef",
            boxShadow: value === option.value ? `0 0 0 1px ${option.text} inset` : "none"
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8
  },
  wrapSmall: {
    gap: 6
  },
  option: {
    border: "1px solid #d4deef",
    borderRadius: 999,
    background: "#ffffff",
    color: "#34486f",
    padding: "6px 10px",
    fontSize: 12.5,
    cursor: "pointer"
  },
  optionSmall: {
    padding: "3px 8px",
    fontSize: 11,
    lineHeight: 1.35
  },
  optionActive: {
    borderColor: "#355ea8",
    boxShadow: "0 0 0 1px #355ea8 inset"
  }
};

/** Flat muted hex for item-label chips in batch tables (avoid bright Ant presets). */
export const UX_TABLE_ITEM_LABEL_TAG_SX: CSSProperties = {
  marginInlineEnd: 0,
  borderRadius: 2,
  background: "#e4e6eb",
  color: "#4a4f58",
  border: "1px solid #c6cad2",
};

/** “Not selected” period chip in batch tables. */
export const UX_TABLE_PERIOD_EMPTY_TAG_SX: CSSProperties = {
  marginInlineEnd: 0,
  borderRadius: 2,
  background: "#ebecef",
  color: "#6a6f78",
  border: "1px solid #d4d6dc",
};

/** Unknown / raw period value in batch tables. */
export const UX_TABLE_PERIOD_FALLBACK_TAG_SX: CSSProperties = {
  marginInlineEnd: 0,
  borderRadius: 2,
  background: "#ebecef",
  color: "#5c6068",
  border: "1px solid #d4d6dc",
};

/** Flat muted fills for period chips in dense batch tables. */
export const UX_TABLE_PERIOD_PHASE_TAG_SX: Record<PlantPeriodPhase, CSSProperties> = {
  germination: {
    marginInlineEnd: 0,
    borderRadius: 2,
    background: "#dfe8e2",
    color: "#3d4a42",
    border: "1px solid #c3ccc6",
  },
  vegetation: {
    marginInlineEnd: 0,
    borderRadius: 2,
    background: "#e0e4eb",
    color: "#3a4252",
    border: "1px solid #c4c8d2",
  },
  bloom: {
    marginInlineEnd: 0,
    borderRadius: 2,
    background: "#e8e2eb",
    color: "#4a4254",
    border: "1px solid #cfc8d3",
  },
  harvest: {
    marginInlineEnd: 0,
    borderRadius: 2,
    background: "#ebe6e0",
    color: "#524a42",
    border: "1px solid #d6d1ca",
  },
};
