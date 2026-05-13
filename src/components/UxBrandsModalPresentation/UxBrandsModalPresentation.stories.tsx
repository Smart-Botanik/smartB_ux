import type { Meta, StoryObj } from "@storybook/react";

import { UxBrandsModalPresentation } from "./UxBrandsModalPresentation";

const meta: Meta<typeof UxBrandsModalPresentation> = {
  title: "Components/UxBrandsModalPresentation",
  component: UxBrandsModalPresentation,
  tags: ["autodocs"],
  args: {
    open: true,
    title: "Select brand",
    brands: [
      { id: "b1", name: "Seed Co", subtitle: "BREADER" },
      { id: "b2", name: "Grow Tech", subtitle: "FILTER" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof UxBrandsModalPresentation>;

export const Playground: Story = {
  args: {
    onClose: () => void 0,
    onSelectBrand: brandId => {
      // eslint-disable-next-line no-console
      console.log("Selected brand", brandId);
    },
  },
};
