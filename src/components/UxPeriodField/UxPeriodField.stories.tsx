import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { UxPeriodField, type UxPeriodValue } from "./UxPeriodField";

const meta: Meta<typeof UxPeriodField> = {
  title: "Components/UxPeriodField",
  component: UxPeriodField,
  tags: ["autodocs"],
  args: {
    disabled: false
  }
};

export default meta;
type Story = StoryObj<typeof UxPeriodField>;

export const Playground: Story = {
  render: args => {
    const [value, setValue] = useState<UxPeriodValue>("");
    return <UxPeriodField {...args} value={value} onChange={setValue} />;
  }
};
