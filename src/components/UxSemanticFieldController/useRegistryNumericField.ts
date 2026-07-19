import { useMemo } from "react";
import type { TNumericFormatFields } from "@growing/contracts";
import {
  resolveAllowedUnits,
  resolveCanonicalUnit,
  resolveDefaultInputUnit,
} from "@growing/contracts";

import type { UxSemanticNumericFieldProps } from "./types";

export function useRegistryNumericField({
  unit,
  unitPolicy,
  format = {},
  unitValue,
}: Pick<UxSemanticNumericFieldProps, "unit" | "unitPolicy" | "format" | "unitValue">) {
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

  return {
    unitOptions,
    selectedUnit,
    showUnitSelector,
    step,
    precision,
    canonicalUnit,
  };
}

export function mergeNumericFormat(
  base: TNumericFormatFields,
  override?: TNumericFormatFields,
): TNumericFormatFields {
  return { ...base, ...override };
}
