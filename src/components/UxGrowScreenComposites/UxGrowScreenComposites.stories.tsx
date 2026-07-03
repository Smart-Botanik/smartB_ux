import type { Meta, StoryObj } from "@storybook/react";

import { UxChartPanel } from "../UxChartPanel";
import { UxEventTimeline } from "../UxEventTimeline";
import { UxGrowThemeProvider } from "../UxGrowThemeProvider";
import { UxLocationCard } from "../UxLocationCard";
import { UxPlantStageSection } from "../UxPlantStageSection";
import { UxSeatGrid } from "../UxSeatGrid";
import { techOrganicColors, techOrganicSpacing } from "../../tokens";

const meta: Meta = {
  title: "Grow/ScreenComposites",
  decorators: [
    Story => (
      <UxGrowThemeProvider>
        <div
          style={{
            width: "min(1100px, 100vw)",
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

export const MetricDetailPreview: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: techOrganicSpacing.lg }}>
      <UxChartPanel
        title="Динамика сезона"
        values={[40, 55, 45, 70, 85, 60, 95, 88, 72]}
        series={[
          { key: "water", label: "Полив", color: "#3b82f6" },
          { key: "height", label: "Высота", color: techOrganicColors.primary },
          { key: "ph", label: "pH", color: "#059669" },
        ]}
        periods={[
          { key: "7d", label: "7Д" },
          { key: "30d", label: "30Д" },
          { key: "season", label: "СЕЗОН" },
        ]}
        activePeriodKey="7d"
        axisLabels={["ПН", "СР", "ПТ", "СЕГОДНЯ"]}
      />
      <UxEventTimeline
        title="Активность"
        maxHeight={320}
        items={[
          {
            id: "1",
            title: "Полив 1.2 л",
            subtitle: 'Томат "Бычье сердце", Грядка А',
            timestamp: "Сегодня, 08:30",
            featured: true,
          },
          {
            id: "2",
            title: "Замер pH: 6.2",
            subtitle: 'Огурцы "Кураж", Теплица',
            timestamp: "Вчера, 19:45",
          },
        ]}
      />
    </div>
  ),
};

export const LocationDetailPreview: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: techOrganicSpacing.xl }}>
      <UxEventTimeline
        title="История ухода"
        items={[
          {
            id: "1",
            title: "Полив с удобрениями",
            detail: "1.5л · pH 6.2 · 650 ppm",
            badge: "Simplex",
            timestamp: "Сегодня, 10:30",
            featured: true,
          },
          {
            id: "2",
            title: "Замер высоты",
            detail: "Средний рост: 45 см (+3 см за неделю)",
            timestamp: "Вчера, 18:15",
          },
        ]}
      />
      <UxSeatGrid
        title="Карта посадочных мест"
        columns={2}
        seats={[
          {
            id: "a1",
            label: "A1",
            state: "occupied",
            plantName: "Pineapple",
            stageLabel: "Вегетация",
          },
          {
            id: "a2",
            label: "A2",
            state: "occupied",
            plantName: "Skunk #1",
            stageLabel: "Цветение",
          },
          { id: "a3", label: "A3", state: "empty" },
          {
            id: "a4",
            label: "A4",
            state: "occupied",
            plantName: "Blueberry",
            stageLabel: "Вегетация",
          },
        ]}
      />
    </div>
  ),
};

export const MetricPlantsPreview: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: techOrganicSpacing.xl }}>
      <div style={{ display: "flex", gap: techOrganicSpacing.lg, overflowX: "auto", paddingBottom: techOrganicSpacing.sm }}>
        <UxLocationCard title="Грядка А" subtitle="Открытый грунт, южная сторона" plantCount={4} />
        <UxLocationCard
          title="Теплица"
          subtitle="Поликарбонат, авто-проветривание"
          plantCount={4}
          accent="secondary"
          icon="☀"
        />
      </div>

      <UxPlantStageSection
        stage="planned"
        title="Запланировано"
        count={2}
        items={[
          { id: "p1", name: 'Баклажан "Алмаз"', subtitle: "Теплица · ещё не в ячейке" },
          { id: "p2", name: 'Перец "Калифорнийское чудо"', subtitle: "Теплица · ещё не в ячейке" },
        ]}
      />
      <UxPlantStageSection
        stage="pool"
        title="На высадку"
        count={1}
        items={[{ id: "p3", name: "Lavender Kush (Auto)", subtitle: "Ожидается через 4 дня" }]}
      />
      <UxPlantStageSection
        stage="seated"
        title="Высажено"
        count={2}
        items={[
          { id: "p4", name: 'Томат "Бычье сердце"', subtitle: "Грядка А · A1" },
          { id: "p5", name: 'Огурец "Кураж"', subtitle: "Теплица · B2" },
        ]}
      />
    </div>
  ),
};
