import { useMemo, type CSSProperties } from "react";
import { ShoppingOutlined, SwapOutlined } from "@ant-design/icons";
import { Tag } from "antd";

export type UxSelectedProductCardProps = {
  /** Product display name (from catalog). */
  name: string;
  subtitle?: string;
  /** ContentTag labels (crop / variant chips). */
  contentLabels?: string[];
  avatarUrl?: string;
  disabled?: boolean;
  /** Dense layout for forms (smaller type, avatars, CTAs). */
  size?: "default" | "compact";
  /** Opens product picker. */
  onChoose: () => void;
  /** When set, shows clear control for the current selection. */
  onClear?: () => void;
  /** Copy overrides for embedding in different locales. */
  labels?: {
    emptyTitle?: string;
    emptyHint?: string;
    choose?: string;
    change?: string;
    clearAria?: string;
  };
};

const defaultLabels = {
  emptyTitle: "No product selected",
  emptyHint: "Pick a seed or product from your catalog.",
  choose: "Choose product",
  change: "Change",
  clearAria: "Clear product"
};

export function UxSelectedProductCard({
  name,
  subtitle,
  contentLabels,
  avatarUrl,
  disabled = false,
  size = "default",
  onChoose,
  onClear,
  labels: labelsProp
}: UxSelectedProductCardProps) {
  const labels = useMemo(() => ({ ...defaultLabels, ...labelsProp }), [labelsProp]);
  const trimmed = name.trim();
  const hasProduct = Boolean(trimmed);
  const c = size === "compact";
  const labelChips = useMemo(
    () => (contentLabels ?? []).map(item => item.trim()).filter(Boolean),
    [contentLabels],
  );

  const emptyCardSx = { ...styles.emptyCard, ...(c ? styles.emptyCardCompact : {}) };
  const emptyIconWrapSx = { ...styles.emptyIconWrap, ...(c ? styles.emptyIconWrapCompact : {}) };
  const emptyTitleSx = { ...styles.emptyTitle, ...(c ? styles.emptyTitleCompact : {}) };
  const emptyHintSx = { ...styles.emptyHint, ...(c ? styles.emptyHintCompact : {}) };
  const emptyCtaSx = { ...styles.emptyCta, ...(c ? styles.emptyCtaCompact : {}) };
  const selectedCardSx = { ...styles.selectedCard, ...(c ? styles.selectedCardCompact : {}) };
  const selectedMainSx = { ...styles.selectedMain, ...(c ? styles.selectedMainCompact : {}) };
  const avatarSx = { ...styles.avatar, ...(c ? styles.avatarCompact : {}) };
  const avatarStubSx = { ...styles.avatarStub, ...(c ? styles.avatarStubCompact : {}) };
  const productNameSx = { ...styles.productName, ...(c ? styles.productNameCompact : {}) };
  const subtitleSx = { ...styles.subtitle, ...(c ? styles.subtitleCompact : {}) };
  const iconGhostSx = { ...styles.iconGhost, ...(c ? styles.iconGhostCompact : {}) };
  const actionsRowSx = { ...styles.actionsRow, ...(c ? styles.actionsRowCompact : {}) };
  const changeButtonSx = { ...styles.changeButton, ...(c ? styles.changeButtonCompact : {}) };

  const emptyIconSize = c ? 17 : 22;
  const stubIconSize = c ? 16 : 20;
  const ctaIconSize = c ? 11 : 13;

  if (!hasProduct) {
    return (
      <div style={styles.shell}>
        <button
          type="button"
          style={{
            ...emptyCardSx,
            ...(disabled ? { opacity: 0.55, cursor: "not-allowed" } : {})
          }}
          disabled={disabled}
          onClick={onChoose}
        >
          <div style={emptyIconWrapSx}>
            <ShoppingOutlined style={{ fontSize: emptyIconSize, color: "#6b7fb3" }} />
          </div>
          <div style={styles.emptyTextBlock}>
            <span style={emptyTitleSx}>{labels.emptyTitle}</span>
            <span style={emptyHintSx}>{labels.emptyHint}</span>
          </div>
          <span style={emptyCtaSx}>
            <SwapOutlined style={{ fontSize: ctaIconSize }} />
            {labels.choose}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div style={styles.shell}>
      <div style={selectedCardSx}>
        <div style={selectedMainSx}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="" style={avatarSx} />
          ) : (
            <div style={avatarStubSx} aria-hidden>
              <ShoppingOutlined style={{ fontSize: stubIconSize, color: "#7a8cba" }} />
            </div>
          )}
          <div style={styles.textBlock}>
            <div style={styles.nameRow}>
              <span style={productNameSx}>{trimmed}</span>
              {onClear ? (
                <button
                  type="button"
                  style={iconGhostSx}
                  disabled={disabled}
                  onClick={onClear}
                  aria-label={labels.clearAria}
                  title={labels.clearAria}
                >
                  ×
                </button>
              ) : null}
            </div>
            {subtitle?.trim() ? <span style={subtitleSx}>{subtitle.trim()}</span> : null}
            {labelChips.length > 0 ? (
              <div style={styles.labelsRow}>
                {labelChips.map(label => (
                  <Tag key={label} style={styles.labelTag}>
                    {label}
                  </Tag>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div style={actionsRowSx}>
          <button
            type="button"
            style={{
              ...changeButtonSx,
              ...(disabled ? { opacity: 0.55, cursor: "not-allowed" } : {})
            }}
            disabled={disabled}
            onClick={onChoose}
          >
            <SwapOutlined style={{ fontSize: ctaIconSize }} />
            {labels.change}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  shell: {
    width: "100%"
  },
  emptyCard: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: 10,
    padding: "14px 16px",
    borderRadius: 12,
    border: "2px dashed #c5d2ef",
    background: "linear-gradient(180deg, #f8faff 0%, #ffffff 55%)",
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease"
  },
  emptyIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "#eef3ff",
    border: "1px solid #dce6fb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  emptyTextBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 4
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#1f3566"
  },
  emptyHint: {
    fontSize: 13,
    color: "#5a6b90",
    lineHeight: 1.45
  },
  emptyCta: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 2,
    padding: "8px 12px",
    borderRadius: 9,
    border: "1px solid #b9caf1",
    background: "linear-gradient(135deg, #eef3ff 0%, #ffffff 100%)",
    color: "#204295",
    fontSize: 13,
    fontWeight: 600
  },
  emptyCardCompact: {
    gap: 8,
    padding: "10px 12px",
    borderRadius: 10
  },
  emptyIconWrapCompact: {
    width: 36,
    height: 36,
    borderRadius: 10
  },
  emptyTitleCompact: {
    fontSize: 13
  },
  emptyHintCompact: {
    fontSize: 12,
    lineHeight: 1.4
  },
  emptyCtaCompact: {
    gap: 6,
    padding: "5px 10px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600
  },
  selectedCard: {
    borderRadius: 12,
    border: "1px solid #c9d8f5",
    background: "linear-gradient(145deg, #fbfcff 0%, #ffffff 42%, #f7f9ff 100%)",
    boxShadow: "0 4px 18px rgba(36, 72, 140, 0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
    padding: "12px 14px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    boxSizing: "border-box"
  },
  selectedCardCompact: {
    borderRadius: 10,
    padding: "9px 11px",
    gap: 8,
    boxShadow: "0 2px 12px rgba(36, 72, 140, 0.07), inset 0 1px 0 rgba(255,255,255,0.9)"
  },
  selectedMain: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    minWidth: 0
  },
  selectedMainCompact: {
    gap: 10
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    objectFit: "cover",
    flexShrink: 0,
    border: "1px solid #dbe5fb",
    boxShadow: "0 2px 8px rgba(30, 60, 120, 0.12)"
  },
  avatarCompact: {
    width: 36,
    height: 36,
    borderRadius: 10,
    boxShadow: "0 1px 6px rgba(30, 60, 120, 0.1)"
  },
  avatarStub: {
    width: 48,
    height: 48,
    borderRadius: 12,
    flexShrink: 0,
    border: "1px solid #dbe5fb",
    background: "linear-gradient(160deg, #eef3ff, #ffffff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85)"
  },
  avatarStubCompact: {
    width: 36,
    height: 36,
    borderRadius: 10
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 4
  },
  nameRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
    minWidth: 0
  },
  productName: {
    fontSize: 16,
    fontWeight: 600,
    color: "#14254a",
    lineHeight: 1.3,
    wordBreak: "break-word"
  },
  productNameCompact: {
    fontSize: 14
  },
  subtitle: {
    fontSize: 12.5,
    color: "#5a6b90",
    fontWeight: 500
  },
  subtitleCompact: {
    fontSize: 11.5
  },
  labelsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 2
  },
  labelTag: {
    margin: 0,
    borderRadius: 6,
    fontSize: 11,
    lineHeight: "18px",
    padding: "0 6px",
    border: "1px solid #d4e0f8",
    background: "#f3f7ff",
    color: "#2a4578"
  },
  iconGhost: {
    flexShrink: 0,
    width: 28,
    height: 28,
    borderRadius: 8,
    border: "1px solid #dce4f5",
    background: "#fff",
    color: "#5a6b90",
    cursor: "pointer",
    fontSize: 18,
    lineHeight: 1,
    padding: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  },
  iconGhostCompact: {
    width: 24,
    height: 24,
    borderRadius: 7,
    fontSize: 16
  },
  actionsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8
  },
  actionsRowCompact: {
    gap: 6
  },
  changeButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "7px 12px",
    borderRadius: 9,
    border: "1px solid #b9caf1",
    background: "#fff",
    color: "#204295",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit"
  },
  changeButtonCompact: {
    gap: 6,
    padding: "5px 10px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600
  }
};
