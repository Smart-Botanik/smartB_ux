import { useMemo, useState, type CSSProperties } from "react";

type UxCreateBatchItem = {
  id: string;
  name: string;
  quantity: number;
  batchLabel: string;
  productLabel: string;
  potType: string;
  potSize: string;
  period: string;
};

export type UxCreateBatchSubmitPayload = {
  items: Array<Omit<UxCreateBatchItem, "id">>;
};

export type UxCreateBatchModalProps = {
  open: boolean;
  title?: string;
  loading?: boolean;
  onClose: () => void;
  onSubmit?: (payload: UxCreateBatchSubmitPayload) => void;
};

const createEmptyItem = (): UxCreateBatchItem => ({
  id: crypto.randomUUID(),
  name: "",
  quantity: 1,
  batchLabel: "",
  productLabel: "",
  potType: "",
  potSize: "",
  period: ""
});

export function UxCreateBatchModal({
  open,
  title = "Create Plant Batch",
  loading = false,
  onClose,
  onSubmit
}: UxCreateBatchModalProps) {
  const [items, setItems] = useState<Array<UxCreateBatchItem>>([createEmptyItem()]);
  const [error, setError] = useState<string>("");

  const totalPlants = useMemo(
    () => items.reduce((acc, item) => acc + Math.max(1, Number(item.quantity || 1)), 0),
    [items]
  );

  if (!open) {
    return null;
  }

  const updateItem = (id: string, next: Partial<UxCreateBatchItem>) => {
    setItems(prev => prev.map(item => (item.id === id ? { ...item, ...next } : item)));
    setError("");
  };

  const addRow = () => {
    setItems(prev => [...prev, createEmptyItem()]);
  };

  const removeRow = (id: string) => {
    setItems(prev => (prev.length <= 1 ? prev : prev.filter(item => item.id !== id)));
  };

  const handleSubmit = () => {
    const prepared = items.map(({ id, ...rest }) => ({
      ...rest,
      name: rest.name.trim(),
      quantity: Math.max(1, Number(rest.quantity || 1))
    }));

    if (prepared.some(item => item.name.length < 2)) {
      setError("Each row must contain a plant name with at least 2 characters.");
      return;
    }

    onSubmit?.({ items: prepared });
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal} role="dialog" aria-modal="true" aria-label={title}>
        <div style={styles.header}>
          <div>
            <h3 style={styles.title}>{title}</h3>
            <p style={styles.subtitle}>Create one or many identical plants in a single action.</p>
          </div>
          <button style={styles.closeButton} onClick={onClose} disabled={loading}>
            Close
          </button>
        </div>

        <div style={styles.summaryBox}>
          <span>Total rows: {items.length}</span>
          <span>Total plants to create: {totalPlants}</span>
        </div>

        <div style={styles.rowsContainer}>
          {items.map((item, index) => (
            <div key={item.id} style={styles.rowCard}>
              <div style={styles.rowHeader}>
                <strong>Item {index + 1}</strong>
                <button
                  style={styles.ghostButton}
                  disabled={items.length === 1 || loading}
                  onClick={() => removeRow(item.id)}
                >
                  Remove
                </button>
              </div>

              <div style={styles.grid}>
                <label style={styles.field}>
                  <span style={styles.label}>Plant name *</span>
                  <input
                    style={styles.input}
                    value={item.name}
                    disabled={loading}
                    onChange={event => updateItem(item.id, { name: event.target.value })}
                    placeholder="e.g. OG Kush #1"
                  />
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>Quantity</span>
                  <input
                    style={styles.input}
                    type="number"
                    min={1}
                    max={100}
                    value={item.quantity}
                    disabled={loading}
                    onChange={event => updateItem(item.id, { quantity: Number(event.target.value) })}
                  />
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>Batch label</span>
                  <input
                    style={styles.input}
                    value={item.batchLabel}
                    disabled={loading}
                    onChange={event => updateItem(item.id, { batchLabel: event.target.value })}
                    placeholder="Optional"
                  />
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>Product label</span>
                  <input
                    style={styles.input}
                    value={item.productLabel}
                    disabled={loading}
                    onChange={event => updateItem(item.id, { productLabel: event.target.value })}
                    placeholder="Optional"
                  />
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>Pot type</span>
                  <input
                    style={styles.input}
                    value={item.potType}
                    disabled={loading}
                    onChange={event => updateItem(item.id, { potType: event.target.value })}
                    placeholder="Optional"
                  />
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>Pot size (L)</span>
                  <input
                    style={styles.input}
                    value={item.potSize}
                    disabled={loading}
                    onChange={event => updateItem(item.id, { potSize: event.target.value })}
                    placeholder="Optional"
                  />
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>Period</span>
                  <input
                    style={styles.input}
                    value={item.period}
                    disabled={loading}
                    onChange={event => updateItem(item.id, { period: event.target.value })}
                    placeholder="Optional"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>

        {error ? <div style={styles.error}>{error}</div> : null}

        <div style={styles.footer}>
          <button style={styles.secondaryButton} onClick={addRow} disabled={loading}>
            Add row
          </button>
          <div style={styles.actionsRight}>
            <button style={styles.ghostButton} onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button style={styles.primaryButton} onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating..." : "Create batch"}
            </button>
          </div>
        </div>
      </div>
    </div>
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
  summaryBox: {
    border: "1px dashed #c9d5f3",
    borderRadius: 10,
    padding: "10px 12px",
    background: "#f7faff",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 12,
    fontSize: 13,
    color: "#34508e"
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
  grid: {
    display: "grid",
    gap: 10,
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))"
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6
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
  }
};
