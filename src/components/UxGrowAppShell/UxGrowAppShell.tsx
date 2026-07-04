import type { CSSProperties, ReactNode } from "react";

import { techOrganicColors, techOrganicSpacing } from "../../tokens";
import { UxGrowThemeProvider } from "../UxGrowThemeProvider";
import { UxGlassSidebar } from "./UxGlassSidebar";
import { UxMobileBottomNav } from "./UxMobileBottomNav";
import { UxMobileTopBar } from "./UxMobileTopBar";
import type { UxGrowNavItem, UxGrowNavRenderLink, UxGrowShellBrand } from "./types";
import { UX_GROW_SHELL_LAYOUT } from "./types";
import { useMinWidth } from "./useMinWidth";

export type UxGrowAppShellProps = {
  children: ReactNode;
  activeKey: string;
  brand: UxGrowShellBrand;
  mainNav: UxGrowNavItem[];
  footerNav?: UxGrowNavItem[];
  bottomNav: UxGrowNavItem[];
  /** Mobile top bar title; defaults to brand.title on hub screens. */
  mobileTitle?: string;
  mobileTopBarTrailing?: ReactNode;
  onNavigate?: (key: string) => void;
  onBrandClick?: () => void;
  renderNavLink?: UxGrowNavRenderLink;
  /** Wrap with grow antd theme (default true). */
  withTheme?: boolean;
  mainStyle?: CSSProperties;
  style?: CSSProperties;
};

export function UxGrowAppShell({
  children,
  activeKey,
  brand,
  mainNav,
  footerNav,
  bottomNav,
  mobileTitle,
  mobileTopBarTrailing,
  onNavigate,
  onBrandClick,
  renderNavLink,
  withTheme = true,
  mainStyle,
  style,
}: UxGrowAppShellProps) {
  const isDesktop = useMinWidth(UX_GROW_SHELL_LAYOUT.breakpointMd);

  const shell = (
    <div
      style={{
        display: "block",
        position: "relative",
        width: "100%",
        background: techOrganicColors.background,
        color: techOrganicColors.onSurface,
        ...style,
      }}
    >
      {isDesktop ? (
        <UxGlassSidebar
          brand={brand}
          mainNav={mainNav}
          footerNav={footerNav}
          activeKey={activeKey}
          onNavigate={onNavigate}
          onBrandClick={onBrandClick}
          renderNavLink={renderNavLink}
        />
      ) : (
        <>
          <UxMobileTopBar
            title={mobileTitle ?? brand.title}
            trailing={mobileTopBarTrailing}
          />
          <UxMobileBottomNav
            items={bottomNav}
            activeKey={activeKey}
            onNavigate={onNavigate}
            renderNavLink={renderNavLink}
          />
        </>
      )}

      <main
        style={{
          display: "block",
          boxSizing: "border-box",
          minWidth: 0,
          minHeight: 0,
          flex: "none",
          marginLeft: isDesktop ? UX_GROW_SHELL_LAYOUT.sidebarWidth : 0,
          width: isDesktop
            ? `calc(100% - ${UX_GROW_SHELL_LAYOUT.sidebarWidth}px)`
            : "100%",
          maxWidth: isDesktop ? techOrganicSpacing.containerMax : undefined,
          paddingTop: isDesktop
            ? UX_GROW_SHELL_LAYOUT.desktopMainPaddingTop
            : UX_GROW_SHELL_LAYOUT.mobileTopBarHeight + techOrganicSpacing.md,
          paddingBottom: isDesktop
            ? UX_GROW_SHELL_LAYOUT.desktopMainPaddingBottom
            : UX_GROW_SHELL_LAYOUT.mobileBottomNavHeight + techOrganicSpacing.md,
          paddingInline: isDesktop
            ? techOrganicSpacing.marginDesktop
            : techOrganicSpacing.marginMobile,
          ...mainStyle,
        }}
      >
        {children}
      </main>
    </div>
  );

  if (!withTheme) {
    return shell;
  }

  return <UxGrowThemeProvider>{shell}</UxGrowThemeProvider>;
}
