import { useEffect, useMemo, useState, type ReactNode } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { PlantPeriodPhase, PlantPotType } from "@growing/contracts";

import {
  UxProductsModalPresentation,
  type UxBrandOption,
  type UxProductOption,
} from "./UxProductsModalPresentation";
import { UxPeriodField } from "./UxPeriodField";
import { UxSelectedProductCard, type UxSelectedProductCardProps } from "./UxSelectedProductCard";
import type { UxPlantBatchTableColumnLabels } from "./UxPlantBatchTableColumns";
import {
  uxPlantBatchAvatarColumn,
  uxPlantBatchNameWithLabelColumn,
  uxPlantBatchPeriodColumn,
  uxPlantBatchPotColumn,
  uxPlantBatchProductColumn,
  uxPlantBatchQuantityColumn,
} from "./UxPlantBatchTableColumns";
import { UxPlantBatchGroupsTableEmpty } from "./UxPlantBatchGroupsTableEmpty";
import { UX_PLANT_BATCH_TABLE_STYLES } from "./UxPlantBatchTableStyles";

export type UxCreateBatchItem = {
  id: string;
  name: string;
  quantity: number;
  itemLabel: string;
  /** Catalog product id when chosen from picker (optional for legacy / story data). */
  productId: string;
  productLabel: string;
  productAvatarUrl: string;
  productSubtitle: string;
  potType: PlantPotType | "";
  potSize: string;
  period: PlantPeriodPhase | "";
  /** When editing an existing batch: backend plant id for this row (quantity locked to 1). */
  sourcePlantId?: string;
};

/** Host app can render the chosen product (e.g. `ProductsBar.Item` in the main frontend). */
export type UxCreateBatchRenderSelectedProductArgs = {
  productId: string;
  name: string;
  subtitle?: string;
  avatarUrl?: string;
  loading: boolean;
  /** True when the modal uses dense form controls; host can match sizing. */
  compact?: boolean;
  onOpenPicker: () => void;
  onClear: () => void;
};

export type UxCreateBatchSubmitPayload = {
  batchName: string;
  /** Set when optional diary selector is shown and user picks a diary. */
  diaryId?: string;
  items: Array<Omit<UxCreateBatchItem, "id">>;
};

export type UxCreateBatchDiarySelectConfig = {
  label: string;
  placeholderOption: string;
  options: Array<{ value: string; label: string }>;
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

/** Passed to `confirmRemoveGroup` before a table row is removed (draft-only; no API). */
export type UxCreateBatchRemoveGroupContext = {
  name: string;
  quantity: number;
  productLabel: string;
  itemLabel: string;
  /** True when removing the only row — table becomes empty (placeholder). */
  isLastGroup: boolean;
};

export type UxCreateBatchGroupsTableEmptyCopy = {
  title: string;
  description: string;
  addButton: string;
  submitErrorWhenEmpty: string;
};

export type UxCreateBatchModalProps = {
  open: boolean;
  title?: string;
  loading?: boolean;
  productsModal?: UxCreateBatchProductsModalConfig;
  /** Optional diary binding (e.g. Nest `diaryId` on batch / plants). */
  diarySelect?: UxCreateBatchDiarySelectConfig;
  /** Copy for the default selected-product card (e.g. Russian in the main app). */
  productCardLabels?: UxSelectedProductCardProps["labels"];
  /**
   * When set, used for the **selected** product row in the group editor instead of the built-in card.
   * Empty state still uses `UxSelectedProductCard` + `productCardLabels`.
   */
  renderSelectedProduct?: (args: UxCreateBatchRenderSelectedProductArgs) => ReactNode;
  /**
   * Host app confirmation before removing a group from the batch table (e.g. Ant Design `Modal.confirm`).
   * Return `false` to cancel. Omit to remove immediately.
   */
  confirmRemoveGroup?: (ctx: UxCreateBatchRemoveGroupContext) => boolean | Promise<boolean>;
  initialBatchName?: string;
  initialItems?: Array<Omit<UxCreateBatchItem, "id">>;
  /** When `open` is true, form re-syncs from initial props whenever this key changes (e.g. batch id or `"create"`). */
  formResetKey?: string;
  /** `edit`: group quantity is fixed to 1 for rows with `sourcePlantId`. */
  mode?: "create" | "edit";
  /** Prefills the diary selector when `diarySelect` is set. */
  initialDiaryId?: string;
  /**
   * When the modal opens in **edit** mode, jump to the group editor for a newly appended empty row
   * (add plants to an existing batch). Ignored in create mode.
   */
  focusNewGroupOnOpen?: boolean;
  /**
   * When the modal opens in **edit** mode, open the group editor for the row tied to this backend plant id.
   */
  initialEditorSourcePlantId?: string | null;
  /** Primary action label on the table step (defaults by `mode`). */
  submitButtonLabel?: string;
  /** Subtitle under the modal title on the groups table step. */
  modalSubtitleTable?: string;
  /** Subtitle under the modal title on the single-group editor step. */
  modalSubtitleEditor?: string;
  /** Left hint in the footer on the table step. */
  tableStepFooterHint?: string;
  /** Left hint in the footer on the group editor step. */
  groupEditorFooterHint?: string;
  /** Returns from the group editor to the groups table (not the primary submit). */
  groupEditorBackButtonLabel?: string;
  /** Column titles for the groups table (defaults to English; host can pass Russian). */
  groupTableLabels?: Partial<
    UxPlantBatchTableColumnLabels & { colPot: string; colActions: string }
  >;
  /** Copy for the empty groups table placeholder + submit guard when there are zero rows. */
  groupsTableEmptyCopy?: Partial<UxCreateBatchGroupsTableEmptyCopy>;
  onClose: () => void;
  onSubmit?: (payload: UxCreateBatchSubmitPayload) => void;
};

type TModalLevel = "table" | "editor";

const PLANT_NAME_MIN_LENGTH = 2;

function isValidPlantName(name: string): boolean {
  return name.trim().length >= PLANT_NAME_MIN_LENGTH;
}

const PLANT_POT_OPTIONS: Array<{ value: PlantPotType; label: string }> = [
  { value: "growBag", label: "Grow bag" },
  { value: "airPot", label: "Air pot" },
  { value: "standart", label: "Standard" },
  { value: "plastic", label: "Plastic" },
];

function normalizePlantPotType(raw: string | undefined): PlantPotType | "" {
  const v = (raw ?? "").trim();
  if (v === "growBag" || v === "airPot" || v === "standart" || v === "plastic") {
    return v;
  }
  return "";
}

function plantPotTypeLabel(value: PlantPotType | ""): string {
  if (!value) {
    return "—";
  }
  return PLANT_POT_OPTIONS.find(o => o.value === value)?.label ?? value;
}

function formatPotTableCell(potType: PlantPotType | "", potSize: string): string {
  const t = plantPotTypeLabel(potType);
  const s = potSize.trim();
  const right = s || "—";
  if (t === "—" && right === "—") {
    return "—";
  }
  return `${t} / ${right}`;
}

const createEmptyItem = (): UxCreateBatchItem => ({
  id: crypto.randomUUID(),
  name: "",
  quantity: 1,
  itemLabel: "",
  productId: "",
  productLabel: "",
  productAvatarUrl: "",
  productSubtitle: "",
  potType: "",
  potSize: "",
  period: "",
});

const DEFAULT_GROUPS_TABLE_EMPTY: UxCreateBatchGroupsTableEmptyCopy = {
  title: "No plant groups yet",
  description:
    "Add a group to define products, pots, periods, and how many plants belong to this batch.",
  addButton: "Add new",
  submitErrorWhenEmpty: "Add at least one plant group before submitting.",
};

const mapInitialItems = (
  initialItems?: Array<Omit<UxCreateBatchItem, "id">>
): Array<UxCreateBatchItem> => {
  if (!initialItems || initialItems.length === 0) {
    return [];
  }

  return initialItems.map(item => ({
    id: crypto.randomUUID(),
    name: item.name ?? "",
    quantity: Math.max(1, Number(item.quantity || 1)),
    itemLabel: item.itemLabel ?? "",
    productId: item.productId ?? "",
    productLabel: item.productLabel ?? "",
    productAvatarUrl: item.productAvatarUrl ?? "",
    productSubtitle: item.productSubtitle ?? "",
    potType: normalizePlantPotType(item.potType as string),
    potSize: item.potSize ?? "",
    period: item.period ?? "",
    ...(item.sourcePlantId ? { sourcePlantId: item.sourcePlantId } : {}),
  }));
};

export function UxCreateBatchModal({
  open,
  title = "Create Plant Batch",
  loading = false,
  productsModal,
  diarySelect,
  productCardLabels,
  renderSelectedProduct,
  confirmRemoveGroup,
  initialBatchName = "",
  initialItems,
  formResetKey = "default",
  mode = "create",
  initialDiaryId = "",
  focusNewGroupOnOpen = false,
  initialEditorSourcePlantId = null,
  submitButtonLabel,
  modalSubtitleTable,
  modalSubtitleEditor,
  tableStepFooterHint,
  groupEditorFooterHint,
  groupEditorBackButtonLabel,
  groupTableLabels: groupTableLabelsProp,
  groupsTableEmptyCopy: groupsTableEmptyCopyProp,
  onClose,
  onSubmit,
}: UxCreateBatchModalProps) {
  const [batchName, setBatchName] = useState("");
  const [items, setItems] = useState<Array<UxCreateBatchItem>>(() => []);
  const [diaryValue, setDiaryValue] = useState("");
  const [error, setError] = useState<string>("");
  const [pickerItemId, setPickerItemId] = useState<string>();
  const [level, setLevel] = useState<TModalLevel>("table");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [plantNameEditorTouched, setPlantNameEditorTouched] = useState(false);

  const primarySubmitLabel =
    submitButtonLabel ?? (mode === "edit" ? "Save batch" : "Create batch");

  const resolvedModalSubtitle =
    level === "table"
      ? (modalSubtitleTable ?? "Set batch name and configure plant groups table.")
      : (modalSubtitleEditor ?? "Edit plant group fields (without batch name).");

  const resolvedTableFooterHint =
    tableStepFooterHint ?? "Review groups and submit batch.";

  const resolvedEditorFooterHint =
    groupEditorFooterHint ??
    (mode === "create"
      ? "Fill in the group, then return to the table and create the batch."
      : "Save changes to this group and return to the batch table.");

  const resolvedEditorBackLabel =
    groupEditorBackButtonLabel ?? (mode === "create" ? "Back to groups" : "Done editing");

  const gl: UxPlantBatchTableColumnLabels & { colPot: string; colActions: string } = {
    colProduct: "Product",
    colName: "Plant name",
    colPeriod: "Period",
    colQuantity: "Qty",
    periodNotSelected: "Not selected",
    colPot: "Pot",
    colActions: "Actions",
    ...groupTableLabelsProp,
  };

  const groupsTableEmpty = useMemo(
    () => ({ ...DEFAULT_GROUPS_TABLE_EMPTY, ...groupsTableEmptyCopyProp }),
    [groupsTableEmptyCopyProp],
  );

  useEffect(() => {
    if (!open) {
      return;
    }
    setBatchName(initialBatchName ?? "");
    setDiaryValue(diarySelect ? (initialDiaryId ?? "") : "");
    setError("");
    setPlantNameEditorTouched(false);

    const base = mapInitialItems(initialItems);

    if (mode === "edit" && initialEditorSourcePlantId) {
      const row = base.find(i => i.sourcePlantId === initialEditorSourcePlantId);
      if (row) {
        setItems(base);
        setLevel("editor");
        setEditingItemId(row.id);
        return;
      }
    }

    if (mode === "edit" && focusNewGroupOnOpen) {
      const onlyDraft =
        base.length === 1 &&
        !base[0].sourcePlantId &&
        !String(base[0].name ?? "").trim();
      if (onlyDraft) {
        setItems(base);
        setLevel("editor");
        setEditingItemId(base[0].id);
        return;
      }
      const newItem = createEmptyItem();
      setItems([...base, newItem]);
      setLevel("editor");
      setEditingItemId(newItem.id);
      return;
    }

    setItems(base);
    setLevel("table");
    setEditingItemId(null);
  }, [
    open,
    formResetKey,
    diarySelect,
    initialBatchName,
    initialDiaryId,
    initialItems,
    mode,
    focusNewGroupOnOpen,
    initialEditorSourcePlantId,
  ]);

  useEffect(() => {
    setPlantNameEditorTouched(false);
  }, [editingItemId]);

  useEffect(() => {
    if (!open) {
      setPickerItemId(undefined);
    }
  }, [open]);

  /** Escape: product picker → group editor → close batch modal (Ant `keyboard` off so layers stack). */
  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") {
        return;
      }

      if (pickerItemId) {
        e.preventDefault();
        e.stopPropagation();
        setPickerItemId(undefined);
        return;
      }

      if (level === "editor") {
        e.preventDefault();
        e.stopPropagation();
        setLevel("table");
        setEditingItemId(null);
        return;
      }

      if (!loading) {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [open, loading, onClose, pickerItemId, level]);

  const totalPlants = useMemo(
    () => items.reduce((acc, item) => acc + Math.max(1, Number(item.quantity || 1)), 0),
    [items]
  );
  const editingItem = useMemo(
    () => items.find(item => item.id === editingItemId) ?? null,
    [items, editingItemId]
  );

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
        return [];
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const deleteGroupRow = async (id: string) => {
    const row = items.find(item => item.id === id);
    if (!row) {
      return;
    }

    const isLastGroup = items.length <= 1;

    if (confirmRemoveGroup) {
      try {
        const ok = await confirmRemoveGroup({
          name: row.name,
          quantity: Math.max(1, Number(row.quantity || 1)),
          productLabel: row.productLabel,
          itemLabel: row.itemLabel,
          isLastGroup,
        });
        if (!ok) {
          return;
        }
      } catch {
        return;
      }
    }

    if (editingItemId === id) {
      setEditingItemId(null);
      setLevel("table");
    }
    removeGroup(id);
    setError("");
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
    const prepared = items.map(({ id, ...rest }) => {
      const q =
        mode === "edit" && rest.sourcePlantId
          ? 1
          : Math.max(1, Number(rest.quantity || 1));
      return {
        ...rest,
        name: rest.name.trim(),
        quantity: q,
      };
    });

    if (normalizedBatchName.length < 2) {
      setError("Batch name is required (minimum 2 characters).");
      return;
    }

    if (prepared.length === 0) {
      setError(groupsTableEmpty.submitErrorWhenEmpty);
      return;
    }

    if (prepared.some(item => !isValidPlantName(item.name))) {
      setError(`Each row must contain a plant name with at least ${PLANT_NAME_MIN_LENGTH} characters.`);
      return;
    }

    const diaryId = diarySelect && diaryValue.trim() ? diaryValue.trim() : undefined;

    onSubmit?.({
      batchName: normalizedBatchName,
      ...(diaryId ? { diaryId } : {}),
      items: prepared,
    });
  };

  const pickerOpen = Boolean(pickerItemId);

  const columns: ColumnsType<UxCreateBatchItem> = [
    uxPlantBatchAvatarColumn<UxCreateBatchItem>({
      getSrc: item => item.productAvatarUrl?.trim() || undefined,
      getInitialLetter: item => item.name?.trim() || "?",
    }),
    uxPlantBatchProductColumn<UxCreateBatchItem>({ colProduct: gl.colProduct }),
    uxPlantBatchNameWithLabelColumn<UxCreateBatchItem>({ colName: gl.colName }),
    uxPlantBatchPotColumn<UxCreateBatchItem>({ colPot: gl.colPot }, item =>
      formatPotTableCell(item.potType, item.potSize),
    ),
    uxPlantBatchPeriodColumn<UxCreateBatchItem>(
      { colPeriod: gl.colPeriod, periodNotSelected: gl.periodNotSelected },
      { tagFontSize: 10 },
    ),
    uxPlantBatchQuantityColumn<UxCreateBatchItem>({ colQuantity: gl.colQuantity }),
    {
      title: gl.colActions,
      key: "actions",
      width: 56,
      render: (_, item) => (
        <Space size={0}>
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            disabled={loading}
            aria-label="Edit group"
            title="Edit group"
            onClick={() => {
              setEditingItemId(item.id);
              setLevel("editor");
            }}
          />
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            disabled={loading}
            aria-label="Delete group from batch"
            title="Delete group"
            onClick={() => {
              void deleteGroupRow(item.id);
            }}
          />
        </Space>
      ),
    },
  ];

  const modalFooter =
    level === "editor" ? (
      <Flex justify="space-between" align="center" gap={16} wrap="wrap">
        <Typography.Text type="secondary">{resolvedEditorFooterHint}</Typography.Text>
        <Button
          type="primary"
          size="small"
          disabled={loading}
          onClick={() => {
            setPlantNameEditorTouched(true);
            const current = items.find(item => item.id === editingItemId);
            if (!current || !isValidPlantName(current.name)) {
              return;
            }
            setLevel("table");
            setEditingItemId(null);
          }}
        >
          {resolvedEditorBackLabel}
        </Button>
      </Flex>
    ) : (
      <Flex justify="space-between" align="center" gap={16} wrap="wrap">
        <Typography.Text type="secondary">{resolvedTableFooterHint}</Typography.Text>
        <Space size="small">
          <Button size="small" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={handleSubmit}
            disabled={loading}
            loading={loading}
          >
            {primarySubmitLabel}
          </Button>
        </Space>
      </Flex>
    );

  const modalFooterWithSeparator = (
    <Flex vertical gap={0} style={{ width: "100%" }}>
      <Divider style={{ margin: 0 }} />
      <div style={{ paddingTop: 12 }}>{modalFooter}</div>
    </Flex>
  );

  return (
    <>
      <Modal
        open={open}
        title={
          <Flex vertical gap={4}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              {title}
            </Typography.Title>
            <Typography.Text type="secondary">{resolvedModalSubtitle}</Typography.Text>
          </Flex>
        }
        onCancel={onClose}
        footer={modalFooterWithSeparator}
        width={720}
        centered
        keyboard={false}
        maskClosable={!loading}
        destroyOnClose
        styles={{ body: { paddingTop: 8 } }}
      >
        {level === "table" ? (
          <>
            <Flex vertical gap={4} style={{ marginBottom: 10 }}>
              <Typography.Text style={{ fontSize: 12 }}>Batch name *</Typography.Text>
              <Input
                size="small"
                value={batchName}
                disabled={loading}
                onChange={e => {
                  setBatchName(e.target.value);
                  setError("");
                }}
                placeholder="e.g. Spring 2026 / Seed Co #1"
              />
            </Flex>

            {diarySelect ? (
              <Flex vertical gap={4} style={{ marginBottom: 10 }}>
                <Typography.Text style={{ fontSize: 12 }}>{diarySelect.label}</Typography.Text>
                <Select
                  size="small"
                  allowClear
                  placeholder={diarySelect.placeholderOption}
                  value={diaryValue || undefined}
                  disabled={loading}
                  onChange={v => {
                    setDiaryValue(v ?? "");
                    setError("");
                  }}
                  options={diarySelect.options.map(o => ({ value: o.value, label: o.label }))}
                  style={{ width: "100%" }}
                />
              </Flex>
            ) : null}

            {items.length > 0 ? (
              <>
                <Card size="small" styles={{ body: { padding: "6px 8px" } }} style={{ marginBottom: 8 }}>
                  <Flex justify="space-between" align="center" gap={8} wrap="wrap">
                    <Typography.Text type="secondary" style={{ fontSize: 11 }}>
                      Count: {items.length} | Total: {totalPlants}
                    </Typography.Text>
                    <Button
                      type="primary"
                      size="small"
                      icon={<PlusOutlined />}
                      disabled={loading}
                      onClick={addRow}
                    >
                      {groupsTableEmpty.addButton}
                    </Button>
                  </Flex>
                </Card>

                <Table<UxCreateBatchItem>
                  rowKey="id"
                  columns={columns}
                  dataSource={items}
                  pagination={false}
                  bordered
                  size="small"
                  tableLayout="fixed"
                  style={{ width: "100%" }}
                  styles={UX_PLANT_BATCH_TABLE_STYLES}
                />
              </>
            ) : (
              <UxPlantBatchGroupsTableEmpty
                disabled={loading}
                title={groupsTableEmpty.title}
                description={groupsTableEmpty.description}
                addButtonLabel={groupsTableEmpty.addButton}
                onAdd={addRow}
              />
            )}
          </>
        ) : (
          <>
            <Flex justify="space-between" align="center" style={{ marginBottom: 10 }} wrap="wrap" gap={8}>
              <Button
                size="small"
                disabled={loading}
                onClick={() => {
                  setLevel("table");
                  setEditingItemId(null);
                }}
              >
                Back to table
              </Button>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {editingItem ? `Group editor: ${editingItem.name || "new group"}` : "Group editor"}
              </Typography.Text>
            </Flex>

            {editingItem ? (
              <Card size="small" title="Group fields">
                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                  <Row gutter={[12, 8]}>
                    <Col xs={24}>
                      <Form
                        layout="vertical"
                        size="small"
                        style={{ width: "100%", marginBottom: 0 }}
                      >
                        <Form.Item
                          label="Plant name"
                          required
                          validateStatus={
                            plantNameEditorTouched && !isValidPlantName(editingItem.name)
                              ? "error"
                              : undefined
                          }
                          help={
                            plantNameEditorTouched && !isValidPlantName(editingItem.name)
                              ? `Enter at least ${PLANT_NAME_MIN_LENGTH} characters (not only spaces).`
                              : undefined
                          }
                        >
                          <Input
                            size="small"
                            value={editingItem.name}
                            disabled={loading}
                            onChange={e => updateItem(editingItem.id, { name: e.target.value })}
                            onBlur={() => setPlantNameEditorTouched(true)}
                            placeholder="e.g. OG Kush #1"
                          />
                        </Form.Item>
                        <Form.Item label="Item label (optional)" style={{ marginBottom: 0 }}>
                          <Input
                            size="small"
                            value={editingItem.itemLabel}
                            disabled={loading}
                            onChange={e => updateItem(editingItem.id, { itemLabel: e.target.value })}
                            placeholder="e.g. Mothers / Test #1"
                          />
                        </Form.Item>
                      </Form>
                    </Col>
                  </Row>

                  <Flex vertical gap={4}>
                    <Typography.Text style={{ fontSize: 12 }}>Product</Typography.Text>
                    {editingItem.productLabel.trim() &&
                    renderSelectedProduct &&
                    editingItem.productId.trim() ? (
                      renderSelectedProduct({
                        productId: editingItem.productId,
                        name: editingItem.productLabel,
                        subtitle: editingItem.productSubtitle || undefined,
                        avatarUrl: editingItem.productAvatarUrl || undefined,
                        loading,
                        compact: true,
                        onOpenPicker: () => setPickerItemId(editingItem.id),
                        onClear: () =>
                          updateItem(editingItem.id, {
                            productId: "",
                            productLabel: "",
                            productAvatarUrl: "",
                            productSubtitle: "",
                          }),
                      })
                    ) : (
                      <UxSelectedProductCard
                        size="compact"
                        name={editingItem.productLabel}
                        subtitle={editingItem.productSubtitle}
                        avatarUrl={editingItem.productAvatarUrl || undefined}
                        disabled={loading}
                        labels={productCardLabels}
                        onChoose={() => setPickerItemId(editingItem.id)}
                        onClear={() =>
                          updateItem(editingItem.id, {
                            productId: "",
                            productLabel: "",
                            productAvatarUrl: "",
                            productSubtitle: "",
                          })
                        }
                      />
                    )}
                  </Flex>

                  <Flex vertical gap={4}>
                    <Typography.Text style={{ fontSize: 12 }}>Pot</Typography.Text>
                    <Flex gap={8} wrap="wrap">
                      <Select
                        size="small"
                        placeholder="Not set"
                        allowClear
                        style={{ flex: "1 1 160px", minWidth: 120 }}
                        value={editingItem.potType || undefined}
                        disabled={loading}
                        onChange={v =>
                          updateItem(editingItem.id, {
                            potType: normalizePlantPotType(v),
                          })
                        }
                        options={PLANT_POT_OPTIONS}
                      />
                      <Input
                        size="small"
                        style={{ flex: "0 1 100px", maxWidth: 120 }}
                        value={editingItem.potSize}
                        disabled={loading}
                        onChange={e => updateItem(editingItem.id, { potSize: e.target.value })}
                        placeholder="Size (L)"
                        inputMode="decimal"
                      />
                    </Flex>
                  </Flex>

                  <Flex vertical gap={4}>
                    <Typography.Text style={{ fontSize: 12 }}>Period</Typography.Text>
                    <div
                      style={{
                        border: "1px solid #d9d9d9",
                        borderRadius: 6,
                        padding: "6px 8px",
                        background: "#fff",
                      }}
                    >
                      <UxPeriodField
                        size="small"
                        value={editingItem.period}
                        disabled={loading}
                        onChange={value =>
                          updateItem(editingItem.id, {
                            period: value,
                          })
                        }
                      />
                    </div>
                  </Flex>

                  <Divider style={{ margin: "6px 0" }} />

                  <Flex align="flex-end" gap={8} wrap="wrap">
                    <Flex vertical gap={4} style={{ maxWidth: 200, flex: "1 1 140px" }}>
                      <Typography.Text style={{ fontSize: 12 }}>Quantity (group)</Typography.Text>
                      <InputNumber
                        size="small"
                        min={1}
                        max={200}
                        step={1}
                        precision={0}
                        value={editingItem.quantity}
                        disabled={
                          loading || (mode === "edit" && Boolean(editingItem.sourcePlantId))
                        }
                        onChange={v => {
                          if (v == null || Number.isNaN(Number(v))) {
                            updateItem(editingItem.id, { quantity: 1 });
                            return;
                          }
                          const n = Math.min(200, Math.max(1, Math.trunc(Number(v))));
                          updateItem(editingItem.id, { quantity: n });
                        }}
                        style={{ width: "100%" }}
                      />
                    </Flex>
                    <Button
                      size="small"
                      danger
                      disabled={
                        editingItem.quantity <= 1 ||
                        loading ||
                        (mode === "edit" && Boolean(editingItem.sourcePlantId))
                      }
                      onClick={() => removeOne(editingItem.id)}
                    >
                      Reduce quantity
                    </Button>
                  </Flex>
                </Space>
              </Card>
            ) : null}
          </>
        )}

        {error ? (
          <Alert
            style={{ marginTop: 12 }}
            type="error"
            showIcon
            closable
            message={error}
            onClose={() => setError("")}
          />
        ) : null}
      </Modal>

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
              updateItem(pickerItemId, {
                productId: selected.id,
                productLabel: selected.name,
                productAvatarUrl: selected.avatarUrl ?? "",
                productSubtitle: selected.subtitle ?? "",
              });
            }
            setPickerItemId(undefined);
          }}
        />
      ) : null}
    </>
  );
}
