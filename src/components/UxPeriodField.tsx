import type { CSSProperties } from "react";
import type { PlantPeriodPhase } from "@growing/contracts";

export type UxPeriodValue = PlantPeriodPhase | "";

export type UxPeriodFieldProps = {
  value: UxPeriodValue;
  disabled?: boolean;
  onChange: (value: UxPeriodValue) => void;
};

const PERIOD_OPTIONS: Array<{ value: PlantPeriodPhase; label: string; tone: string; text: string }> = [
  { value: "germination", label: "Germination", tone: "#e8f9ef", text: "#1f7a43" },
  { value: "vegetation", label: "Vegetation", tone: "#e8f1ff", text: "#1f4fa3" },
  { value: "bloom", label: "Bloom", tone: "#f4e9ff", text: "#6c33a3" },
  { value: "harvest", label: "Harvest", tone: "#fff1e5", text: "#9a5c1c" }
];

export function UxPeriodField({ value, disabled = false, onChange }: UxPeriodFieldProps) {
  return (
    <div style={styles.wrap}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange("")}
        style={{
          ...styles.option,
          ...(value === "" ? styles.optionActive : null)
        }}
      >
        Not selected
      </button>
      {PERIOD_OPTIONS.map(option => (
        <button
          key={option.value}
          type="button"
          disabled={disabled}
          onClick={() => onChange(option.value)}
          style={{
            ...styles.option,
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
  option: {
    border: "1px solid #d4deef",
    borderRadius: 999,
    background: "#ffffff",
    color: "#34486f",
    padding: "6px 10px",
    fontSize: 12.5,
    cursor: "pointer"
  },
  optionActive: {
    borderColor: "#355ea8",
    boxShadow: "0 0 0 1px #355ea8 inset"
  }
};
