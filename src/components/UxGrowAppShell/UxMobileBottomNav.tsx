import type { CSSProperties, ReactNode } from "react";

import {
  techOrganicColors,
  techOrganicShadows,
  techOrganicSpacing,
  techOrganicTypography,
} from "../../tokens";
import type { UxGrowNavItem, UxGrowNavRenderLink } from "./types";
import { UX_GROW_SHELL_LAYOUT } from "./types";

export type UxMobileBottomNavProps = {
  items: UxGrowNavItem[];
  activeKey: string;
  onNavigate?: (key: string) => void;
  renderNavLink?: UxGrowNavRenderLink;
  style?: CSSProperties;
};

function defaultRenderLink(item: UxGrowNavItem, children: ReactNode) {
  if (!item.href) {
    return children;
  }
  return (
    <a href={item.href} style={{ textDecoration: "none", color: "inherit" }}>
      {children}
    </a>
  );
}

function BottomNavSlot({
  item,
  active,
  onNavigate,
  renderNavLink,
}: {
  item: UxGrowNavItem;
  active: boolean;
  onNavigate?: (key: string) => void;
  renderNavLink: UxGrowNavRenderLink;
}) {
  const isFab = item.variant === "fab";

  const handleClick = () => {
    item.onClick?.();
    onNavigate?.(item.key);
  };

  if (isFab) {
    const fab = (
      <button
        type="button"
        onClick={handleClick}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: -32,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: techOrganicColors.primary,
            color: techOrganicColors.onPrimary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: techOrganicShadows.mintGlow,
          }}
        >
          {item.icon}
        </div>
        <span
          style={{
            fontFamily: techOrganicTypography.fontMono,
            fontSize: 10,
            letterSpacing: "0.05em",
            color: techOrganicColors.onSurfaceVariant,
            marginTop: techOrganicSpacing.unit,
          }}
        >
          {item.label}
        </span>
      </button>
    );
    return <>{renderNavLink(item, fab)}</>;
  }

  const slotStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: techOrganicSpacing.unit,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: `${techOrganicSpacing.xs}px ${techOrganicSpacing.sm}px`,
    color: active ? techOrganicColors.primary : techOrganicColors.onSurfaceVariant,
    fontWeight: active ? 700 : 400,
  };

  const slot = item.href ? (
    <span onClick={handleClick} style={slotStyle}>
      <span style={{ display: "flex", fontSize: 22 }}>{item.icon}</span>
      <span
        style={{
          fontFamily: techOrganicTypography.fontMono,
          fontSize: 10,
          letterSpacing: "0.05em",
        }}
      >
        {item.label}
      </span>
    </span>
  ) : (
    <button type="button" onClick={handleClick} style={slotStyle}>
      <span style={{ display: "flex", fontSize: 22 }}>{item.icon}</span>
      <span
        style={{
          fontFamily: techOrganicTypography.fontMono,
          fontSize: 10,
          letterSpacing: "0.05em",
        }}
      >
        {item.label}
      </span>
    </button>
  );

  return <>{renderNavLink(item, slot)}</>;
}

export function UxMobileBottomNav({
  items,
  activeKey,
  onNavigate,
  renderNavLink = defaultRenderLink,
  style,
}: UxMobileBottomNavProps) {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-around",
        height: UX_GROW_SHELL_LAYOUT.mobileBottomNavHeight,
        paddingInline: techOrganicSpacing.md,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        background: `${techOrganicColors.surfaceContainerLowest}e6`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: `1px solid ${techOrganicColors.outlineVariant}4d`,
        boxShadow: "0 -4px 16px rgba(0,0,0,0.05)",
        ...style,
      }}
    >
      {items.map(item => (
        <BottomNavSlot
          key={item.key}
          item={item}
          active={item.key === activeKey}
          onNavigate={onNavigate}
          renderNavLink={renderNavLink}
        />
      ))}
    </nav>
  );
}
