import { Button, Divider, Flex, Modal, Typography } from "antd";

import { UxWateringFormPresentation } from "./UxWateringFormPresentation";
import type { UxWateringEventModalProps } from "./types";

export function UxWateringEventModal({
  open,
  title = "Watering",
  subtitle = "Fill solution, drainage and nutrients.",
  loading = false,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  footerHint,
  value,
  onChange,
  onClose,
  onSubmit,
  headerSlot,
  labels,
  tdsUnitLabel,
  volumeUnitLabel,
  nutrientUnitOptions,
  productCardLabels,
  productsModal,
  renderNutrientProduct,
}: UxWateringEventModalProps) {
  const footer = (
    <Flex justify="space-between" align="center" gap={16} wrap="wrap">
      {footerHint ? (
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          {footerHint}
        </Typography.Text>
      ) : (
        <span />
      )}
      <Flex gap={8} wrap="wrap">
        <Button size="small" disabled={loading} onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button type="primary" size="small" loading={loading} onClick={() => onSubmit?.(value)}>
          {submitLabel}
        </Button>
      </Flex>
    </Flex>
  );

  return (
    <Modal
      open={open}
      title={
        <Flex vertical gap={4}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
          <Typography.Text type="secondary">{subtitle}</Typography.Text>
        </Flex>
      }
      onCancel={onClose}
      footer={
        <Flex vertical gap={0} style={{ width: "100%" }}>
          <Divider style={{ margin: 0 }} />
          <div style={{ paddingTop: 12 }}>{footer}</div>
        </Flex>
      }
      width={720}
      centered
      destroyOnClose
      maskClosable={!loading}
      styles={{ body: { paddingTop: 8 } }}
    >
      {headerSlot}
      <UxWateringFormPresentation
        value={value}
        onChange={onChange}
        disabled={loading}
        labels={labels}
        tdsUnitLabel={tdsUnitLabel}
        volumeUnitLabel={volumeUnitLabel}
        nutrientUnitOptions={nutrientUnitOptions}
        productCardLabels={productCardLabels}
        productsModal={productsModal}
        renderNutrientProduct={renderNutrientProduct}
      />
    </Modal>
  );
}
