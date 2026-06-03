import { UxSemanticFieldController } from "../UxSemanticFieldController";
import type { UxRegistryFieldValueInputProps } from "../UxSemanticFieldController";

export type { UxRegistryFieldValueInputProps } from "../UxSemanticFieldController";

/** Thin wrapper — delegates to {@link UxSemanticFieldController}. */
export function UxRegistryFieldValueInput(props: UxRegistryFieldValueInputProps) {
  return <UxSemanticFieldController {...props} />;
}
