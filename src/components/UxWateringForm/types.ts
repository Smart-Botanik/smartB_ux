import type { ReactNode } from "react";

import type { UxCreateBatchProductsModalConfig } from "../UxCreateBatchModal";
import type { UxSelectedProductCardProps } from "../UxSelectedProductCard";

export type UxWateringSolutionValue = {
  ph?: number;
  tds?: number;
  volume?: number;
};

export type UxWateringNutrientRow = {
  id: string;
  productId?: string;
  productName?: string;
  productSubtitle?: string;
  productAvatarUrl?: string;
  amount?: number;
  amountUnit?: string;
};

export type UxWateringFormValue = {
  solution: UxWateringSolutionValue;
  drainage: UxWateringSolutionValue;
  nutrients: UxWateringNutrientRow[];
};

export type UxWateringFormLabels = {
  solutionTitle: string;
  drainageTitle: string;
  nutrientsTitle: string;
  phPlaceholder: string;
  tdsPlaceholder: string;
  volumePlaceholder: string;
  addNutrient: string;
  amountPlaceholder: string;
  unitPlaceholder: string;
  removeNutrientAria: string;
};

export type UxWateringNutrientProductRenderArgs = {
  row: UxWateringNutrientRow;
  disabled: boolean;
  onOpenPicker: () => void;
  onClear: () => void;
};

export type UxWateringFormPresentationProps = {
  value: UxWateringFormValue;
  onChange: (value: UxWateringFormValue) => void;
  disabled?: boolean;
  labels?: Partial<UxWateringFormLabels>;
  /** Suffix for TDS inputs, e.g. "ppm". */
  tdsUnitLabel?: string;
  /** Suffix for volume inputs, e.g. "л". */
  volumeUnitLabel?: string;
  nutrientUnitOptions?: Array<{ value: string; label: string }>;
  productCardLabels?: UxSelectedProductCardProps["labels"];
  productsModal?: UxCreateBatchProductsModalConfig;
  /** Host override for nutrient product row (e.g. `ProductsBar.Item`). */
  renderNutrientProduct?: (args: UxWateringNutrientProductRenderArgs) => ReactNode;
};

export type UxWateringEventModalProps = {
  open: boolean;
  title?: string;
  subtitle?: string;
  loading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  value: UxWateringFormValue;
  onChange: (value: UxWateringFormValue) => void;
  onClose: () => void;
  onSubmit?: (value: UxWateringFormValue) => void;
  /** Optional slot above solution fields (tags, date, etc.). */
  headerSlot?: ReactNode;
  footerHint?: string;
} & Pick<
  UxWateringFormPresentationProps,
  | "labels"
  | "tdsUnitLabel"
  | "volumeUnitLabel"
  | "nutrientUnitOptions"
  | "productCardLabels"
  | "productsModal"
  | "renderNutrientProduct"
>;
