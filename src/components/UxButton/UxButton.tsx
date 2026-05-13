import type {
  ButtonHTMLAttributes,
  CSSProperties,
  PropsWithChildren
} from "react";

type UxButtonVariant = "primary" | "secondary" | "ghost";

export type UxButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: UxButtonVariant;
  }
>;

const variantStyles: Record<UxButtonVariant, CSSProperties> = {
  primary: { background: "#2264ff", color: "#ffffff", border: "1px solid #2264ff" },
  secondary: { background: "#f3f6ff", color: "#1a3fb0", border: "1px solid #b8ccff" },
  ghost: { background: "transparent", color: "#1a3fb0", border: "1px dashed #b8ccff" }
};

export function UxButton({
  children,
  variant = "primary",
  style,
  ...props
}: UxButtonProps) {
  return (
    <button
      type="button"
      {...props}
      style={{
        padding: "10px 16px",
        borderRadius: 10,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 120ms ease",
        ...variantStyles[variant],
        ...style
      }}
    >
      {children}
    </button>
  );
}
