import { Alert } from "antd";

import { RegistryNumericFieldBase } from "../RegistryNumericFieldBase";
import { useRegistryNumericField } from "../useRegistryNumericField";
import type { UxSemanticNumericFieldProps } from "../types";

export function UxLengthField(props: UxSemanticNumericFieldProps) {
  const { unitOptions } = useRegistryNumericField({
    unit: props.unit,
    unitPolicy: props.unitPolicy,
    format: props.format,
    unitValue: props.unitValue,
  });

  const showLengthAlert = props.showAlerts !== false && unitOptions.length > 1;

  return (
    <RegistryNumericFieldBase
      {...props}
      semanticKind={props.semanticKind ?? "length"}
      placeholder={props.placeholder ?? "Длина"}
      footer={
        showLengthAlert ? (
          <Alert
            type="info"
            showIcon
            message="Единицы длины"
            description="Выберите единицу ввода; сохранение — в canonical unit из Field Pattern."
          />
        ) : null
      }
    />
  );
}
