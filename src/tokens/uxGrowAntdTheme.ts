import type { ThemeConfig } from "antd";

import { techOrganicColors, techOrganicRadii, techOrganicTypography } from "./techOrganicTokens";
import { uxGrowFormControlComponents } from "./uxGrowFormControlTheme";

/** Ant Design theme aligned with Tech-Organic Precision prototypes. */
export const uxGrowAntdTheme: ThemeConfig = {
  token: {
    colorPrimary: techOrganicColors.primary,
    colorSuccess: techOrganicColors.primary,
    colorInfo: techOrganicColors.secondary,
    colorError: techOrganicColors.error,
    colorText: techOrganicColors.onSurface,
    colorTextSecondary: techOrganicColors.onSurfaceVariant,
    colorBgContainer: techOrganicColors.surfaceContainerLowest,
    colorBgLayout: techOrganicColors.background,
    colorBorder: techOrganicColors.outlineVariant,
    colorBorderSecondary: techOrganicColors.outlineVariant,
    borderRadius: techOrganicRadii.md,
    borderRadiusLG: techOrganicRadii.lg,
    fontFamily: techOrganicTypography.fontSans,
    fontSize: techOrganicTypography.bodyMd.fontSize,
    controlOutline: "rgba(0, 255, 157, 0.2)",
  },
  components: {
    Button: {
      primaryColor: techOrganicColors.secondaryFixed,
      colorPrimary: techOrganicColors.primaryContainer,
      colorPrimaryHover: "#00e38b",
      colorPrimaryActive: "#00cc8a",
      borderRadius: techOrganicRadii.pill,
      fontWeight: 700,
    },
    Card: {
      borderRadiusLG: techOrganicRadii.lg,
    },
    Tag: {
      borderRadiusSM: techOrganicRadii.sm,
    },
    ...uxGrowFormControlComponents,
  },
};
