import { useMemo, useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";
import type { RegistryFieldInputValue } from "@growing/contracts";
import { createDefaultFieldInput } from "@growing/contracts";

import {
  LENGTH_POLICY,
  PH_CONSTRAINTS,
  PH_FORMAT,
  PH_UNIT_POLICY,
  PPM_CONSTRAINTS,
  PPM_EC_WITH_PROFILE_POLICY,
  PPM_FORMAT,
  TEMPERATURE_POLICY,
} from "../UxSemanticFieldController/storyFixtures";
import { UxRegistryProfileValuesForm, type UxRegistryProfileFieldRow } from "./UxRegistryProfileValuesForm";

const WATERING_DEMO_FIELDS: UxRegistryProfileFieldRow[] = [
  {
    fieldId: "plant.watering.solution.ph",
    label: "Solution pH",
    valueType: "number",
    semanticKind: "ph",
    unit: "pH",
    fieldPatternKey: "ph.decimal.v1",
    formatJson: PH_FORMAT,
    constraintsJson: PH_CONSTRAINTS,
    required: true,
    pattern: PH_UNIT_POLICY,
  },
  {
    fieldId: "plant.watering.solution.ppm",
    label: "Solution PPM",
    valueType: "number",
    semanticKind: "ppm",
    unit: "ppm",
    fieldPatternKey: "ppm.integer.v1",
    formatJson: PPM_FORMAT,
    constraintsJson: PPM_CONSTRAINTS,
    required: false,
    pattern: PPM_EC_WITH_PROFILE_POLICY,
  },
  {
    fieldId: "plant.watering.solution.temperature",
    label: "Solution temperature",
    valueType: "number",
    semanticKind: "temperature",
    unit: "C",
    fieldPatternKey: "temperature.decimal.v1",
    formatJson: { mode: "decimal", precision: 1, step: 0.1 },
    constraintsJson: { min: -50, max: 120 },
    required: false,
    pattern: TEMPERATURE_POLICY,
  },
  {
    fieldId: "plant.pot.height",
    label: "Pot height",
    valueType: "number",
    semanticKind: "length",
    unit: "cm",
    fieldPatternKey: "length.cm.decimal.v1",
    formatJson: { mode: "decimal", precision: 1, step: 0.1 },
    constraintsJson: { min: 0 },
    required: false,
    pattern: LENGTH_POLICY,
  },
];

function WateringProfilePlayground({ disabled = false }: { disabled?: boolean }) {
  const [values, setValues] = useState<Record<string, RegistryFieldInputValue>>(() =>
    Object.fromEntries(
      WATERING_DEMO_FIELDS.map(field => [
        field.fieldId,
        createDefaultFieldInput({
          fieldId: field.fieldId,
          valueType: field.valueType,
          unit: field.unit,
          fieldPatternKey: field.fieldPatternKey,
        }),
      ]),
    ),
  );

  const preview = useMemo(
    () =>
      WATERING_DEMO_FIELDS.map(field => ({
        fieldId: field.fieldId,
        input: values[field.fieldId],
      })),
    [values],
  );

  return (
    <div style={{ maxWidth: 520 }}>
      <UxRegistryProfileValuesForm
        fields={WATERING_DEMO_FIELDS}
        values={values}
        disabled={disabled}
        onChange={(fieldId, next) => setValues(prev => ({ ...prev, [fieldId]: next }))}
      />
      <pre
        style={{
          marginTop: 24,
          padding: 12,
          borderRadius: 8,
          background: "#f8fafc",
          fontSize: 12,
          overflow: "auto",
        }}
      >
        {JSON.stringify(preview, null, 2)}
      </pre>
    </div>
  );
}

const meta: Meta<typeof UxRegistryProfileValuesForm> = {
  title: "Registry/UxRegistryProfileValuesForm",
  component: UxRegistryProfileValuesForm,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof UxRegistryProfileValuesForm>;

export const WateringMiniProfile: Story = {
  name: "Mini profile — watering fields",
  render: () => <WateringProfilePlayground />,
};

export const WateringMiniProfileDisabled: Story = {
  name: "Mini profile — disabled",
  render: () => <WateringProfilePlayground disabled />,
};
