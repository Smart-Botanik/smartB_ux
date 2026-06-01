import { useMemo } from "react";
import { Alert, InputNumber, Select, Space, Tag, Typography } from "antd";
import type {
  RegistryUnitPolicy,
  TNumericConstraintFields,
  TNumericFormatFields,
} from "@growing/contracts";
import {
  isAmbiguousEcPpmPair,
  resolveAllowedUnits,
  resolveDefaultInputUnit,
  resolveCanonicalUnit,
} from "@growing/contracts";

const { Text } = Typography;

export type UxRegistryFieldValueInputProps = {
  label: string;
  semanticKind?: string | null;
  unit?: string | null;
  unitPolicy?: RegistryUnitPolicy | null;
  format?: TNumericFormatFields;
  constraints?: TNumericConstraintFields;
  value?: number | null;
  unitValue?: string | null;
  onChange?: (next: { value?: number | null; unit?: string | null }) => void;
  disabled?: boolean;
  showMetaTags?: boolean;
  showAlerts?: boolean;
};

export function UxRegistryFieldValueInput({
  label,
  semanticKind,
  unit,
  unitPolicy,
  format = {},
  constraints = {},
  value,
  unitValue,
  onChange,
  disabled = false,
  showMetaTags = true,
  showAlerts = true,
}: UxRegistryFieldValueInputProps) {
  const unitOptions = useMemo(
    () => resolveAllowedUnits(unitPolicy ?? {}, unit),
    [unitPolicy, unit],
  );

  const defaultInputUnit = useMemo(
    () =>
      resolveDefaultInputUnit(unitPolicy ?? {}, unit) ??
      resolveCanonicalUnit(unitPolicy ?? {}, unit) ??
      unitOptions[0] ??
      undefined,
    [unitPolicy, unit, unitOptions],
  );

  const selectedUnit = unitValue ?? defaultInputUnit;
  const showUnitSelector = unitOptions.length > 1;
  const step = format.formatStep ?? (format.formatMode === "integer" ? 1 : 0.1);
  const precision = format.formatMode === "integer" ? 0 : format.formatPrecision;
  const canonicalUnit =
    resolveCanonicalUnit(unitPolicy ?? {}, unit) ?? unit ?? defaultInputUnit;

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="small">
      <Text>{label}</Text>
      <Space.Compact style={{ width: "100%" }}>
        <InputNumber
          style={{ flex: 1, minWidth: 160 }}
          disabled={disabled}
          placeholder="value"
          value={value ?? null}
          step={step}
          precision={precision}
          min={constraints.constraintMin}
          max={constraints.constraintMax}
          onChange={nextValue =>
            onChange?.({
              value: typeof nextValue === "number" ? nextValue : null,
              unit: selectedUnit ?? null,
            })
          }
        />
        {showUnitSelector ? (
          <Select
            disabled={disabled}
            style={{ width: 96 }}
            value={selectedUnit}
            options={unitOptions.map(option => ({ value: option, label: option }))}
            onChange={nextUnit =>
              onChange?.({
                value: value ?? null,
                unit: nextUnit,
              })
            }
          />
        ) : selectedUnit ? (
          <Tag style={{ marginInlineStart: 8, alignSelf: "center" }}>{selectedUnit}</Tag>
        ) : null}
      </Space.Compact>

      {showMetaTags ? (
        <Space wrap size={[4, 4]}>
          {semanticKind ? <Tag>{semanticKind}</Tag> : null}
          {canonicalUnit ? <Tag color="blue">storage: {canonicalUnit}</Tag> : null}
          {unitPolicy?.defaultInputUnit ? (
            <Tag>default input: {unitPolicy.defaultInputUnit}</Tag>
          ) : null}
        </Space>
      ) : null}

      {showAlerts && isAmbiguousEcPpmPair(unitOptions) ? (
        <Alert
          type="warning"
          showIcon
          message="EC ↔ PPM conversion"
          description={
            unitPolicy?.conversionProfile
              ? `Conversion profile: ${unitPolicy.conversionProfile}. Без явного профиля автоконверсия запрещена.`
              : "Для EC ↔ PPM нужен conversionProfile на Field Pattern."
          }
        />
      ) : null}

      {showAlerts &&
      (semanticKind === "temperature" ||
        unitOptions.includes("C") ||
        unitOptions.includes("F")) &&
      unitOptions.length > 1 ? (
        <Alert
          type="info"
          showIcon
          message="Temperature units"
          description="C ↔ F — детерминированная конверсия на consumer; storage остаётся в canonical unit."
        />
      ) : null}
    </Space>
  );
}
