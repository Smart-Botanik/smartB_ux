import { useMemo, useState, type CSSProperties } from "react";

export type UxBrandOption = {
  id: string;
  name: string;
  subtitle?: string;
  avatarUrl?: string;
};

export type UxProductOption = {
  id: string;
  name: string;
  subtitle?: string;
  avatarUrl?: string;
};

export type UxProductsModalPresentationProps = {
  open: boolean;
  title: string;
  brands: UxBrandOption[];
  products: UxProductOption[];
  isBrandsLoading?: boolean;
  isProductsLoading?: boolean;
  canLoadMoreBrands?: boolean;
  canLoadMoreProducts?: boolean;
  onClose: () => void;
  onSearchChange?: (query: string) => void;
  onLoadMoreBrands?: () => void;
  onLoadMoreProducts?: () => void;
  onSelectBrand?: (brandId: string) => void;
  onSelectProduct?: (productId: string) => void;
};

export function UxProductsModalPresentation({
  open,
  title,
  brands,
  products,
  isBrandsLoading = false,
  isProductsLoading = false,
  canLoadMoreBrands = false,
  canLoadMoreProducts = false,
  onClose,
  onSearchChange,
  onLoadMoreBrands,
  onLoadMoreProducts,
  onSelectBrand,
  onSelectProduct
}: UxProductsModalPresentationProps) {
  const [query, setQuery] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState<string>();

  const selectedBrand = useMemo(
    () => brands.find(brand => brand.id === selectedBrandId),
    [brands, selectedBrandId]
  );

  if (!open) {
    return null;
  }

  const handleSearchChange = (value: string) => {
    setQuery(value);
    onSearchChange?.(value);
  };

  const goToBrands = () => {
    setSelectedBrandId(undefined);
  };

  const chooseBrand = (brandId: string) => {
    setSelectedBrandId(brandId);
    onSelectBrand?.(brandId);
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <div style={styles.titleWrap}>
            <h3 style={styles.title}>{title}</h3>
            <p style={styles.subtitle}>Breeders and Products list: pick a brand, then select product.</p>
          </div>
          <button onClick={onClose} style={styles.iconButton} aria-label="Close modal" title="Close">
            <CloseIcon />
          </button>
        </div>

        <div style={styles.controls}>
          <div style={styles.searchWrap}>
            <span style={styles.searchIcon}>
              <SearchIcon />
            </span>
            <input
              value={query}
              onChange={event => handleSearchChange(event.target.value)}
              placeholder="Search..."
              style={styles.input}
            />
          </div>
          {selectedBrand ? (
            <div style={styles.selectedBrandRow}>
              <span style={styles.selectedBrandLabel}>Selected brand:</span>
              <div style={styles.selectedBrandTag}>
                {selectedBrand.avatarUrl ? (
                  <img src={selectedBrand.avatarUrl} alt={selectedBrand.name} style={styles.avatarSm} />
                ) : (
                  <div style={styles.avatarSmStub} />
                )}
                <span>{selectedBrand.name}</span>
                <button
                  type="button"
                  style={styles.tagCloseButton}
                  aria-label="Clear selected brand"
                  title="Clear"
                  onClick={goToBrands}
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {selectedBrand ? <div style={styles.productListLabel}>Choose product:</div> : null}

        <div style={styles.list}>
          {!selectedBrand
            ? brands.map(brand => (
                <button key={brand.id} style={styles.listItem} onClick={() => chooseBrand(brand.id)}>
                  <div style={styles.listItemLeft}>
                    {brand.avatarUrl ? (
                      <img src={brand.avatarUrl} alt={brand.name} style={styles.avatar} />
                    ) : (
                      <div style={styles.avatarStub} />
                    )}
                    <div style={styles.listMeta}>
                      <strong>{brand.name}</strong>
                      {brand.subtitle ? <span>{brand.subtitle}</span> : null}
                    </div>
                  </div>
                </button>
              ))
            : products.map(product => (
                <button
                  key={product.id}
                  style={styles.listItem}
                  onClick={() => onSelectProduct?.(product.id)}
                >
                  <div style={styles.listItemLeft}>
                    {product.avatarUrl ? (
                      <img src={product.avatarUrl} alt={product.name} style={styles.avatar} />
                    ) : (
                      <div style={styles.avatarStub} />
                    )}
                    <div style={styles.listMeta}>
                      <strong>{product.name}</strong>
                      {product.subtitle ? <span>{product.subtitle}</span> : null}
                    </div>
                  </div>
                </button>
              ))}
        </div>

        <div style={styles.footer}>
          {!selectedBrand ? (
            <button
              style={styles.secondaryButton}
              onClick={onLoadMoreBrands}
              disabled={!canLoadMoreBrands || isBrandsLoading}
            >
              {isBrandsLoading ? "Loading..." : "Load more brands"}
            </button>
          ) : (
            <button
              style={styles.secondaryButton}
              onClick={onLoadMoreProducts}
              disabled={!canLoadMoreProducts || isProductsLoading}
            >
              {isProductsLoading ? "Loading..." : "Load more products"}
            </button>
          )}
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
    width: "min(760px, 100%)",
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
  controls: { display: "grid", gap: 10, marginBottom: 2 },
  searchWrap: {
    position: "relative",
    flex: 1
  },
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
  listItemLeft: { display: "flex", alignItems: "center", gap: 10 },
  listMeta: { display: "flex", flexDirection: "column", gap: 3, color: "#5a6785", fontSize: 12 },
  avatar: { width: 28, height: 28, borderRadius: 6, objectFit: "cover" },
  avatarSm: { width: 14, height: 14, borderRadius: 3, objectFit: "cover" },
  avatarStub: { width: 28, height: 28, borderRadius: 6, background: "#edf2ff" },
  selectedBrandRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    paddingLeft: 2
  },
  selectedBrandLabel: {
    fontSize: 12.5,
    color: "#4b5f89"
  },
  productListLabel: {
    fontSize: 12.5,
    color: "#4b5f89",
    paddingLeft: 2,
    marginTop: -2
  },
  selectedBrandTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    border: "1px solid #cddaf8",
    background: "#f4f8ff",
    color: "#2b3f69",
    borderRadius: 999,
    padding: "3px 6px 3px 6px",
    fontSize: 11.5,
    lineHeight: 1
  },
  tagCloseButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 16,
    borderRadius: 999,
    border: "1px solid #bcccf3",
    background: "#ffffff",
    color: "#4d638f",
    cursor: "pointer",
    padding: 0
  },
  avatarSmStub: {
    width: 14,
    height: 14,
    borderRadius: 4,
    background: "#dce8ff"
  },
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

