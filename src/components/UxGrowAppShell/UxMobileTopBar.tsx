import type { CSSProperties, ReactNode } from "react";

import {
  techOrganicColors,
  techOrganicSpacing,
  techOrganicTypography,
} from "../../tokens";
import { UX_GROW_SHELL_LAYOUT } from "./types";

export type UxMobileTopBarProps = {
  title: string;
  trailing?: ReactNode;
  style?: CSSProperties;
};

export function UxMobileTopBar({ title, trailing, style }: UxMobileTopBarProps) {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: UX_GROW_SHELL_LAYOUT.mobileTopBarHeight,
        paddingInline: techOrganicSpacing.marginMobile,
        background: `${techOrganicColors.surface}e6`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid ${techOrganicColors.outlineVariant}4d`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        ...style,
      }}
    >
      <div
        style={{
          ...techOrganicTypography.headlineMd,
          fontFamily: techOrganicTypography.fontSans,
          fontSize: 20,
          fontWeight: 700,
          color: techOrganicColors.primary,
        }}
      >
        {title}
      </div>
      {trailing ? (
        <div style={{ display: "flex", alignItems: "center", gap: techOrganicSpacing.md }}>
          {trailing}
        </div>
      ) : null}
    </header>
  );
}
