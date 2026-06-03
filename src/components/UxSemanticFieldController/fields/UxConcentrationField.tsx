import { Alert } from "antd";
import type { TNumericConstraintFields, TNumericFormatFields } from "@growing/contracts";

import { RegistryNumericFieldBase } from "../RegistryNumericFieldBase";
import { mergeNumericFormat } from "../useRegistryNumericField";
import type { UxSemanticNumericFieldProps } from "../types";

const PPM_FORMAT: TNumericFormatFields = {
  formatMode: "integer",
  formatStep: 1,
};

const PPM_CONSTRAINTS: TNumericConstraintFields = {
  constraintMin: 0,
};

export function UxConcentrationField(props: UxSemanticNumericFieldProps) {
  const isPpmKind = props.semanticKind === "ppm";
  const format = mergeNumericFormat(isPpmKind ? PPM_FORMAT : {}, props.format);
  const constraints = isPpmKind
    ? { ...PPM_CONSTRAINTS, ...props.constraints }
    : props.constraints;

  const placeholder =
    props.placeholder ??
    (props.unitValue === "ec" || props.unit === "ec" ? "EC, mS/cm" : "PPM, mg/L");

  return (
    <RegistryNumericFieldBase
      {...props}
      format={format}
      constraints={constraints}
      placeholder={placeholder}
      footer={
        props.showAlerts !== false ? (
          <Alert
            type="info"
            showIcon
            message="Концентрация раствора"
            description="Выберите единицу ввода. Сохранение — в canonical unit pattern; EC ↔ PPM только с conversionProfile."
          />
        ) : null
      }
    />
  );
}
