import { useMemo, useState, type CSSProperties } from "react";
import type { PlantPeriodPhase } from "@growing/contracts";

import {
  UxProductsModalPresentation,
  type UxBrandOption,
  type UxProductOption,
} from "./UxProductsModalPresentation";
import { UxPeriodField } from "./UxPeriodField";

type UxCreateBatchItem = {
  id: string;
  name: string;
  quantity: number;
  itemLabel: string;
  productLabel: string;
  potType: string;
  potSize: string;
  period: PlantPeriodPhase | "";
};

export type UxCreateBatchSubmitPayload = {
  batchName: string;
  items: Array<Omit<UxCreateBatchItem, "id">>;
};

export type UxCreateBatchProductsModalConfig = {
  title?: string;
  brands: UxBrandOption[];
  products: UxProductOption[];
  isBrandsLoading?: boolean;
  isProductsLoading?: boolean;
  canLoadMoreBrands?: boolean;
  canLoadMoreProducts?: boolean;
  onSearchChange?: (query: string) => void;
  onLoadMoreBrands?: () => void;
  onLoadMoreProducts?: () => void;
  onSelectBrand?: (brandId: string) => void;
};

export type UxCreateBatchModalProps = {
  open: boolean;
  title?: string;
  loading?: boolean;
  productsModal?: UxCreateBatchProductsModalConfig;
  initialBatchName?: string;
  initialItems?: Array<Omit<UxCreateBatchItem, "id">>;
  onClose: () => void;
  onSubmit?: (payload: UxCreateBatchSubmitPayload) => void;
};

type TModalLevel = "table" | "editor";

const createEmptyItem = (): UxCreateBatchItem => ({
  id: crypto.randomUUID(),
  name: "",
  quantity: 1,
  itemLabel: "",
  productLabel: "",
  potType: "",
  potSize: "",
  period: ""
});

const mapInitialItems = (
  initialItems?: Array<Omit<UxCreateBatchItem, "id">>
): Array<UxCreateBatchItem> => {
  if (!initialItems || initialItems.length === 0) {
    return [createEmptyItem()];
  }

  return initialItems.map(item => ({
    id: crypto.randomUUID(),
    name: item.name ?? "",
    quantity: Math.max(1, Number(item.quantity || 1)),
    itemLabel: item.itemLabel ?? "",
    productLabel: item.productLabel ?? "",
    potType: item.potType ?? "",
    potSize: item.potSize ?? "",
    period: item.period ?? ""
  }));
};

export function UxCreateBatchModal({
  open,
  title = "Create Plant Batch",
  loading = false,
  productsModal,
  initialBatchName = "",
  initialItems,
  onClose,
  onSubmit
}: UxCreateBatchModalProps) {
  const [batchName, setBatchName] = useState(initialBatchName);
  const [items, setItems] = useState<Array<UxCreateBatchItem>>(() => mapInitialItems(initialItems));
  const [error, setError] = useState<string>("");
  const [pickerItemId, setPickerItemId] = useState<string>();
  const [level, setLevel] = useState<TModalLevel>("table");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const totalPlants = useMemo(
    () => items.reduce((acc, item) => acc + Math.max(1, Number(item.quantity || 1)), 0),
    [items]
  );
  const editingItem = useMemo(
    () => items.find(item => item.id === editingItemId) ?? null,
    [items, editingItemId]
  );

  if (!open) {
    return null;
  }

  const updateItem = (id: string, next: Partial<UxCreateBatchItem>) => {
    setItems(prev => prev.map(item => (item.id === id ? { ...item, ...next } : item)));
    setError("");
  };

  const addRow = () => {
    const newItem = createEmptyItem();
    setItems(prev => [...prev, newItem]);
    setEditingItemId(newItem.id);
    setLevel("editor");
    setError("");
  };

  const removeGroup = (id: string) => {
    setItems(prev => {
      if (prev.length <= 1) {
        return [createEmptyItem()];
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const removeOne = (id: string) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id !== id) return item;
        return { ...item, quantity: Math.max(1, item.quantity - 1) };
      })
    );
  };

  const handleSubmit = () => {
    const normalizedBatchName = batchName.trim();
    const prepared = items.map(({ id, ...rest }) => ({
      ...rest,
      name: rest.name.trim(),
      quantity: Math.max(1, Number(rest.quantity || 1))
    }));

    if (normalizedBatchName.length < 2) {
      setError("Batch name is required (minimum 2 characters).");
      return;
    }

    if (prepared.some(item => item.name.length < 2)) {
      setError("Each row must contain a plant name with at least 2 characters.");
      return;
    }

    onSubmit?.({
      batchName: normalizedBatchName,
      items: prepared,
    });
  };

  const pickerOpen = Boolean(pickerItemId);

  return (
    <>
      <div style={styles.backdrop}>
        <div style={styles.modal} role="dialog" aria-modal="true" aria-label={title}>
          <div style={styles.header}>
            <div>
              <h3 style={styles.title}>{title}</h3>
              <p style={styles.subtitle}>
                {level === "table"
                  ? "Level 1: set batch name and configure plant groups table."
                  : "Level 2: edit plant group fields (without batch name)."}
              </p>
            </div>
            <button style={styles.closeButton} onClick={onClose} disabled={loading}>
              Close
            </button>
          </div>

          {level === "table" ? (
            <>
              <label style={styles.batchField}>
                <span style={styles.label}>Batch name *</span>
                <input
                  style={styles.input}
                  value={batchName}
                  disabled={loading}
                  onChange={event => {
                    setBatchName(event.target.value);
                    setError("");
                  }}
                  placeholder="e.g. Spring 2026 / Seed Co #1"
                />
              </label>

              <div style={styles.summaryBox}>
                <span>
                  Count: {items.length} | Total: {totalPlants}
                </span>
                <button style={styles.addInlineButton} disabled={loading} onClick={addRow}>
                  <PlusIcon />
                  Add new
                </button>
              </div>

              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Plant name</th>
                      <th style={styles.th}>Product</th>
                      <th style={styles.th}>Pot type</th>
                      <th style={styles.th}>Pot size</th>
                      <th style={styles.th}>Period</th>
                      <th style={styles.th}>Quantity (group)</th>
                      <th style={styles.th}>Item label (optional)</th>
                      <th style={styles.th}>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id}>
                        <td style={styles.td}>{item.name || "—"}</td>
                        <td style={styles.td}>{item.productLabel || "—"}</td>
                        <td style={styles.td}>{item.potType || "—"}</td>
                        <td style={styles.td}>{item.potSize || "—"}</td>
                        <td style={styles.td}>{item.period || "—"}</td>
                        <td style={styles.td}>{item.quantity}</td>
                        <td style={styles.td}>{item.itemLabel || "—"}</td>
                        <td style={styles.td}>
                          <button
                            style={styles.iconActionButton}
                            disabled={loading}
                            onClick={() => {
                              setEditingItemId(item.id);
                              setLevel("editor");
                            }}
                            aria-label="Edit group"
                            title="Edit group"
                          >
                            <EditIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div style={styles.editorTopBar}>
                <button
                  style={styles.ghostButton}
                  disabled={loading}
                  onClick={() => {
                    setLevel("table");
                    setEditingItemId(null);
                  }}
                >
                  Back to table
                </button>
                <span style={styles.editorCaption}>
                  {editingItem ? `Group editor: ${editingItem.name || "new group"}` : "Group editor"}
                </span>
              </div>

              {editingItem ? (
                <div style={styles.rowCard}>
                  <div style={styles.rowHeader}>
                    <strong>Group fields</strong>
                  </div>

                  <div style={styles.formLevels}>
                    <div style={styles.levelTwoCols}>
                      <label style={styles.field}>
                        <span style={styles.label}>Plant name *</span>
                        <input
                          style={styles.input}
                          value={editingItem.name}
                          disabled={loading}
                          onChange={event => updateItem(editingItem.id, { name: event.target.value })}
                          placeholder="e.g. OG Kush #1"
                        />
                      </label>

                      <label style={styles.field}>
                        <span style={styles.label}>Item label (optional)</span>
                        <input
                          style={styles.input}
                          value={editingItem.itemLabel}
                          disabled={loading}
                          onChange={event => updateItem(editingItem.id, { itemLabel: event.target.value })}
                          placeholder="e.g. Mothers / Test #1"
                        />
                      </label>
                    </div>

                    <div style={styles.levelOneCol}>
                      <div style={styles.field}>
                        <span style={styles.label}>Product</span>
                        <div style={styles.productPickerWrap}>
                          <span style={styles.productValue}>
                            {editingItem.productLabel.trim() ? editingItem.productLabel : "Not selected"}
                          </span>
                          <button
                            style={styles.secondaryButton}
                            type="button"
                            disabled={loading}
                            onClick={() => setPickerItemId(editingItem.id)}
                          >
                            Choose product
                          </button>
                        </div>
                      </div>
                    </div>

                    <div style={styles.levelTwoCols}>
                      <label style={styles.field}>
                        <span style={styles.label}>Pot type</span>
                        <input
                          style={styles.input}
                          value={editingItem.potType}
                          disabled={loading}
                          onChange={event => updateItem(editingItem.id, { potType: event.target.value })}
                          placeholder="Optional"
                        />
                      </label>

                      <label style={styles.field}>
                        <span style={styles.label}>Pot size (L)</span>
                        <input
                          style={styles.input}
                          value={editingItem.potSize}
                          disabled={loading}
                          onChange={event => updateItem(editingItem.id, { potSize: event.target.value })}
                          placeholder="Optional"
                        />
                      </label>
                    </div>

                    <div style={styles.levelOneCol}>
                      <label style={styles.field}>
                        <span style={styles.label}>Period</span>
                        <div style={styles.periodFieldWrap}>
                          <UxPeriodField
                          value={editingItem.period}
                          disabled={loading}
                          onChange={value =>
                            updateItem(editingItem.id, {
                              period: value
                            })
                          }
                          />
                        </div>
                      </label>
                    </div>
                  </div>

                  <div style={styles.quantitySection}>
                    <div style={styles.quantityRow}>
                      <label style={styles.quantityField}>
                        <span style={styles.label}>Quantity (group)</span>
                        <input
                          style={styles.input}
                          type="number"
                          min={1}
                          max={200}
                          value={editingItem.quantity}
                          disabled
                        />
                      </label>
                      <button
                        style={styles.ghostDangerButton}
                        disabled={editingItem.quantity <= 1 || loading}
                        onClick={() => removeOne(editingItem.id)}
                      >
                        Reduce quantity
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          )}

          {error ? <div style={styles.error}>{error}</div> : null}

          <div style={styles.footer}>
            <span style={styles.footerHint}>
              {level === "table"
                ? "Review groups and submit batch."
                : "Edit groups, then return to table to submit batch."}
            </span>
            <div style={styles.actionsRight}>
              {level === "editor" ? (
                <button
                  style={styles.ghostButton}
                  onClick={() => {
                    setLevel("table");
                    setEditingItemId(null);
                  }}
                  disabled={loading}
                >
                  Done editing
                </button>
              ) : (
                <button style={styles.ghostButton} onClick={onClose} disabled={loading}>
                  Cancel
                </button>
              )}
              <button style={styles.primaryButton} onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating..." : "Create batch"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {pickerOpen ? (
        <UxProductsModalPresentation
          open={pickerOpen}
          title={productsModal?.title ?? "Choose product"}
          brands={productsModal?.brands ?? []}
          products={productsModal?.products ?? []}
          isBrandsLoading={productsModal?.isBrandsLoading}
          isProductsLoading={productsModal?.isProductsLoading}
          canLoadMoreBrands={productsModal?.canLoadMoreBrands}
          canLoadMoreProducts={productsModal?.canLoadMoreProducts}
          onClose={() => setPickerItemId(undefined)}
          onSearchChange={productsModal?.onSearchChange}
          onLoadMoreBrands={productsModal?.onLoadMoreBrands}
          onLoadMoreProducts={productsModal?.onLoadMoreProducts}
          onSelectBrand={productsModal?.onSelectBrand}
          onSelectProduct={productId => {
            const selected = (productsModal?.products ?? []).find(product => product.id === productId);
            if (selected && pickerItemId) {
              updateItem(pickerItemId, { productLabel: selected.name });
            }
            setPickerItemId(undefined);
          }}
        />
      ) : null}
    </>
  );
}

const styles: Record<string, CSSProperties> = {
  backdrop: {
    position: "fixed",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(12, 16, 22, 0.55)",
    zIndex: 1000,
    padding: 20
  },
  modal: {
    width: "min(980px, 100%)",
    maxHeight: "92vh",
    overflow: "auto",
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
    borderRadius: 14,
    border: "1px solid #dce3f4",
    background: "#ffffff",
    boxShadow: "0 24px 90px rgba(14, 34, 71, 0.2)",
    padding: 20
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 12
  },
  title: {
    margin: 0,
    fontSize: 20
  },
  subtitle: {
    margin: "6px 0 0",
    color: "#5f6f90",
    fontSize: 14
  },
  closeButton: {
    borderRadius: 8,
    border: "1px solid #d6def1",
    background: "#fff",
    padding: "8px 12px",
    cursor: "pointer"
  },
  batchField: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 12
  },
  summaryBox: {
    border: "1px dashed #c9d5f3",
    borderRadius: 10,
    padding: "10px 12px",
    background: "#f7faff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    fontSize: 13.5,
    color: "#34508e"
  },
  tableWrap: {
    border: "1px solid #e2e8f8",
    borderRadius: 10,
    overflow: "auto",
    marginBottom: 6
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 860
  },
  th: {
    textAlign: "left",
    fontSize: 12,
    color: "#50607e",
    background: "#f6f9ff",
    borderBottom: "1px solid #e2e8f8",
    padding: "10px 10px"
  },
  td: {
    fontSize: 13,
    color: "#223457",
    borderBottom: "1px solid #eff3fc",
    padding: "10px 10px",
    verticalAlign: "middle"
  },
  iconActionButton: {
    border: "1px solid #d4deef",
    background: "#fff",
    borderRadius: 8,
    width: 30,
    height: 30,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#3f527c"
  },
  addInlineButton: {
    border: "1px solid #b9caf1",
    background: "#eef3ff",
    color: "#204295",
    borderRadius: 8,
    padding: "6px 10px",
    cursor: "pointer",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    gap: 6
  },
  editorTopBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8
  },
  editorCaption: {
    fontSize: 12.5,
    color: "#50607e"
  },
  rowsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  rowCard: {
    border: "1px solid #e2e8f8",
    borderRadius: 12,
    padding: 12
  },
  rowHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center"
  },
  rowActions: {
    display: "flex",
    gap: 8
  },
  formLevels: {
    display: "grid",
    gap: 12
  },
  levelTwoCols: {
    display: "grid",
    gap: 10,
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))"
  },
  levelOneCol: {
    display: "grid",
    gap: 10,
    gridTemplateColumns: "minmax(0, 1fr)"
  },
  quantitySection: {
    marginTop: 12,
    paddingTop: 10,
    borderTop: "1px dashed #dce4f6"
  },
  quantityField: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    maxWidth: 220
  },
  quantityRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: 8
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6
  },
  productPickerWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8
  },
  productValue: {
    minHeight: 20,
    fontSize: 13,
    color: "#4d5f83"
  },
  label: {
    fontSize: 12,
    color: "#50607e"
  },
  input: {
    border: "1px solid #d4deef",
    borderRadius: 8,
    padding: "8px 10px",
    fontSize: 14
  },
  periodFieldWrap: {
    border: "1px solid #d4deef",
    borderRadius: 8,
    padding: 8,
    background: "#fff"
  },
  error: {
    marginTop: 12,
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #ffc9c9",
    background: "#fff3f3",
    color: "#9c2f2f"
  },
  footer: {
    marginTop: 14,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10
  },
  actionsRight: {
    display: "flex",
    gap: 8
  },
  footerHint: {
    fontSize: 12.5,
    color: "#596b93"
  },
  primaryButton: {
    border: "1px solid #1f54dd",
    background: "#2264ff",
    color: "#fff",
    borderRadius: 9,
    padding: "9px 14px",
    cursor: "pointer",
    fontWeight: 600
  },
  secondaryButton: {
    border: "1px solid #b9caf1",
    background: "#eef3ff",
    color: "#204295",
    borderRadius: 9,
    padding: "9px 14px",
    cursor: "pointer",
    fontWeight: 600
  },
  ghostButton: {
    border: "1px solid #d4deef",
    background: "#fff",
    color: "#30496f",
    borderRadius: 9,
    padding: "8px 12px",
    cursor: "pointer"
  },
  ghostDangerButton: {
    border: "1px solid #f0c2c2",
    background: "#fff7f7",
    color: "#9f2f2f",
    borderRadius: 9,
    padding: "8px 12px",
    cursor: "pointer"
  }
};

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 4V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M4 10H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M4 14.8V16H5.2L14.9 6.3L13.7 5.1L4 14.8Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M12.9 5.9L14.1 7.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
