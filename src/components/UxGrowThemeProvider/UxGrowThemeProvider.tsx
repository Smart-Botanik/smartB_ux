import { ConfigProvider } from "antd";
import { createContext, useContext, type PropsWithChildren } from "react";

import { techOrganicColors, techOrganicTypography } from "../../tokens";
import { uxGrowAntdTheme } from "../../tokens/uxGrowAntdTheme";

export type UxGrowAppearance = "default" | "grow";

type UxGrowThemeContextValue = {
  appearance: UxGrowAppearance;
};

const UxGrowThemeContext = createContext<UxGrowThemeContextValue>({
  appearance: "default",
});

export function useUxGrowTheme(): UxGrowThemeContextValue {
  return useContext(UxGrowThemeContext);
}

export type UxGrowThemeProviderProps = PropsWithChildren<{
  /** When true, applies Tech-Organic antd theme and grow typography context. */
  enabled?: boolean;
}>;

export function UxGrowThemeProvider({
  children,
  enabled = true,
}: UxGrowThemeProviderProps) {
  const appearance: UxGrowAppearance = enabled ? "grow" : "default";

  const content = (
    <UxGrowThemeContext.Provider value={{ appearance }}>
      <div
        style={{
          fontFamily: enabled ? techOrganicTypography.fontSans : undefined,
          color: enabled ? techOrganicColors.onSurface : undefined,
        }}
      >
        {children}
      </div>
    </UxGrowThemeContext.Provider>
  );

  if (!enabled) {
    return content;
  }

  return <ConfigProvider theme={uxGrowAntdTheme}>{content}</ConfigProvider>;
}
