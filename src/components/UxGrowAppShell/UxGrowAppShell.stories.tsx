import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { techOrganicColors, techOrganicSpacing } from "../../tokens";
import { UxMetricCard } from "../UxMetricCard";
import { UxPageHeader } from "../UxPageHeader";
import { UxQuickActionBar } from "../UxQuickActionBar";
import { UxGrowAppShell } from "./UxGrowAppShell";
import {
  UX_GROW_DEFAULT_BOTTOM_NAV,
  UX_GROW_DEFAULT_BRAND,
  UX_GROW_DEFAULT_FOOTER_NAV,
  UX_GROW_DEFAULT_MAIN_NAV,
} from "./growShellFixtures";
import { UX_GROW_NAV_KEYS } from "./types";

const meta: Meta<typeof UxGrowAppShell> = {
  title: "Grow/AppShell",
  component: UxGrowAppShell,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof UxGrowAppShell>;

function MetricsHubContent() {
  return (
    <>
      <UxPageHeader
        title="Доброе утро, Алексей"
        subtitle="3 активные метрики · 12 растений · 2 локации"
      />
      <UxQuickActionBar
        actions={[
          { key: "metric", label: "Добавить метрику", primary: true },
          { key: "plant", label: "Добавить растение" },
          { key: "location", label: "Описать локацию" },
          { key: "observation", label: "Записать наблюдение" },
        ]}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: techOrganicSpacing.lg,
        }}
      >
        <UxMetricCard
          title="Дача 2026"
          subtitle="2 локации · 8 растений"
          sparklineValues={[40, 55, 45, 70, 85, 60, 95]}
          overflowCount={5}
          avatars={[{ label: "T1" }, { label: "T2" }]}
          updatedAt="2ч назад"
        />
        <UxMetricCard
          title="Гроубокс дом"
          subtitle="1 локация · 4 растения"
          sparklineValues={[70, 60, 50, 55, 45, 40, 35]}
          sparklineColor={techOrganicColors.secondary}
          updatedAt="2ч назад"
        />
      </div>
    </>
  );
}

export const MetricsHubDesktop: Story = {
  render: () => {
    const [activeKey, setActiveKey] = useState<string>(UX_GROW_NAV_KEYS.metrics);

    return (
      <UxGrowAppShell
        activeKey={activeKey}
        brand={UX_GROW_DEFAULT_BRAND}
        mainNav={UX_GROW_DEFAULT_MAIN_NAV}
        footerNav={UX_GROW_DEFAULT_FOOTER_NAV}
        bottomNav={UX_GROW_DEFAULT_BOTTOM_NAV}
        onNavigate={key => setActiveKey(key)}
      >
        <MetricsHubContent />
      </UxGrowAppShell>
    );
  },
};

export const LocationDetailMobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => {
    const [activeKey, setActiveKey] = useState<string>(UX_GROW_NAV_KEYS.locations);

    return (
      <UxGrowAppShell
        activeKey={activeKey}
        brand={UX_GROW_DEFAULT_BRAND}
        mainNav={UX_GROW_DEFAULT_MAIN_NAV}
        footerNav={UX_GROW_DEFAULT_FOOTER_NAV}
        bottomNav={UX_GROW_DEFAULT_BOTTOM_NAV}
        mobileTitle="Гроубокс 120"
        mobileTopBarTrailing={<span style={{ opacity: 0.6 }}>🔔 ⚙️</span>}
        onNavigate={key => setActiveKey(key)}
      >
        <UxPageHeader title="Гроубокс 120" subtitle="4 места · 2 занято" />
      </UxGrowAppShell>
    );
  },
};

export const SidebarOnly: Story = {
  render: () => (
    <div style={{ minHeight: 400, background: techOrganicColors.background }}>
      <UxGrowAppShell
        activeKey={UX_GROW_NAV_KEYS.metrics}
        brand={UX_GROW_DEFAULT_BRAND}
        mainNav={UX_GROW_DEFAULT_MAIN_NAV}
        footerNav={UX_GROW_DEFAULT_FOOTER_NAV}
        bottomNav={UX_GROW_DEFAULT_BOTTOM_NAV}
        withTheme={false}
      >
        <p>Контент страницы</p>
      </UxGrowAppShell>
    </div>
  ),
};
