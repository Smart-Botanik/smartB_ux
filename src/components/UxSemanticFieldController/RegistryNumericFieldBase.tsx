import type { ReactNode } from "react";
import { Alert, InputNumber, Select, Space, Tag, Typography } from "antd";
import { isAmbiguousEcPpmPair } from "@growing/contracts";

import { useRegistryNumericField } from "./useRegistryNumericField";
import type { UxSemanticNumericFieldProps } from "./types";

const { Text } = Typography;

export type RegistryNumericFieldBaseProps = UxSemanticNumericFieldProps & {
  footer?: ReactNode;
};

export function RegistryNumericFieldBase({
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
  placeholder = "value",
  size = "middle",
  footer,
}: RegistryNumericFieldBaseProps) {
  const {
    unitOptions,
    selectedUnit,
    showUnitSelector,
    step,
    precision,
    canonicalUnit,
  } = useRegistryNumericField({ unit, unitPolicy, format, unitValue });

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="small">
      {label ? <Text>{label}</Text> : null}
      <Space.Compact style={{ width: "100%" }}>
        <InputNumber
          size={size}
          style={{ flex: 1, minWidth: 160 }}
          disabled={disabled}
          placeholder={placeholder}
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
            size={size}
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

      {footer}

      {showAlerts && isAmbiguousEcPpmPair(unitOptions) ? (
        <Alert
          type="warning"
          showIcon
          message="EC ↔ PPM"
          description={
            unitPolicy?.conversionProfile
              ? `Профиль: ${unitPolicy.conversionProfile}. Конверсия только через явный профиль.`
              : "Для EC ↔ PPM нужен conversionProfile на Field Pattern."
          }
        />
      ) : null}
    </Space>
  );
}
