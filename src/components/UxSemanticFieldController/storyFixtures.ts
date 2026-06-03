import type { RegistryUnitPolicy, TNumericConstraintFields, TNumericFormatFields } from "@growing/contracts";

import type { UxSemanticNumericFieldProps } from "./types";

export const PH_UNIT_POLICY: RegistryUnitPolicy = {
  canonicalUnit: "pH",
  allowedUnits: ["pH"],
  defaultInputUnit: "pH",
};

export const PPM_ONLY_POLICY: RegistryUnitPolicy = {
  canonicalUnit: "ppm",
  allowedUnits: ["ppm"],
  defaultInputUnit: "ppm",
};

export const PPM_EC_AMBIGUOUS_POLICY: RegistryUnitPolicy = {
  canonicalUnit: "ppm",
  allowedUnits: ["ppm", "ec"],
  defaultInputUnit: "ppm",
};

export const PPM_EC_WITH_PROFILE_POLICY: RegistryUnitPolicy = {
  ...PPM_EC_AMBIGUOUS_POLICY,
  conversionProfile: "tds.ec_ppm_500.v1",
};

export const TEMPERATURE_POLICY: RegistryUnitPolicy = {
  canonicalUnit: "C",
  allowedUnits: ["C", "F"],
  defaultInputUnit: "C",
  conversionProfile: "temperature_c_f",
};

export const LENGTH_POLICY: RegistryUnitPolicy = {
  canonicalUnit: "cm",
  allowedUnits: ["cm", "ft"],
  defaultInputUnit: "cm",
};

export const PH_FORMAT: TNumericFormatFields = {
  formatMode: "decimal",
  formatPrecision: 1,
  formatStep: 0.1,
};

export const PH_CONSTRAINTS: TNumericConstraintFields = {
  constraintMin: 0,
  constraintMax: 14,
};

export const PPM_FORMAT: TNumericFormatFields = {
  formatMode: "integer",
  formatStep: 1,
};

export const PPM_CONSTRAINTS: TNumericConstraintFields = {
  constraintMin: 0,
};

export const baseStoryArgs = (
  overrides: Partial<UxSemanticNumericFieldProps>,
): UxSemanticNumericFieldProps => ({
  label: "Field label",
  semanticKind: "generic",
  unit: null,
  unitPolicy: null,
  format: {},
  constraints: {},
  value: null,
  unitValue: null,
  disabled: false,
  showMetaTags: true,
  showAlerts: true,
  ...overrides,
});
