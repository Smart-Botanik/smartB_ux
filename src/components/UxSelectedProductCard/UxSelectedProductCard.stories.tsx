import type { Meta, StoryObj } from "@storybook/react";

import { UxSelectedProductCard } from "./UxSelectedProductCard";

const meta: Meta<typeof UxSelectedProductCard> = {
  title: "Components/UxSelectedProductCard",
  component: UxSelectedProductCard,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof UxSelectedProductCard>;

export const Empty: Story = {
  args: {
    name: "",
    onChoose: () => undefined
  }
};

export const Selected: Story = {
  args: {
    name: "AUTOMAIN",
    subtitle: "Seed",
    avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=automain",
    onChoose: () => undefined,
    onClear: () => undefined
  }
};

export const CompactEmpty: Story = {
  args: {
    ...Empty.args,
    size: "compact"
  }
};

export const CompactSelected: Story = {
  args: {
    ...Selected.args,
    size: "compact"
  }
};
