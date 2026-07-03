import type { CSSProperties, ReactNode } from "react";

import { techOrganicSpacing } from "../../tokens";
import { UxQuickActionPill } from "../UxQuickActionPill";

export type UxQuickActionItem = {
  key: string;
  label: string;
  icon?: ReactNode;
  primary?: boolean;
  onClick?: () => void;
};

export type UxQuickActionBarProps = {
  actions: UxQuickActionItem[];
  style?: CSSProperties;
};

export function UxQuickActionBar({ actions, style }: UxQuickActionBarProps) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: techOrganicSpacing.sm,
        marginBottom: techOrganicSpacing.lg,
        ...style,
      }}
    >
      {actions.map(action => (
        <UxQuickActionPill
          key={action.key}
          icon={action.icon}
          primary={action.primary}
          onClick={action.onClick}
        >
          {action.label}
        </UxQuickActionPill>
      ))}
    </div>
  );
}
