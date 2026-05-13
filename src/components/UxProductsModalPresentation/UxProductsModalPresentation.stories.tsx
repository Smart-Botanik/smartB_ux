import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { UxProductsModalPresentation } from "./UxProductsModalPresentation";

const meta: Meta<typeof UxProductsModalPresentation> = {
  title: "Components/UxProductsModalPresentation",
  component: UxProductsModalPresentation,
  tags: ["autodocs"],
  args: {
    open: true,
    title: "Add product",
  },
};

export default meta;
type Story = StoryObj<typeof UxProductsModalPresentation>;

const brands = [
  { id: "b1", name: "Seed Co", subtitle: "BREADER" },
  { id: "b2", name: "Grow Tech", subtitle: "FILTER" },
];

const productsByBrand: Record<string, Array<{ id: string; name: string; subtitle: string }>> = {
  b1: [
    { id: "p1", name: "Blue Dream Seed", subtitle: "SEED" },
    { id: "p2", name: "White Widow Seed", subtitle: "SEED" },
  ],
  b2: [{ id: "p3", name: "Carbon Filter 100", subtitle: "FILTER" }],
};

export const Playground: Story = {
  render: args => {
    const [currentBrandId, setCurrentBrandId] = useState<string>();

    return (
      <UxProductsModalPresentation
        {...args}
        brands={brands}
        products={currentBrandId ? productsByBrand[currentBrandId] ?? [] : []}
        onClose={() => void 0}
        onSelectBrand={setCurrentBrandId}
        onSelectProduct={productId => {
          // eslint-disable-next-line no-console
          console.log("Selected product", productId);
        }}
      />
    );
  },
};
