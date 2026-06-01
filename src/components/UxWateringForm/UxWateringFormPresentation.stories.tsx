import { useMemo, useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import {
  UxWateringFormPresentation,
} from "./UxWateringFormPresentation";
import type { UxWateringFormPresentationProps, UxWateringFormValue } from "./types";

const demoProductsModal: UxWateringFormPresentationProps["productsModal"] = {
  title: "Choose nutrient",
  brands: [{ id: "b1", name: "Advanced Nutrients", subtitle: "Nutrients" }],
  products: [
    {
      id: "p1",
      name: "Bloom A",
      subtitle: "Advanced Nutrients",
      avatarUrl: "",
    },
    {
      id: "p2",
      name: "Micro",
      subtitle: "Advanced Nutrients",
      avatarUrl: "",
    },
  ],
};

const meta: Meta<typeof UxWateringFormPresentation> = {
  title: "Components/UxWateringFormPresentation",
  component: UxWateringFormPresentation,
  tags: ["autodocs"],
  args: {
    disabled: false,
    tdsUnitLabel: "ppm",
    volumeUnitLabel: "L",
    nutrientUnitOptions: [
      { value: "mll", label: "ml/L" },
      { value: "tspl", label: "tsp/L" },
    ],
    productsModal: demoProductsModal,
  },
};

export default meta;
type Story = StoryObj<typeof UxWateringFormPresentation>;

const emptyValue: UxWateringFormValue = {
  solution: {},
  drainage: {},
  nutrients: [],
};

export const Empty: Story = {
  render: args => {
    const [value, setValue] = useState<UxWateringFormValue>(emptyValue);
    return <UxWateringFormPresentation {...args} value={value} onChange={setValue} />;
  },
};

export const WithNutrients: Story = {
  render: args => {
    const [value, setValue] = useState<UxWateringFormValue>({
      solution: { ph: 6.2, tds: 800, volume: 3 },
      drainage: { ph: 6.0, tds: 1200, volume: 0.5 },
      nutrients: [
        {
          id: "n1",
          productId: "p1",
          productName: "Bloom A",
          productSubtitle: "Advanced Nutrients",
          amount: 2,
          amountUnit: "mll",
        },
      ],
    });
    return (
      <UxWateringFormPresentation
        {...args}
        value={value}
        onChange={setValue}
        labels={{
          solutionTitle: "Solution",
          drainageTitle: "Drainage",
          nutrientsTitle: "Nutrients mix",
        }}
      />
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: args => (
    <UxWateringFormPresentation
      {...args}
      value={{
        solution: { ph: 6.1 },
        drainage: {},
        nutrients: [],
      }}
      onChange={() => undefined}
    />
  ),
};
