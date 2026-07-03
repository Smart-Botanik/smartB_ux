import type { UxGrowNavItem, UxGrowShellBrand } from "./types";
import { UX_GROW_NAV_KEYS } from "./types";

export const UX_GROW_DEFAULT_BRAND: UxGrowShellBrand = {
  title: "Smart Botanik",
  tagline: "Precision Tech",
  logo: "🪴",
};

export const UX_GROW_DEFAULT_MAIN_NAV: UxGrowNavItem[] = [
  { key: UX_GROW_NAV_KEYS.metrics, label: "Метрики", icon: "📊" },
  { key: UX_GROW_NAV_KEYS.locations, label: "Локации", icon: "📍" },
  { key: UX_GROW_NAV_KEYS.plants, label: "Растения", icon: "🌿" },
  { key: UX_GROW_NAV_KEYS.calendar, label: "Календарь", icon: "📅" },
];

export const UX_GROW_DEFAULT_FOOTER_NAV: UxGrowNavItem[] = [
  { key: UX_GROW_NAV_KEYS.settings, label: "Настройки", icon: "⚙️" },
  { key: UX_GROW_NAV_KEYS.logout, label: "Выход", icon: "⎋", danger: true },
];

export const UX_GROW_DEFAULT_BOTTOM_NAV: UxGrowNavItem[] = [
  { key: UX_GROW_NAV_KEYS.home, label: "Главная", icon: "🏠" },
  { key: UX_GROW_NAV_KEYS.locations, label: "Локации", icon: "📍" },
  { key: UX_GROW_NAV_KEYS.add, label: "Добавить", icon: "+", variant: "fab" },
  { key: UX_GROW_NAV_KEYS.plants, label: "Растения", icon: "🌿" },
  { key: UX_GROW_NAV_KEYS.profile, label: "Профиль", icon: "👤" },
];
