import type { TableProps } from "antd";

/** Shared Ant Design `Table` `styles` for plant batch read + create-batch group tables. */
export const UX_PLANT_BATCH_TABLE_STYLES: NonNullable<TableProps<Record<string, unknown>>["styles"]> =
  {
    root: { borderRadius: 2 },
    header: {
      cell: {
        paddingBlock: 4,
        paddingInline: 4,
        fontSize: 11,
      },
    },
    body: {
      cell: {
        paddingBlock: 3,
        paddingInline: 4,
      },
    },
  };
