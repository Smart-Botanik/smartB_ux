import { useMemo, useState, type CSSProperties } from "react";

export type UxPlantIconKind = "eggplant" | "tomato" | "cucumber";
export type UxPlantIconSize = "s" | "m" | "l";

export type UxPlantIconProps = {
  kind: UxPlantIconKind;
  size?: UxPlantIconSize;
  /** Accessible label. Pass an empty string only for decorative usage. */
  label?: string;
  className?: string;
  style?: CSSProperties;
};

type PlantIconMeta = {
  label: string;
  emoji: string;
  src: string;
  surface: string;
  border: string;
};

const TWEMOJI_BASE_URL = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.3/assets/svg";

const PLANT_ICON_META: Record<UxPlantIconKind, PlantIconMeta> = {
  eggplant: {
    label: "Eggplant",
    emoji: "🍆",
    src: `${TWEMOJI_BASE_URL}/1f346.svg`,
    surface: "#faf5ff",
    border: "#d8c2f2",
  },
  tomato: {
    label: "Tomato",
    emoji: "🍅",
    src: `${TWEMOJI_BASE_URL}/1f345.svg`,
    surface: "#fff5f4",
    border: "#f2c4bd",
  },
  cucumber: {
    label: "Cucumber",
    emoji: "🥒",
    src: `${TWEMOJI_BASE_URL}/1f952.svg`,
    surface: "#f3fbf2",
    border: "#b9dfb6",
  },
};

const SIZE_STYLES: Record<UxPlantIconSize, {
  box: number;
  image: number;
  padding: number;
  radius: number;
  fontSize: number;
}> = {
  s: { box: 32, image: 20, padding: 5, radius: 10, fontSize: 18 },
  m: { box: 44, image: 28, padding: 7, radius: 14, fontSize: 26 },
  l: { box: 60, image: 40, padding: 9, radius: 18, fontSize: 38 },
};

export function UxPlantIcon({
  kind,
  size = "m",
  label,
  className,
  style,
}: UxPlantIconProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const meta = PLANT_ICON_META[kind];
  const sizeStyle = SIZE_STYLES[size];
  const ariaLabel = label ?? meta.label;

  const shellStyle = useMemo<CSSProperties>(() => ({
    width: sizeStyle.box,
    height: sizeStyle.box,
    padding: sizeStyle.padding,
    borderRadius: sizeStyle.radius,
    border: `1px solid ${meta.border}`,
    background: meta.surface,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    overflow: "hidden",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.75), 0 2px 8px rgba(15, 23, 42, 0.08)",
    ...style,
  }), [meta.border, meta.surface, sizeStyle.box, sizeStyle.padding, sizeStyle.radius, style]);

  return (
    <span
      className={className}
      style={shellStyle}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel || undefined}
      aria-hidden={ariaLabel ? undefined : true}
    >
      {imageFailed ? (
        <span style={{ fontSize: sizeStyle.fontSize, lineHeight: 1 }} aria-hidden>
          {meta.emoji}
        </span>
      ) : (
        <img
          src={meta.src}
          alt=""
          width={sizeStyle.image}
          height={sizeStyle.image}
          loading="lazy"
          style={{ display: "block", width: sizeStyle.image, height: sizeStyle.image }}
          onError={() => setImageFailed(true)}
        />
      )}
    </span>
  );
}
