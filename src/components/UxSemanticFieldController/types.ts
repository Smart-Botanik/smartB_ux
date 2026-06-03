import type {
  RegistryUnitPolicy,
  TNumericConstraintFields,
  TNumericFormatFields,
} from "@growing/contracts";

export type UxSemanticNumericFieldProps = {
  label: string;
  semanticKind?: string | null;
  unit?: string | null;
  unitPolicy?: RegistryUnitPolicy | null;
  format?: TNumericFormatFields;
  constraints?: TNumericConstraintFields;
  value?: number | null;
  unitValue?: string | null;
  onChange?: (next: { value?: number | null; unit?: string | null }) => void;
  disabled?: boolean;
  showMetaTags?: boolean;
  showAlerts?: boolean;
  placeholder?: string;
  size?: "small" | "middle" | "large";
};

/** @deprecated Prefer UxSemanticNumericFieldProps — kept for backward compatibility. */
export type UxRegistryFieldValueInputProps = UxSemanticNumericFieldProps;

export type UxSemanticFieldControllerProps = UxSemanticNumericFieldProps;
