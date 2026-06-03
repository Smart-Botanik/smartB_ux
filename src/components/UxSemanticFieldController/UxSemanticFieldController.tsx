import type { RegistrySemanticKind } from "@growing/contracts";

import {
  UxConcentrationField,
  UxGenericNumericField,
  UxLengthField,
  UxPhField,
  UxTemperatureField,
} from "./fields";
import type { UxSemanticFieldControllerProps } from "./types";

function resolveSemanticKind(
  semanticKind?: string | null,
): RegistrySemanticKind | "generic" {
  switch (semanticKind) {
    case "ph":
    case "ppm":
    case "concentration":
    case "temperature":
    case "length":
    case "generic":
      return semanticKind;
    default:
      return "generic";
  }
}

export function UxSemanticFieldController(props: UxSemanticFieldControllerProps) {
  const kind = resolveSemanticKind(props.semanticKind);

  switch (kind) {
    case "ph":
      return <UxPhField {...props} />;
    case "ppm":
    case "concentration":
      return <UxConcentrationField {...props} />;
    case "temperature":
      return <UxTemperatureField {...props} />;
    case "length":
      return <UxLengthField {...props} />;
    case "generic":
    default:
      return <UxGenericNumericField {...props} />;
  }
}
