import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { UxWateringEventModal } from "./UxWateringEventModal";
import type { UxWateringFormValue } from "./types";

const meta: Meta<typeof UxWateringEventModal> = {
  title: "Components/UxWateringEventModal",
  component: UxWateringEventModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UxWateringEventModal>;

export const Playground: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState<UxWateringFormValue>({
      solution: { ph: 6.0, volume: 2 },
      drainage: {},
      nutrients: [],
    });

    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          Open modal
        </button>
        <UxWateringEventModal
          open={open}
          value={value}
          onChange={setValue}
          onClose={() => setOpen(false)}
          onSubmit={() => setOpen(false)}
          labels={{
            solutionTitle: "Solution",
            drainageTitle: "Drainage",
            nutrientsTitle: "Nutrients",
            addNutrient: "Add nutrient",
          }}
          tdsUnitLabel="ppm"
          volumeUnitLabel="L"
          nutrientUnitOptions={[{ value: "mll", label: "ml/L" }]}
          productsModal={{
            brands: [{ id: "b1", name: "Demo brand" }],
            products: [{ id: "p1", name: "Demo product", subtitle: "Demo brand" }],
          }}
        />
      </>
    );
  },
};
