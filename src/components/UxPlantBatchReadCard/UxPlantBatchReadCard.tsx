import type { ReactNode } from "react";
import { EditOutlined } from "@ant-design/icons";
import type { PlantPeriodPhase } from "@growing/contracts";
import { Button, Card, Divider, Flex, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

import {
  uxPlantBatchAvatarColumn,
  uxPlantBatchCreatedColumn,
  uxPlantBatchNameWithLabelColumn,
  uxPlantBatchPeriodColumn,
  uxPlantBatchProductColumn,
  uxPlantBatchQuantityColumn,
} from "../UxCreateBatchModal/UxPlantBatchTableColumns";
import { UX_PLANT_BATCH_TABLE_STYLES } from "../UxCreateBatchModal/UxPlantBatchTableStyles";

export type UxPlantBatchReadPlantRow = {
  id: string;
  name: string;
  /** ISO 8601 datetime string from the API. */
  createdAtIso: string;
  avatarUrl?: string;
  /** Display quantity from projection / defaults to 1. */
  quantity?: number;
  itemLabel?: string;
  /** Catalog / chosen product title from projection. */
  productLabel?: string;
  /** Product image when available (falls back handled by host mapper). */
  productAvatarUrl?: string;
  period?: PlantPeriodPhase | "";
};

export type UxPlantBatchReadCardLabels = {
  batchCreatedPrefix?: string;
  plantsInBatch?: (count: number) => string;
  emptyPlants?: string;
  colName?: string;
  colCreated?: string;
  colQuantity?: string;
  colProduct?: string;
  colPeriod?: string;
  /** Shown when `period` is empty. */
  periodNotSelected?: string;
  /** `aria-label` / title for per-row edit control. */
  rowEditPlant?: string;
};

export type UxPlantBatchReadCardProps = {
  batchName: string;
  batchCreatedAtIso: string;
  plants: UxPlantBatchReadPlantRow[];
  /** Formats ISO timestamps for the batch header and plant rows. */
  formatDate?: (iso: string) => string;
  labels?: UxPlantBatchReadCardLabels;
  emptyPlantsHint?: string;
  /** Shown in the header row next to the title block (e.g. edit button). */
  headerActions?: ReactNode;
  /** When set, an actions column with an edit control per plant row is shown. */
  onEditPlantRow?: (plantId: string) => void;
};

const defaultFormatDate = (iso: string): string => {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) {
    return iso;
  }
  return new Date(t).toLocaleString();
};

const defaultLabels: Required<
  Pick<
    UxPlantBatchReadCardLabels,
    | "batchCreatedPrefix"
    | "colName"
    | "colCreated"
    | "colQuantity"
    | "colProduct"
    | "colPeriod"
    | "periodNotSelected"
    | "rowEditPlant"
  >
> & {
  plantsInBatch: (count: number) => string;
  emptyPlants: string;
} = {
  batchCreatedPrefix: "Created",
  plantsInBatch: count => `${count} plant${count === 1 ? "" : "s"}`,
  emptyPlants: "No plants in this batch yet.",
  colName: "Name",
  colCreated: "Created",
  colQuantity: "Qty",
  colProduct: "Product",
  colPeriod: "Period",
  periodNotSelected: "Not selected",
  rowEditPlant: "Edit plant group",
};

/** Same horizontal inset for the header (title) and body (table). */
const CARD_CONTENT_INSET = 20;

export function UxPlantBatchReadCard({
  batchName,
  batchCreatedAtIso,
  plants,
  formatDate = defaultFormatDate,
  labels: labelsProp,
  emptyPlantsHint,
  headerActions,
  onEditPlantRow,
}: UxPlantBatchReadCardProps) {
  const labels = { ...defaultLabels, ...labelsProp };
  const emptyHint = emptyPlantsHint ?? labels.emptyPlants;

  const tableLabels = {
    colProduct: labels.colProduct,
    colName: labels.colName,
    colPeriod: labels.colPeriod,
    colQuantity: labels.colQuantity,
    periodNotSelected: labels.periodNotSelected,
  };

  const columns: ColumnsType<UxPlantBatchReadPlantRow> = [
    uxPlantBatchAvatarColumn<UxPlantBatchReadPlantRow>({
      getSrc: r => r.avatarUrl,
      getInitialLetter: r => r.name?.trim() || "?",
    }),
    uxPlantBatchProductColumn<UxPlantBatchReadPlantRow>({ colProduct: tableLabels.colProduct }),
    uxPlantBatchNameWithLabelColumn<UxPlantBatchReadPlantRow>({ colName: tableLabels.colName }),
    uxPlantBatchPeriodColumn<UxPlantBatchReadPlantRow>({
      colPeriod: tableLabels.colPeriod,
      periodNotSelected: tableLabels.periodNotSelected,
    }),
    uxPlantBatchQuantityColumn<UxPlantBatchReadPlantRow>({ colQuantity: tableLabels.colQuantity }),
    uxPlantBatchCreatedColumn<UxPlantBatchReadPlantRow>(
      { colCreated: labels.colCreated },
      { formatDate, getCreatedAtIso: r => r.createdAtIso },
    ),
    ...(onEditPlantRow
      ? [
          {
            title: "",
            key: "rowActions",
            width: 36,
            align: "center" as const,
            render: (_: unknown, row: UxPlantBatchReadPlantRow) => (
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                aria-label={labels.rowEditPlant}
                title={labels.rowEditPlant}
                onClick={() => onEditPlantRow(row.id)}
              />
            ),
          } satisfies ColumnsType<UxPlantBatchReadPlantRow>[number],
        ]
      : []),
  ];

  return (
    <Card
      size="small"
      style={{ width: "100%" }}
      styles={{
        header: {
          textAlign: "start",
          paddingInline: CARD_CONTENT_INSET,
          paddingBlock: 12,
        },
        title: { textAlign: "start", width: "100%" },
        body: {
          paddingInline: CARD_CONTENT_INSET,
          paddingTop: plants.length === 0 ? 16 : 8,
          paddingBottom: 16,
        },
      }}
      title={
        <Flex vertical align="stretch" gap={0} style={{ width: "100%" }}>
          <Flex
            justify="space-between"
            align="flex-end"
            gap={16}
            wrap="wrap"
            style={{ width: "100%" }}
          >
            <Typography.Text
              strong
              style={{
                fontSize: 14,
                lineHeight: 1.35,
                textAlign: "start",
                flex: "1 1 160px",
                minWidth: 0,
              }}
            >
              {batchName}
            </Typography.Text>
            {headerActions ? (
              <Flex align="center" wrap="wrap" gap={8} style={{ flexShrink: 0 }}>
                {headerActions}
              </Flex>
            ) : null}
          </Flex>
          <Divider style={{ margin: "10px 0 8px" }} />
          <Typography.Text
            type="secondary"
            style={{ fontSize: 11, textAlign: "start", display: "block", width: "100%", lineHeight: 1.4 }}
          >
            {labels.batchCreatedPrefix}: {formatDate(batchCreatedAtIso)}
          </Typography.Text>
          <Typography.Text
            type="secondary"
            style={{
              fontSize: 11,
              display: "block",
              width: "100%",
              lineHeight: 1.4,
              marginTop: 2,
            }}
          >
            {labels.plantsInBatch(plants.length)}
          </Typography.Text>
        </Flex>
      }
    >
      {plants.length === 0 ? (
        <Typography.Text type="secondary">{emptyHint}</Typography.Text>
      ) : (
        <>
          <Divider style={{ margin: "6px 0 8px" }} />
          <Table<UxPlantBatchReadPlantRow>
            rowKey="id"
            columns={columns}
            dataSource={plants}
            pagination={false}
            bordered
            size="small"
            tableLayout="fixed"
            style={{ width: "100%" }}
            styles={UX_PLANT_BATCH_TABLE_STYLES}
          />
        </>
      )}
    </Card>
  );
}
