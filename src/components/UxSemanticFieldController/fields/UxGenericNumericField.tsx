import { RegistryNumericFieldBase } from "../RegistryNumericFieldBase";
import type { UxSemanticNumericFieldProps } from "../types";

export function UxGenericNumericField(props: UxSemanticNumericFieldProps) {
  return (
    <RegistryNumericFieldBase
      {...props}
      semanticKind={props.semanticKind ?? "generic"}
      placeholder={props.placeholder ?? "value"}
    />
  );
}
