import type { CSSProperties, ReactNode } from "react";

/** Shared navigation item for grow app shell (sidebar + bottom bar). */
export type UxGrowNavItem = {
  key: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  /** Logout and other destructive footer actions. */
  danger?: boolean;
  /** Center FAB slot in mobile bottom nav. */
  variant?: "default" | "fab";
};

export type UxGrowShellBrand = {
  title: string;
  tagline?: string;
  logo?: ReactNode;
};

export type UxGrowNavRenderLink = (
  item: UxGrowNavItem,
  children: ReactNode,
) => ReactNode;

export const UX_GROW_SHELL_LAYOUT = {
  sidebarWidth: 280,
  mobileTopBarHeight: 64,
  mobileBottomNavHeight: 80,
  breakpointMd: 768,
  desktopMainPaddingTop: 48,
  desktopMainPaddingBottom: 48,
} as const;

export const UX_GROW_NAV_KEYS = {
  metrics: "metrics",
  locations: "locations",
  plants: "plants",
  calendar: "calendar",
  settings: "settings",
  logout: "logout",
  home: "home",
  profile: "profile",
  add: "add",
} as const;

export type UxGrowNavKey = (typeof UX_GROW_NAV_KEYS)[keyof typeof UX_GROW_NAV_KEYS];

export type UxGrowShellNavStyles = {
  item: CSSProperties;
  itemActive: CSSProperties;
  itemDanger: CSSProperties;
};
