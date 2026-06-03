import type { Meta, StoryObj } from "@storybook/react";

import { SemanticFieldStoryPlayground } from "./SemanticFieldStoryPlayground";
import { UxSemanticFieldController } from "./UxSemanticFieldController";
import {
  baseStoryArgs,
  LENGTH_POLICY,
  PH_CONSTRAINTS,
  PH_FORMAT,
  PH_UNIT_POLICY,
  PPM_CONSTRAINTS,
  PPM_EC_AMBIGUOUS_POLICY,
  PPM_EC_WITH_PROFILE_POLICY,
  PPM_FORMAT,
  PPM_ONLY_POLICY,
  TEMPERATURE_POLICY,
} from "./storyFixtures";

const meta: Meta<typeof UxSemanticFieldController> = {
  title: "Registry/UxSemanticFieldController",
  component: UxSemanticFieldController,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof UxSemanticFieldController>;

export const PhDefault: Story = {
  render: () => (
    <SemanticFieldStoryPlayground
      {...baseStoryArgs({
        label: "Solution pH",
        semanticKind: "ph",
        unit: "pH",
        unitPolicy: PH_UNIT_POLICY,
        format: PH_FORMAT,
        constraints: PH_CONSTRAINTS,
        value: 6.2,
        unitValue: "pH",
      })}
    />
  ),
};

export const PhDisabled: Story = {
  render: () => (
    <SemanticFieldStoryPlayground
      {...baseStoryArgs({
        label: "Drainage pH",
        semanticKind: "ph",
        unit: "pH",
        unitPolicy: PH_UNIT_POLICY,
        format: PH_FORMAT,
        constraints: PH_CONSTRAINTS,
        value: 5.8,
        unitValue: "pH",
        disabled: true,
      })}
    />
  ),
};

export const PpmSingleUnit: Story = {
  render: () => (
    <SemanticFieldStoryPlayground
      {...baseStoryArgs({
        label: "Solution PPM",
        semanticKind: "ppm",
        unit: "ppm",
        unitPolicy: PPM_ONLY_POLICY,
        format: PPM_FORMAT,
        constraints: PPM_CONSTRAINTS,
        value: 840,
        unitValue: "ppm",
      })}
    />
  ),
};

export const PpmEcAmbiguousNoProfile: Story = {
  name: "PPM / EC — warning without conversionProfile",
  render: () => (
    <SemanticFieldStoryPlayground
      {...baseStoryArgs({
        label: "Solution concentration",
        semanticKind: "ppm",
        unit: "ppm",
        unitPolicy: PPM_EC_AMBIGUOUS_POLICY,
        format: PPM_FORMAT,
        constraints: PPM_CONSTRAINTS,
        value: 1.2,
        unitValue: "ec",
      })}
    />
  ),
};

export const PpmEcWithConversionProfile: Story = {
  name: "PPM / EC — with conversionProfile",
  render: () => (
    <SemanticFieldStoryPlayground
      {...baseStoryArgs({
        label: "Solution concentration",
        semanticKind: "concentration",
        unit: "ppm",
        unitPolicy: PPM_EC_WITH_PROFILE_POLICY,
        format: PPM_FORMAT,
        constraints: PPM_CONSTRAINTS,
        value: 600,
        unitValue: "ppm",
      })}
    />
  ),
};

export const TemperatureCF: Story = {
  render: () => (
    <SemanticFieldStoryPlayground
      {...baseStoryArgs({
        label: "Solution temperature",
        semanticKind: "temperature",
        unit: "C",
        unitPolicy: TEMPERATURE_POLICY,
        format: { formatMode: "decimal", formatPrecision: 1, formatStep: 0.1 },
        constraints: { constraintMin: -50, constraintMax: 120 },
        value: 22.5,
        unitValue: "C",
      })}
    />
  ),
};

export const LengthCmFt: Story = {
  render: () => (
    <SemanticFieldStoryPlayground
      {...baseStoryArgs({
        label: "Pot height",
        semanticKind: "length",
        unit: "cm",
        unitPolicy: LENGTH_POLICY,
        format: { formatMode: "decimal", formatPrecision: 1, formatStep: 0.1 },
        constraints: { constraintMin: 0 },
        value: 30,
        unitValue: "cm",
      })}
    />
  ),
};

export const GenericNumeric: Story = {
  render: () => (
    <SemanticFieldStoryPlayground
      {...baseStoryArgs({
        label: "Watts",
        semanticKind: "generic",
        unit: "W",
        unitPolicy: { canonicalUnit: "W", allowedUnits: ["W"], defaultInputUnit: "W" },
        format: { formatMode: "integer", formatStep: 1 },
        constraints: { constraintMin: 0 },
        value: 240,
        unitValue: "W",
      })}
    />
  ),
};

export const AdminPreviewMode: Story = {
  name: "Admin preview (no meta tags)",
  render: () => (
    <SemanticFieldStoryPlayground
      {...baseStoryArgs({
        label: "Solution pH",
        semanticKind: "ph",
        unit: "pH",
        unitPolicy: PH_UNIT_POLICY,
        format: PH_FORMAT,
        constraints: PH_CONSTRAINTS,
        value: 6.0,
        unitValue: "pH",
        showMetaTags: false,
      })}
    />
  ),
};

export const SemanticKindMatrix: Story = {
  name: "Matrix — all semantic kinds",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 24,
      }}
    >
      <SemanticFieldStoryPlayground
        {...baseStoryArgs({
          label: "pH",
          semanticKind: "ph",
          unit: "pH",
          unitPolicy: PH_UNIT_POLICY,
          format: PH_FORMAT,
          constraints: PH_CONSTRAINTS,
          value: 6.2,
          unitValue: "pH",
        })}
      />
      <SemanticFieldStoryPlayground
        {...baseStoryArgs({
          label: "PPM only",
          semanticKind: "ppm",
          unit: "ppm",
          unitPolicy: PPM_ONLY_POLICY,
          format: PPM_FORMAT,
          constraints: PPM_CONSTRAINTS,
          value: 720,
          unitValue: "ppm",
        })}
      />
      <SemanticFieldStoryPlayground
        {...baseStoryArgs({
          label: "PPM / EC",
          semanticKind: "ppm",
          unit: "ppm",
          unitPolicy: PPM_EC_WITH_PROFILE_POLICY,
          format: PPM_FORMAT,
          constraints: PPM_CONSTRAINTS,
          value: 1.4,
          unitValue: "ec",
        })}
      />
      <SemanticFieldStoryPlayground
        {...baseStoryArgs({
          label: "Temperature",
          semanticKind: "temperature",
          unit: "C",
          unitPolicy: TEMPERATURE_POLICY,
          format: { formatMode: "decimal", formatPrecision: 1, formatStep: 0.1 },
          value: 24,
          unitValue: "F",
        })}
      />
      <SemanticFieldStoryPlayground
        {...baseStoryArgs({
          label: "Length",
          semanticKind: "length",
          unit: "cm",
          unitPolicy: LENGTH_POLICY,
          format: { formatMode: "decimal", formatPrecision: 1, formatStep: 0.1 },
          value: 45,
          unitValue: "ft",
        })}
      />
      <SemanticFieldStoryPlayground
        {...baseStoryArgs({
          label: "Generic",
          semanticKind: "generic",
          unit: "W",
          unitPolicy: { canonicalUnit: "W", allowedUnits: ["W"], defaultInputUnit: "W" },
          format: { formatMode: "integer", formatStep: 1 },
          value: 120,
          unitValue: "W",
        })}
      />
    </div>
  ),
};
