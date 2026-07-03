/**
 * Tech-Organic Precision design tokens.
 * Source: prototypes/smart_botanik_app/tech_organic_precision/DESIGN.md
 */
export const techOrganicColors = {
  surface: "#f8f9ff",
  surfaceDim: "#cbdbf5",
  surfaceBright: "#f8f9ff",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#eff4ff",
  surfaceContainer: "#e5eeff",
  surfaceContainerHigh: "#dce9ff",
  surfaceContainerHighest: "#d3e4fe",
  onSurface: "#0b1c30",
  onSurfaceVariant: "#3b4a3f",
  inverseSurface: "#213145",
  inverseOnSurface: "#eaf1ff",
  outline: "#6a7b6e",
  outlineVariant: "#b9cbbc",
  surfaceTint: "#006d40",
  primary: "#006d40",
  onPrimary: "#ffffff",
  primaryContainer: "#00ff9d",
  onPrimaryContainer: "#007143",
  onPrimaryFixed: "#002110",
  inversePrimary: "#00e38b",
  secondary: "#2b6954",
  onSecondary: "#ffffff",
  secondaryContainer: "#adedd3",
  onSecondaryContainer: "#306d58",
  secondaryFixed: "#064e3b",
  tertiary: "#565e74",
  onTertiary: "#ffffff",
  tertiaryContainer: "#d7dff9",
  onTertiaryContainer: "#5a6279",
  error: "#ba1a1a",
  onError: "#ffffff",
  errorContainer: "#ffdad6",
  onErrorContainer: "#93000a",
  background: "#f8f9ff",
  onBackground: "#0b1c30",
  surfaceVariant: "#d3e4fe",
} as const;

export const techOrganicRadii = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 9999,
} as const;

export const techOrganicSpacing = {
  unit: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  gutter: 24,
  marginMobile: 16,
  marginDesktop: 64,
  containerMax: 1280,
} as const;

export const techOrganicTypography = {
  fontSans: '"Hanken Grotesk", system-ui, sans-serif',
  fontMono: '"JetBrains Mono", ui-monospace, monospace',
  headlineLg: { fontSize: 48, lineHeight: 56, fontWeight: 700, letterSpacing: "-0.02em" },
  headlineMd: { fontSize: 32, lineHeight: 40, fontWeight: 600, letterSpacing: "-0.01em" },
  headlineSm: { fontSize: 24, lineHeight: 32, fontWeight: 600 },
  bodyLg: { fontSize: 18, lineHeight: 28, fontWeight: 400 },
  bodyMd: { fontSize: 16, lineHeight: 24, fontWeight: 400 },
  bodySm: { fontSize: 14, lineHeight: 20, fontWeight: 400 },
  labelMd: { fontSize: 14, lineHeight: 20, fontWeight: 500, letterSpacing: "0.02em" },
  labelSm: { fontSize: 12, lineHeight: 16, fontWeight: 500, letterSpacing: "0.05em" },
  dataLg: { fontSize: 20, lineHeight: 24, fontWeight: 500 },
  dataSm: { fontSize: 14, lineHeight: 20, fontWeight: 400 },
} as const;

export const techOrganicShadows = {
  panel: "0 4px 12px rgba(0, 0, 0, 0.05)",
  mintGlow: "0 4px 15px rgba(0, 109, 64, 0.2)",
  floating: "0 8px 24px rgba(6, 78, 59, 0.04)",
} as const;

export const techOrganicTokens = {
  colors: techOrganicColors,
  radii: techOrganicRadii,
  spacing: techOrganicSpacing,
  typography: techOrganicTypography,
  shadows: techOrganicShadows,
} as const;
