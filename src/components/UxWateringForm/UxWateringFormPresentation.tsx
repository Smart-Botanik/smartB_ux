import { useEffect, useMemo, useState } from "react";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Flex,
  Form,
  InputNumber,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";

import { UxProductsModalPresentation } from "../UxProductsModalPresentation";
import { UxSelectedProductCard } from "../UxSelectedProductCard";
import type {
  UxWateringFormLabels,
  UxWateringFormPresentationProps,
  UxWateringFormValue,
  UxWateringNutrientRow,
  UxWateringSolutionValue,
} from "./types";

const DEFAULT_LABELS: UxWateringFormLabels = {
  solutionTitle: "Solution",
  drainageTitle: "Drainage",
  nutrientsTitle: "Nutrients",
  phPlaceholder: "pH",
  tdsPlaceholder: "TDS",
  volumePlaceholder: "Volume",
  addNutrient: "Add nutrient",
  amountPlaceholder: "Amount",
  unitPlaceholder: "Unit",
  removeNutrientAria: "Remove nutrient",
};

const createNutrientRow = (): UxWateringNutrientRow => ({
  id: crypto.randomUUID(),
});

type SolutionFieldsProps = {
  title: string;
  value: UxWateringSolutionValue;
  disabled?: boolean;
  labels: UxWateringFormLabels;
  tdsUnitLabel?: string;
  volumeUnitLabel?: string;
  onChange: (next: UxWateringSolutionValue) => void;
};

function SolutionFields({
  title,
  value,
  disabled,
  labels,
  tdsUnitLabel,
  volumeUnitLabel,
  onChange,
}: SolutionFieldsProps) {
  return (
    <Card size="small" title={title} styles={{ body: { padding: "12px 16px" } }}>
      <Flex gap={12} wrap="wrap">
        <Form.Item label={labels.phPlaceholder} style={{ marginBottom: 0, minWidth: 88 }}>
          <InputNumber
            size="small"
            value={value.ph}
            placeholder={labels.phPlaceholder}
            min={0}
            max={14}
            step={0.1}
            disabled={disabled}
            onChange={v => onChange({ ...value, ph: v ?? undefined })}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label={labels.tdsPlaceholder} style={{ marginBottom: 0, minWidth: 120 }}>
          <InputNumber
            size="small"
            value={value.tds}
            placeholder={labels.tdsPlaceholder}
            min={0}
            disabled={disabled}
            addonAfter={tdsUnitLabel}
            onChange={v => onChange({ ...value, tds: v ?? undefined })}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label={labels.volumePlaceholder} style={{ marginBottom: 0, minWidth: 120 }}>
          <InputNumber
            size="small"
            value={value.volume}
            placeholder={labels.volumePlaceholder}
            min={0}
            step={0.1}
            disabled={disabled}
            addonAfter={volumeUnitLabel}
            onChange={v => onChange({ ...value, volume: v ?? undefined })}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Flex>
    </Card>
  );
}

export function UxWateringFormPresentation({
  value,
  onChange,
  disabled = false,
  labels: labelsProp,
  tdsUnitLabel,
  volumeUnitLabel,
  nutrientUnitOptions = [],
  productCardLabels,
  productsModal,
  renderNutrientProduct,
}: UxWateringFormPresentationProps) {
  const labels = useMemo(() => ({ ...DEFAULT_LABELS, ...labelsProp }), [labelsProp]);
  const [pickerRowId, setPickerRowId] = useState<string>();

  useEffect(() => {
    if (disabled) {
      setPickerRowId(undefined);
    }
  }, [disabled]);

  const updateSolution = (branch: "solution" | "drainage", next: UxWateringSolutionValue) => {
    onChange({ ...value, [branch]: next });
  };

  const updateNutrients = (nutrients: UxWateringNutrientRow[]) => {
    onChange({ ...value, nutrients });
  };

  const updateNutrientRow = (id: string, patch: Partial<UxWateringNutrientRow>) => {
    updateNutrients(value.nutrients.map(row => (row.id === id ? { ...row, ...patch } : row)));
  };

  const addNutrientRow = () => {
    updateNutrients([...value.nutrients, createNutrientRow()]);
  };

  const removeNutrientRow = (id: string) => {
    updateNutrients(value.nutrients.filter(row => row.id !== id));
  };

  const columns: ColumnsType<UxWateringNutrientRow> = [
    {
      title: "Product",
      key: "product",
      render: (_, row) => {
        const productName = [row.productSubtitle, row.productName].filter(Boolean).join(" / ") || row.productName || "";

        if (renderNutrientProduct && row.productId && productName.trim()) {
          return renderNutrientProduct({
            row,
            disabled,
            onOpenPicker: () => setPickerRowId(row.id),
            onClear: () =>
              updateNutrientRow(row.id, {
                productId: undefined,
                productName: undefined,
                productSubtitle: undefined,
                productAvatarUrl: undefined,
              }),
          });
        }

        return (
          <UxSelectedProductCard
            size="compact"
            name={productName}
            subtitle={row.productSubtitle}
            avatarUrl={row.productAvatarUrl || undefined}
            disabled={disabled}
            labels={productCardLabels}
            onChoose={() => setPickerRowId(row.id)}
            onClear={() =>
              updateNutrientRow(row.id, {
                productId: undefined,
                productName: undefined,
                productSubtitle: undefined,
                productAvatarUrl: undefined,
              })
            }
          />
        );
      },
    },
    {
      title: labels.amountPlaceholder,
      key: "amount",
      width: 120,
      render: (_, row) => (
        <InputNumber
          size="small"
          min={0}
          step={0.1}
          value={row.amount}
          disabled={disabled}
          placeholder={labels.amountPlaceholder}
          onChange={v => updateNutrientRow(row.id, { amount: v ?? undefined })}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: labels.unitPlaceholder,
      key: "unit",
      width: 120,
      render: (_, row) => (
        <Select
          size="small"
          allowClear
          placeholder={labels.unitPlaceholder}
          disabled={disabled || nutrientUnitOptions.length === 0}
          value={row.amountUnit || undefined}
          options={nutrientUnitOptions}
          onChange={v => updateNutrientRow(row.id, { amountUnit: v ?? undefined })}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      key: "actions",
      width: 48,
      render: (_, row) => (
        <Button
          type="text"
          size="small"
          danger
          disabled={disabled}
          icon={<DeleteOutlined />}
          aria-label={labels.removeNutrientAria}
          onClick={() => removeNutrientRow(row.id)}
        />
      ),
    },
  ];

  const pickerOpen = Boolean(pickerRowId && productsModal);

  return (
    <>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <SolutionFields
          title={labels.solutionTitle}
          value={value.solution}
          disabled={disabled}
          labels={labels}
          tdsUnitLabel={tdsUnitLabel}
          volumeUnitLabel={volumeUnitLabel}
          onChange={next => updateSolution("solution", next)}
        />
        <SolutionFields
          title={labels.drainageTitle}
          value={value.drainage}
          disabled={disabled}
          labels={labels}
          tdsUnitLabel={tdsUnitLabel}
          volumeUnitLabel={volumeUnitLabel}
          onChange={next => updateSolution("drainage", next)}
        />
        <Card
          size="small"
          title={labels.nutrientsTitle}
          styles={{ body: { padding: "12px 16px" } }}
          extra={
            <Button
              id="add-nutrient-button"
              type="link"
              size="small"
              icon={<PlusCircleOutlined />}
              disabled={disabled}
              onClick={addNutrientRow}
            >
              {labels.addNutrient}
            </Button>
          }
        >
          {value.nutrients.length > 0 ? (
            <Table<UxWateringNutrientRow>
              rowKey="id"
              size="small"
              pagination={false}
              columns={columns}
              dataSource={value.nutrients}
              scroll={{ x: true }}
            />
          ) : (
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              {labels.addNutrient}
            </Typography.Text>
          )}
        </Card>
      </Space>

      {pickerOpen && productsModal ? (
        <UxProductsModalPresentation
          open={pickerOpen}
          title={productsModal.title ?? "Choose product"}
          brands={productsModal.brands ?? []}
          products={productsModal.products ?? []}
          isBrandsLoading={productsModal.isBrandsLoading}
          isProductsLoading={productsModal.isProductsLoading}
          canLoadMoreBrands={productsModal.canLoadMoreBrands}
          canLoadMoreProducts={productsModal.canLoadMoreProducts}
          onClose={() => setPickerRowId(undefined)}
          onSearchChange={productsModal.onSearchChange}
          onLoadMoreBrands={productsModal.onLoadMoreBrands}
          onLoadMoreProducts={productsModal.onLoadMoreProducts}
          onSelectBrand={productsModal.onSelectBrand}
          onSelectProduct={productId => {
            const selected = (productsModal.products ?? []).find(product => product.id === productId);
            if (selected && pickerRowId) {
              updateNutrientRow(pickerRowId, {
                productId: selected.id,
                productName: selected.name,
                productAvatarUrl: selected.avatarUrl ?? "",
                productSubtitle: selected.subtitle ?? "",
              });
            }
            setPickerRowId(undefined);
          }}
        />
      ) : null}
    </>
  );
}
