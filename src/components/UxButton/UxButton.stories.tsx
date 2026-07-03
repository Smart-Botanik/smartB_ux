import type { Meta, StoryObj } from "@storybook/react";
import { UxButton } from "./UxButton";

const meta: Meta<typeof UxButton> = {
  title: "Components/UxButton",
  component: UxButton,
  tags: ["autodocs"],
  args: {
    children: "Click me"
  }
};

export default meta;
type Story = StoryObj<typeof UxButton>;

export const Primary: Story = {
  args: {
    variant: "primary"
  }
};

export const Secondary: Story = {
  args: {
    variant: "secondary"
  }
};

export const Ghost: Story = {
  args: {
    variant: "ghost"
  }
};

export const GrowPrimary: Story = {
  args: {
    variant: "growPrimary",
    children: "Добавить метрику"
  }
};

export const GrowSecondary: Story = {
  args: {
    variant: "growSecondary",
    children: "Описать локацию"
  }
};
