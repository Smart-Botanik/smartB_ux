import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";

/** Inline plant-in-pot illustration for empty batch group tables (no external asset). */
export function UxPlantBatchGroupsEmptyIllustration({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="40" cy="72" rx="22" ry="5" fill="rgba(45, 90, 60, 0.08)" />
      <path
        d="M24 58 L28 68 L52 68 L56 58 Z"
        fill="#eef3ee"
        stroke="#b8c9b8"
        strokeWidth="1.25"
      />
      <path d="M26 58 L54 58" stroke="#a8baa8" strokeWidth="1" />
      <path
        d="M40 58 L40 32"
        stroke="#5a8a62"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M40 40 Q28 34 22 26 Q26 30 40 36"
        fill="#d4edd8"
        stroke="#5a8a62"
        strokeWidth="1.1"
      />
      <path
        d="M40 38 Q52 32 58 24 Q54 28 40 34"
        fill="#cde8d2"
        stroke="#4a7a54"
        strokeWidth="1.1"
      />
      <path
        d="M40 30 Q34 18 30 12 Q36 16 40 24"
        fill="#bfe0c6"
        stroke="#4a7a54"
        strokeWidth="1"
      />
      <path
        d="M40 28 Q46 16 50 10 Q44 14 40 22"
        fill="#b5dcc0"
        stroke="#3d6a48"
        strokeWidth="1"
      />
      <circle cx="40" cy="14" r="3" fill="#7cb88a" opacity="0.35" />
    </svg>
  );
}

export type UxPlantBatchGroupsTableEmptyProps = {
  disabled?: boolean;
  title: string;
  description: string;
  addButtonLabel: string;
  onAdd: () => void;
};

/**
 * Empty state for plant batch group tables — matches dense table frame (radius, border).
 */
export function UxPlantBatchGroupsTableEmpty({
  disabled = false,
  title,
  description,
  addButtonLabel,
  onAdd,
}: UxPlantBatchGroupsTableEmptyProps) {
  return (
    <Flex
      vertical
      align="center"
      justify="center"
      gap={12}
      style={{
        width: "100%",
        minHeight: 168,
        padding: "22px 16px 20px",
        boxSizing: "border-box",
        borderRadius: 2,
        border: "1px solid #e8ecf0",
        background: "linear-gradient(180deg, #f9fbf9 0%, #f6f8fb 100%)",
      }}
    >
      <UxPlantBatchGroupsEmptyIllustration size={76} />
      <Flex vertical align="center" gap={4} style={{ textAlign: "center", maxWidth: 360 }}>
        <Typography.Text strong style={{ fontSize: 13, color: "#1f2d24" }}>
          {title}
        </Typography.Text>
        <Typography.Text type="secondary" style={{ fontSize: 12, lineHeight: 1.45 }}>
          {description}
        </Typography.Text>
      </Flex>
      <Button
        type="primary"
        size="small"
        icon={<PlusOutlined />}
        disabled={disabled}
        onClick={onAdd}
      >
        {addButtonLabel}
      </Button>
    </Flex>
  );
}
