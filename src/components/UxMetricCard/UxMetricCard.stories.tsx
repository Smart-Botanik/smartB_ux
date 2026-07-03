import type { Meta, StoryObj } from "@storybook/react";

import { UxGrowThemeProvider } from "../UxGrowThemeProvider";
import { UxMetricCard } from "../UxMetricCard";
import { UxPageHeader } from "../UxPageHeader";
import { UxQuickActionBar } from "../UxQuickActionBar";
import { techOrganicColors, techOrganicSpacing } from "../../tokens";

const meta: Meta = {
  title: "Grow/MetricsHub",
  decorators: [
    Story => (
      <UxGrowThemeProvider>
        <div
          style={{
            width: "min(960px, 100vw)",
            padding: techOrganicSpacing.lg,
            background: techOrganicColors.background,
          }}
        >
          <Story />
        </div>
      </UxGrowThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const HubPreview: Story = {
  render: () => (
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
          avatars={[{ label: "P1" }, { label: "P2" }]}
          updatedAt="2ч назад"
        />
        <UxMetricCard
          variant="hero"
          title="Розовый #1"
          heroImageUrl="https://images.unsplash.com/photo-1466781783364-36c667e68334?w=400&h=300&fit=crop"
          heroBadge="Розовый #1"
          subtitle="0 локаций · 1 растение"
          sparklineValues={[20, 50, 80, 60]}
          updatedAt="2ч назад"
        />
      </div>
    </>
  ),
};
