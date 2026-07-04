import type { CSSProperties } from "react";

export type UxMaterialSymbolProps = {
  /** Material Symbols Outlined glyph name (e.g. `add_chart`). */
  name: string;
  fill?: boolean;
  size?: number;
  style?: CSSProperties;
  className?: string;
};

/**
 * Renders a Material Symbols Outlined icon. The host app must load the font
 * (see grow app `index.html` + `.material-symbols-outlined` in global CSS).
 */
export function UxMaterialSymbol({
  name,
  fill = false,
  size = 18,
  style,
  className,
}: UxMaterialSymbolProps) {
  return (
    <span
      className={className ? `material-symbols-outlined ${className}` : "material-symbols-outlined"}
      aria-hidden
      style={{
        fontSize: size,
        lineHeight: 1,
        fontVariationSettings: fill ? "'FILL' 1" : undefined,
        ...style,
      }}
    >
      {name}
    </span>
  );
}
