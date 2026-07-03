import type { CSSProperties, ReactNode } from "react";

import {
  techOrganicColors,
  techOrganicRadii,
  techOrganicSpacing,
  techOrganicTypography,
} from "../../tokens";
import type { UxGrowNavItem, UxGrowNavRenderLink, UxGrowShellBrand } from "./types";
import { UX_GROW_SHELL_LAYOUT } from "./types";

export type UxGlassSidebarProps = {
  brand: UxGrowShellBrand;
  mainNav: UxGrowNavItem[];
  footerNav?: UxGrowNavItem[];
  activeKey: string;
  onNavigate?: (key: string) => void;
  renderNavLink?: UxGrowNavRenderLink;
  style?: CSSProperties;
};

function defaultRenderLink(_item: UxGrowNavItem, children: ReactNode) {
  return children;
}

function NavButton({
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
  const isDanger = item.danger === true;

  const base: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: techOrganicSpacing.sm,
    width: "100%",
    padding: `${techOrganicSpacing.sm}px ${techOrganicSpacing.md}px`,
    borderRadius: techOrganicRadii.lg,
    border: "none",
    borderRight: active ? `2px solid ${techOrganicColors.primary}` : "2px solid transparent",
    background: active ? `${techOrganicColors.primary}1a` : "transparent",
    color: isDanger
      ? techOrganicColors.error
      : active
        ? techOrganicColors.primary
        : techOrganicColors.onSurfaceVariant,
    cursor: "pointer",
    textAlign: "left",
    fontFamily: techOrganicTypography.fontSans,
    fontSize: techOrganicTypography.bodyMd.fontSize,
    transition: "background 200ms ease, color 200ms ease",
  };

  const content = (
    <>
      {item.icon ? <span style={{ display: "flex", flexShrink: 0 }}>{item.icon}</span> : null}
      <span>{item.label}</span>
    </>
  );

  const handleClick = () => {
    item.onClick?.();
    onNavigate?.(item.key);
  };

  const node = item.href ? (
    <a href={item.href} style={{ ...base, textDecoration: "none" }} onClick={handleClick}>
      {content}
    </a>
  ) : (
    <button type="button" style={base} onClick={handleClick}>
      {content}
    </button>
  );

  return <>{renderNavLink(item, node)}</>;
}

export function UxGlassSidebar({
  brand,
  mainNav,
  footerNav = [],
  activeKey,
  onNavigate,
  renderNavLink = defaultRenderLink,
  style,
}: UxGlassSidebarProps) {
  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        width: UX_GROW_SHELL_LAYOUT.sidebarWidth,
        height: "100vh",
        padding: techOrganicSpacing.lg,
        background: techOrganicColors.surfaceContainerLow,
        borderRight: `1px solid ${techOrganicColors.outlineVariant}4d`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: techOrganicSpacing.sm,
          marginBottom: techOrganicSpacing.lg,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: techOrganicRadii.lg,
            background: techOrganicColors.primary,
            color: techOrganicColors.onPrimary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {brand.logo ?? "🌱"}
        </div>
        <div>
          <div
            style={{
              ...techOrganicTypography.headlineSm,
              fontFamily: techOrganicTypography.fontSans,
              color: techOrganicColors.primary,
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {brand.title}
          </div>
          {brand.tagline ? (
            <div
              style={{
                fontFamily: techOrganicTypography.fontMono,
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: `${techOrganicColors.secondary}99`,
                marginTop: 2,
              }}
            >
              {brand.tagline}
            </div>
          ) : null}
        </div>
      </div>

      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: techOrganicSpacing.xs }}>
        {mainNav.map(item => (
          <NavButton
            key={item.key}
            item={item}
            active={item.key === activeKey}
            onNavigate={onNavigate}
            renderNavLink={renderNavLink}
          />
        ))}
      </nav>

      {footerNav.length > 0 ? (
        <div
          style={{
            paddingTop: techOrganicSpacing.lg,
            marginTop: techOrganicSpacing.lg,
            borderTop: `1px solid ${techOrganicColors.outlineVariant}4d`,
            display: "flex",
            flexDirection: "column",
            gap: techOrganicSpacing.xs,
          }}
        >
          {footerNav.map(item => (
            <NavButton
              key={item.key}
              item={item}
              active={item.key === activeKey}
              onNavigate={onNavigate}
              renderNavLink={renderNavLink}
            />
          ))}
        </div>
      ) : null}
    </aside>
  );
}
