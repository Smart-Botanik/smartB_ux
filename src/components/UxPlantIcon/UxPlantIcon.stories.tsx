import type { Meta, StoryObj } from "@storybook/react";
import { Flex, Space, Typography } from "antd";

import { UxPlantIcon, type UxPlantIconKind, type UxPlantIconSize } from "./UxPlantIcon";

const meta: Meta<typeof UxPlantIcon> = {
  title: "Components/UxPlantIcon",
  component: UxPlantIcon,
  tags: ["autodocs"],
  args: {
    kind: "tomato",
    size: "m",
  },
  argTypes: {
    kind: {
      control: "select",
      options: ["eggplant", "tomato", "cucumber"],
    },
    size: {
      control: "select",
      options: ["s", "m", "l"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof UxPlantIcon>;

export const Tomato: Story = {};

const kinds: UxPlantIconKind[] = ["eggplant", "tomato", "cucumber"];
const sizes: UxPlantIconSize[] = ["s", "m", "l"];

export const Catalog: Story = {
  render: () => (
    <Space direction="vertical" size={16}>
      {sizes.map(size => (
        <Flex key={size} align="center" gap={12}>
          <Typography.Text style={{ width: 18, color: "#64748b" }}>{size}</Typography.Text>
          {kinds.map(kind => (
            <UxPlantIcon key={`${size}-${kind}`} kind={kind} size={size} />
          ))}
        </Flex>
      ))}
    </Space>
  ),
};
