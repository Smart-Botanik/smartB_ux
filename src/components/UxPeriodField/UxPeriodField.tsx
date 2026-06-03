import type { CSSProperties } from "react";
import { Select, Tag } from "antd";
import { PLANT_PERIOD_PHASES, type PlantPeriodPhase } from "@growing/contracts";

export type UxPeriodValue = PlantPeriodPhase | "";

export type UxPeriodFieldProps = {
  value: UxPeriodValue;
  disabled?: boolean;
  onChange: (value: UxPeriodValue) => void;
  /** Dense pills for forms (e.g. create-batch editor). */
  size?: "default" | "small";
};

export type UxPeriodSelectProps = {
  value?: UxPeriodValue;
  disabled?: boolean;
  placeholder?: string;
  allowClear?: boolean;
  size?: "small" | "middle" | "large";
  style?: CSSProperties;
  onChange: (value: UxPeriodValue) => void;
};

export const UX_PERIOD_PHASE_OPTIONS: Array<{
  value: PlantPeriodPhase;
  label: string;
  tone: string;
  text: string;
}> = [
  { value: "germination", label: "Герминация", tone: "#e6f4ff", text: "#0958d9" },
  { value: "vegetation", label: "Вегетация", tone: "#f6ffed", text: "#237804" },
  { value: "bloom", label: "Цветение", tone: "#fffbe6", text: "#ad8b00" },
  { value: "preharvest", label: "Подготовка к урожаю", tone: "#f9f0ff", text: "#722ed1" },
  { value: "harvest", label: "Харвест", tone: "#fff1f0", text: "#cf1322" },
];

const PERIOD_OPTION_BY_VALUE = new Map(
  UX_PERIOD_PHASE_OPTIONS.map(option => [option.value, option]),
);

export function plantPeriodPhaseLabel(value: PlantPeriodPhase): string {
  return PERIOD_OPTION_BY_VALUE.get(value)?.label ?? value;
}

function PeriodTag({ value }: { value: PlantPeriodPhase }) {
  const option = PERIOD_OPTION_BY_VALUE.get(value);
  if (!option) {
    return <span>{value}</span>;
  }

  return (
    <Tag
      style={{
        marginInlineEnd: 0,
        borderColor: option.text,
        background: option.tone,
        color: option.text,
      }}
    >
      {option.label}
    </Tag>
  );
}

export function UxPeriodSelect({
  value,
  disabled = false,
  placeholder = "Не выбран",
  allowClear = true,
  size = "middle",
  style,
  onChange,
}: UxPeriodSelectProps) {
  return (
    <Select
      allowClear={allowClear}
      disabled={disabled}
      placeholder={placeholder}
      size={size}
      style={style}
      value={value || undefined}
      options={PLANT_PERIOD_PHASES.map(phase => ({
        value: phase,
        label: <PeriodTag value={phase} />,
      }))}
      optionLabelProp="label"
      onChange={next => onChange((next ?? "") as UxPeriodValue)}
    />
  );
}

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
    background: "#e6f4ff",
    color: "#0958d9",
    border: "1px solid #91caff",
  },
  vegetation: {
    marginInlineEnd: 0,
    borderRadius: 2,
    background: "#f6ffed",
    color: "#237804",
    border: "1px solid #b7eb8f",
  },
  bloom: {
    marginInlineEnd: 0,
    borderRadius: 2,
    background: "#fffbe6",
    color: "#ad8b00",
    border: "1px solid #ffe58f",
  },
  preharvest: {
    marginInlineEnd: 0,
    borderRadius: 2,
    background: "#f9f0ff",
    color: "#722ed1",
    border: "1px solid #d3adf7",
  },
  harvest: {
    marginInlineEnd: 0,
    borderRadius: 2,
    background: "#fff1f0",
    color: "#cf1322",
    border: "1px solid #ffa39e",
  },
};
