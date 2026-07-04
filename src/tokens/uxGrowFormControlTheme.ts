import type { ThemeConfig } from "antd";

import { techOrganicColors, techOrganicRadii, techOrganicTypography } from "./techOrganicTokens";

const compactControlSizing = {
  fontSize: techOrganicTypography.bodySm.fontSize,
  lineHeight: techOrganicTypography.bodySm.lineHeight,
  controlHeight: 32,
  paddingBlock: 4,
  paddingInline: 11,
} as const;

const compactInputChrome = {
  ...compactControlSizing,
  colorTextPlaceholder: techOrganicColors.outline,
  activeBorderColor: techOrganicColors.primaryContainer,
  hoverBorderColor: techOrganicColors.primary,
  borderRadius: techOrganicRadii.md,
} as const;

/** Shared compact form controls for Grow UX (inputs, selects, labels). */
export const uxGrowFormControlComponents: NonNullable<ThemeConfig["components"]> = {
  Form: {
    itemMarginBottom: 12,
    labelFontSize: techOrganicTypography.labelSm.fontSize,
    labelColor: techOrganicColors.onSurfaceVariant,
    verticalLabelPadding: "0 0 4px",
  },
  Input: compactInputChrome,
  InputNumber: compactInputChrome,
  Select: {
    ...compactControlSizing,
    optionSelectedBg: techOrganicColors.surfaceContainerLow,
    borderRadius: techOrganicRadii.md,
  },
  Segmented: {
    controlHeight: 28,
  },
};
