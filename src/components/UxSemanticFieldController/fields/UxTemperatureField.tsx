import { Alert } from "antd";

import { RegistryNumericFieldBase } from "../RegistryNumericFieldBase";
import { useRegistryNumericField } from "../useRegistryNumericField";
import type { UxSemanticNumericFieldProps } from "../types";

export function UxTemperatureField(props: UxSemanticNumericFieldProps) {
  const { unitOptions } = useRegistryNumericField({
    unit: props.unit,
    unitPolicy: props.unitPolicy,
    format: props.format,
    unitValue: props.unitValue,
  });

  const showTempAlert =
    props.showAlerts !== false &&
    unitOptions.length > 1 &&
    (unitOptions.includes("C") || unitOptions.includes("F"));

  return (
    <RegistryNumericFieldBase
      {...props}
      semanticKind={props.semanticKind ?? "temperature"}
      placeholder={props.placeholder ?? "Температура"}
      footer={
        showTempAlert ? (
          <Alert
            type="info"
            showIcon
            message="C ↔ F"
            description="Детерминированная конверсия при вводе; storage — в canonical unit pattern."
          />
        ) : null
      }
    />
  );
}
