import { useState, type CSSProperties } from "react";

import type { UxBrandOption } from "./UxProductsModalPresentation";

export type UxBrandsModalPresentationProps = {
  open: boolean;
  title: string;
  brands: UxBrandOption[];
  isLoading?: boolean;
  canLoadMore?: boolean;
  onClose: () => void;
  onSearchChange?: (query: string) => void;
  onLoadMore?: () => void;
  onSelectBrand?: (brandId: string) => void;
};

export function UxBrandsModalPresentation({
  open,
  title,
  brands,
  isLoading = false,
  canLoadMore = false,
  onClose,
  onSearchChange,
  onLoadMore,
  onSelectBrand
}: UxBrandsModalPresentationProps) {
  const [query, setQuery] = useState("");

  if (!open) {
    return null;
  }

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <div style={styles.titleWrap}>
            <h3 style={styles.title}>{title}</h3>
            <p style={styles.subtitle}>Breeders list with faster visual navigation.</p>
          </div>
          <button onClick={onClose} style={styles.iconButton} aria-label="Close modal" title="Close">
            <CloseIcon />
          </button>
        </div>

        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>
            <SearchIcon />
          </span>
          <input
            value={query}
            onChange={event => {
              setQuery(event.target.value);
              onSearchChange?.(event.target.value);
            }}
            placeholder="Search brand..."
            style={styles.input}
          />
        </div>

        <div style={styles.list}>
          {brands.map(brand => (
            <button key={brand.id} style={styles.listItem} onClick={() => onSelectBrand?.(brand.id)}>
              <div style={styles.itemLeft}>
                {brand.avatarUrl ? (
                  <img src={brand.avatarUrl} alt={brand.name} style={styles.avatar} />
                ) : (
                  <div style={styles.avatarStub} />
                )}
                <div style={styles.meta}>
                  <strong>{brand.name}</strong>
                  {brand.subtitle ? <span>{brand.subtitle}</span> : null}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div style={styles.footer}>
          <button style={styles.secondaryButton} onClick={onLoadMore} disabled={!canLoadMore || isLoading}>
            {isLoading ? "Loading..." : "Load more brands"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(10, 14, 23, 0.52)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1100,
    padding: 20
  },
  modal: {
    width: "min(720px, 100%)",
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
    borderRadius: 14,
    border: "1px solid #d9e2f5",
    background: "#fff",
    padding: 18,
    display: "grid",
    gap: 12
  },
  header: { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" },
  titleWrap: { display: "grid", gap: 8 },
  title: { margin: 0, fontSize: 21, color: "#172b59" },
  subtitle: { margin: 0, color: "#5f6d8b", fontSize: 13, paddingLeft: 2 },
  searchWrap: { position: "relative" },
  searchIcon: {
    position: "absolute",
    left: 10,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#6e80a8",
    pointerEvents: "none",
    display: "inline-flex"
  },
  input: {
    width: "100%",
    border: "1px solid #d4deef",
    borderRadius: 8,
    padding: "6px 10px 6px 34px",
    fontSize: 14,
    height: 36,
    boxSizing: "border-box"
  },
  list: { maxHeight: 360, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 },
  listItem: {
    border: "1px solid #e3e9f8",
    background: "#fff",
    borderRadius: 8,
    padding: "8px 10px",
    cursor: "pointer",
    textAlign: "left"
  },
  itemLeft: { display: "flex", alignItems: "center", gap: 10 },
  meta: { display: "flex", flexDirection: "column", gap: 3, color: "#5a6785", fontSize: 12 },
  avatar: { width: 28, height: 28, borderRadius: 6, objectFit: "cover" },
  avatarStub: { width: 28, height: 28, borderRadius: 6, background: "#edf2ff" },
  footer: { display: "flex", justifyContent: "space-between", marginTop: 12 },
  iconButton: {
    border: "1px solid #d4deef",
    background: "#fff",
    borderRadius: 10,
    width: 34,
    height: 34,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#3c4c71"
  },
  secondaryButton: {
    border: "1px solid #4c79fb",
    background: "linear-gradient(135deg, #4c79fb 0%, #5f93ff 100%)",
    color: "#ffffff",
    borderRadius: 8,
    padding: "9px 14px",
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 6px 18px rgba(58, 101, 230, 0.28)"
  }
};

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
    <path d="M13.8 13.8L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 5L15 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

