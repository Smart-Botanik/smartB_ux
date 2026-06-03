import type { TNumericConstraintFields, TNumericFormatFields } from "@growing/contracts";

import { RegistryNumericFieldBase } from "../RegistryNumericFieldBase";
import { mergeNumericFormat } from "../useRegistryNumericField";
import type { UxSemanticNumericFieldProps } from "../types";

const PH_FORMAT: TNumericFormatFields = {
  formatMode: "decimal",
  formatPrecision: 1,
  formatStep: 0.1,
};

const PH_CONSTRAINTS: TNumericConstraintFields = {
  constraintMin: 0,
  constraintMax: 14,
};

export function UxPhField(props: UxSemanticNumericFieldProps) {
  return (
    <RegistryNumericFieldBase
      {...props}
      semanticKind={props.semanticKind ?? "ph"}
      format={mergeNumericFormat(PH_FORMAT, props.format)}
      constraints={{ ...PH_CONSTRAINTS, ...props.constraints }}
      placeholder={props.placeholder ?? "pH 0.0–14.0"}
    />
  );
}
