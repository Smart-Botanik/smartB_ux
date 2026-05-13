import { Avatar, Flex, Space, Tag, Typography } from "antd";
import type { ColumnType } from "antd/es/table";
import type { PlantPeriodPhase } from "@growing/contracts";

import {
  UX_PERIOD_PHASE_OPTIONS,
  UX_TABLE_ITEM_LABEL_TAG_SX,
  UX_TABLE_PERIOD_EMPTY_TAG_SX,
  UX_TABLE_PERIOD_FALLBACK_TAG_SX,
  UX_TABLE_PERIOD_PHASE_TAG_SX,
} from "../UxPeriodField";

/** Column titles + period empty label for shared batch plant tables. */
export type UxPlantBatchTableColumnLabels = {
  colProduct: string;
  colName: string;
  colPeriod: string;
  colQuantity: string;
  periodNotSelected: string;
};

const PRODUCT_COL_W = 124;
const NAME_COL_W = 104;
const PERIOD_COL_W = 86;
const QTY_COL_W = 36;
const AVATAR_COL_W = 32;
const POT_COL_W = 72;

export function uxPlantBatchAvatarColumn<T extends Record<string, unknown>>(options: {
  getSrc: (row: T) => string | undefined;
  getInitialLetter: (row: T) => string;
  width?: number;
  avatarSize?: number;
}): ColumnType<T> {
  const { getSrc, getInitialLetter, width = AVATAR_COL_W, avatarSize = 24 } = options;
  return {
    title: "",
    key: "avatar",
    width,
    align: "center",
    render: (_, row) => (
      <Avatar size={avatarSize} src={getSrc(row) || undefined}>
        {getInitialLetter(row).charAt(0).toUpperCase() || "?"}
      </Avatar>
    ),
  };
}

export function uxPlantBatchProductColumn<T extends Record<string, unknown>>(
  labels: Pick<UxPlantBatchTableColumnLabels, "colProduct">,
  options?: {
    getLabel?: (row: T) => string;
    getAvatarUrl?: (row: T) => string | undefined;
    width?: number;
  },
): ColumnType<T> {
  const getLabel = options?.getLabel ?? ((row: T) => String((row as { productLabel?: string }).productLabel ?? "").trim());
  const getAvatarUrl =
    options?.getAvatarUrl ??
    ((row: T) => {
      const u = (row as { productAvatarUrl?: string }).productAvatarUrl?.trim();
      return u || undefined;
    });
  const width = options?.width ?? PRODUCT_COL_W;

  return {
    title: labels.colProduct,
    key: "product",
    width,
    ellipsis: true,
    render: (_, row) => {
      const label = getLabel(row);
      if (!label) {
        return (
          <Typography.Text type="secondary" style={{ fontSize: 11 }}>
            —
          </Typography.Text>
        );
      }
      const av = getAvatarUrl(row);
      return (
        <Space align="center" size={6} style={{ maxWidth: width - 6, width: "100%" }}>
          <Avatar src={av} size={22} shape="square" style={{ borderRadius: 2 }}>
            {label.charAt(0).toUpperCase()}
          </Avatar>
          <Typography.Text ellipsis={{ tooltip: label }} style={{ fontSize: 11, maxWidth: 84 }}>
            {label}
          </Typography.Text>
        </Space>
      );
    },
  };
}

export function uxPlantBatchNameWithLabelColumn<T extends Record<string, unknown>>(
  labels: Pick<UxPlantBatchTableColumnLabels, "colName">,
  options?: {
    getName?: (row: T) => string;
    getItemLabel?: (row: T) => string;
    width?: number;
    itemLabelFontSize?: number;
    nameFontSize?: number;
  },
): ColumnType<T> {
  const getName = options?.getName ?? ((row: T) => String((row as { name?: string }).name ?? "").trim());
  const getItemLabel =
    options?.getItemLabel ?? ((row: T) => String((row as { itemLabel?: string }).itemLabel ?? "").trim());
  const width = options?.width ?? NAME_COL_W;
  const nameFontSize = options?.nameFontSize ?? 12;
  const itemLabelFontSize = options?.itemLabelFontSize ?? 10;

  return {
    title: labels.colName,
    key: "name",
    width,
    render: (_, row) => {
      const name = getName(row) || "—";
      const label = getItemLabel(row);
      return (
        <Flex vertical gap={2} style={{ minWidth: 0 }}>
          <Typography.Text
            strong
            ellipsis={{ tooltip: name !== "—" ? name : undefined }}
            style={{ fontSize: nameFontSize }}
          >
            {name}
          </Typography.Text>
          {label ? (
            <Tag
              title={label}
              style={{
                ...UX_TABLE_ITEM_LABEL_TAG_SX,
                fontSize: itemLabelFontSize,
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </Tag>
          ) : null}
        </Flex>
      );
    },
  };
}

export function uxPlantBatchPeriodColumn<T extends Record<string, unknown>>(
  labels: Pick<UxPlantBatchTableColumnLabels, "colPeriod" | "periodNotSelected">,
  options?: {
    getPeriod?: (row: T) => PlantPeriodPhase | "" | undefined;
    width?: number;
    tagFontSize?: number;
  },
): ColumnType<T> {
  const getPeriod =
    options?.getPeriod ??
    ((row: T) => (row as { period?: PlantPeriodPhase | "" }).period ?? "");
  const width = options?.width ?? PERIOD_COL_W;
  const tagFontSize = options?.tagFontSize ?? 10;

  return {
    title: labels.colPeriod,
    key: "period",
    width,
    render: (_, row) => {
      const period = getPeriod(row);
      if (!period) {
        return (
          <Tag style={{ ...UX_TABLE_PERIOD_EMPTY_TAG_SX, fontSize: tagFontSize }}>
            {labels.periodNotSelected}
          </Tag>
        );
      }
      const opt = UX_PERIOD_PHASE_OPTIONS.find(o => o.value === period);
      if (!opt) {
        return (
          <Tag style={{ ...UX_TABLE_PERIOD_FALLBACK_TAG_SX, fontSize: tagFontSize }}>{period}</Tag>
        );
      }
      return (
        <Tag style={{ ...UX_TABLE_PERIOD_PHASE_TAG_SX[opt.value], fontSize: tagFontSize }}>
          {opt.label}
        </Tag>
      );
    },
  };
}

export function uxPlantBatchQuantityColumn<T extends Record<string, unknown>>(
  labels: Pick<UxPlantBatchTableColumnLabels, "colQuantity">,
  options?: {
    getQuantity?: (row: T) => number;
    width?: number;
  },
): ColumnType<T> {
  const getQuantity =
    options?.getQuantity ??
    ((row: T) => Math.max(1, Number((row as { quantity?: number }).quantity ?? 1)));
  const width = options?.width ?? QTY_COL_W;

  return {
    title: labels.colQuantity,
    key: "quantity",
    width,
    align: "center",
    render: (_, row) => (
      <Typography.Text style={{ fontSize: 11 }}>{getQuantity(row)}</Typography.Text>
    ),
  };
}

export function uxPlantBatchPotColumn<T extends Record<string, unknown>>(
  labels: { colPot: string },
  formatPotLine: (row: T) => string,
  options?: { width?: number },
): ColumnType<T> {
  const width = options?.width ?? POT_COL_W;
  return {
    title: labels.colPot,
    key: "pot",
    width,
    ellipsis: true,
    render: (_, row) => {
      const raw = formatPotLine(row).trim();
      if (!raw || raw === "—") {
        return (
          <Typography.Text type="secondary" style={{ fontSize: 11 }}>
            —
          </Typography.Text>
        );
      }
      return (
        <Typography.Text
          type="secondary"
          ellipsis={{ tooltip: raw }}
          style={{ fontSize: 11, maxWidth: 64, display: "block" }}
        >
          {raw}
        </Typography.Text>
      );
    },
  };
}

export function uxPlantBatchCreatedColumn<T extends Record<string, unknown>>(
  labels: { colCreated: string },
  options: {
    getCreatedAtIso: (row: T) => string;
    formatDate: (iso: string) => string;
    width?: number;
  },
): ColumnType<T> {
  const width = options.width ?? 100;
  return {
    title: labels.colCreated,
    key: "created",
    width,
    render: (_, row) => {
      const d = options.formatDate(options.getCreatedAtIso(row));
      return (
        <Typography.Text
          type="secondary"
          ellipsis={{ tooltip: d }}
          style={{ fontSize: 11, maxWidth: 92, display: "block" }}
        >
          {d}
        </Typography.Text>
      );
    },
  };
}
