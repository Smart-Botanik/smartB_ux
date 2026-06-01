import { Checkbox, Input, Select, Space, Tag, Typography } from "antd";
import type {
  RegistryFieldInputValue,
  RegistryFieldRuntimeSpec,
  RegistryPatternRuntimeSpec,
  RegistryUnitPolicy,
} from "@growing/contracts";
import {
  getFieldFormatAndConstraints,
  unitPolicyFromPattern,
} from "@growing/contracts";

import { UxRegistryFieldValueInput } from "../UxRegistryFieldValueInput";

const { Text } = Typography;

export type UxRegistryProfileFieldRow = RegistryFieldRuntimeSpec & {
  label: string;
  required?: boolean;
  semanticKind?: string | null;
  pattern?: RegistryPatternRuntimeSpec | null;
};

export type UxRegistryProfileValuesFormProps = {
  fields: UxRegistryProfileFieldRow[];
  values: Record<string, RegistryFieldInputValue>;
  onChange: (fieldId: string, next: RegistryFieldInputValue) => void;
  disabled?: boolean;
};

function readSelectOptions(formatJson?: Record<string, unknown> | null): string[] {
  if (!formatJson || formatJson.mode !== "select" || !Array.isArray(formatJson.options)) {
    return [];
  }
  return formatJson.options.filter((option): option is string => typeof option === "string");
}

function renderNonNumberField(
  field: UxRegistryProfileFieldRow,
  input: RegistryFieldInputValue,
  onChange: UxRegistryProfileValuesFormProps["onChange"],
  disabled?: boolean,
) {
  switch (field.valueType) {
    case "boolean":
      return (
        <Checkbox
          disabled={disabled}
          checked={Boolean(input.value)}
          onChange={event =>
            onChange(field.fieldId, {
              ...input,
              value: event.target.checked,
            })
          }
        >
          {field.label}
        </Checkbox>
      );
    case "json":
      return (
        <Space direction="vertical" style={{ width: "100%" }} size={4}>
          <Text>{field.label}</Text>
          <Input.TextArea
            disabled={disabled}
            rows={4}
            placeholder='JSON value, e.g. [{"productId":"..."}]'
            value={typeof input.value === "string" ? input.value : JSON.stringify(input.value ?? "", null, 2)}
            onChange={event =>
              onChange(field.fieldId, {
                ...input,
                value: event.target.value,
              })
            }
          />
        </Space>
      );
    case "string":
    case "date": {
      const selectOptions = readSelectOptions(field.formatJson);
      if (selectOptions.length) {
        return (
          <Space direction="vertical" style={{ width: "100%" }} size={4}>
            <Text>{field.label}</Text>
            <Select
              disabled={disabled}
              style={{ width: "100%" }}
              placeholder="Select value"
              allowClear
              value={typeof input.value === "string" ? input.value : undefined}
              options={selectOptions.map(option => ({ value: option, label: option }))}
              onChange={nextValue =>
                onChange(field.fieldId, {
                  ...input,
                  value: nextValue ?? "",
                })
              }
            />
          </Space>
        );
      }

      return (
        <Space direction="vertical" style={{ width: "100%" }} size={4}>
          <Text>{field.label}</Text>
          <Input
            disabled={disabled}
            placeholder={field.valueType === "date" ? "ISO date string" : "value"}
            value={typeof input.value === "string" ? input.value : ""}
            onChange={event =>
              onChange(field.fieldId, {
                ...input,
                value: event.target.value,
              })
            }
          />
        </Space>
      );
    }
    default:
      return (
        <Space direction="vertical" style={{ width: "100%" }} size={4}>
          <Text>{field.label}</Text>
          <Input
            disabled={disabled}
            value={input.value == null ? "" : String(input.value)}
            onChange={event =>
              onChange(field.fieldId, {
                ...input,
                value: event.target.value,
              })
            }
          />
        </Space>
      );
  }
}

export function UxRegistryProfileValuesForm({
  fields,
  values,
  onChange,
  disabled = false,
}: UxRegistryProfileValuesFormProps) {
  if (!fields.length) {
    return <Text type="secondary">Select profile fields to edit runtime values.</Text>;
  }

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      {fields.map(field => {
        const input = values[field.fieldId] ?? {};
        const unitPolicy: RegistryUnitPolicy = unitPolicyFromPattern(field.pattern, field.unit);
        const { format, constraints } = getFieldFormatAndConstraints(field);

        return (
          <div
            key={field.fieldId}
            style={{
              padding: 12,
              border: "1px solid #f0f0f0",
              borderRadius: 8,
              background: "#fff",
            }}
          >
            <Space direction="vertical" size={8} style={{ width: "100%" }}>
              <Space wrap size={[4, 4]}>
                <Text type="secondary">{field.fieldId}</Text>
                {field.required ? <Tag color="blue">required</Tag> : null}
              </Space>

              {field.valueType === "number" ? (
                <UxRegistryFieldValueInput
                  label={field.label}
                  semanticKind={field.semanticKind}
                  unit={field.unit}
                  unitPolicy={unitPolicy}
                  format={format}
                  constraints={constraints}
                  value={typeof input.value === "number" ? input.value : null}
                  unitValue={input.unit ?? null}
                  disabled={disabled}
                  onChange={next =>
                    onChange(field.fieldId, {
                      value: next.value ?? undefined,
                      unit: next.unit ?? undefined,
                    })
                  }
                />
              ) : (
                renderNonNumberField(field, input, onChange, disabled)
              )}
            </Space>
          </div>
        );
      })}
    </Space>
  );
}
