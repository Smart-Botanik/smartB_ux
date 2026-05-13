import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { UxCreateBatchModal } from "./UxCreateBatchModal";

const meta: Meta<typeof UxCreateBatchModal> = {
  title: "Components/UxCreateBatchModal",
  component: UxCreateBatchModal,
  tags: ["autodocs"],
  args: {
    open: true,
    loading: false,
    title: "Create plant batch"
  }
};

export default meta;
type Story = StoryObj<typeof UxCreateBatchModal>;

export const EmptyGroupsPlaceholder: Story = {
  render: args => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ minHeight: 520, padding: 20, background: "#eff4ff" }}>
        <button type="button" onClick={() => setOpen(true)} style={{ marginBottom: 12 }}>
          Open modal (no groups)
        </button>
        <UxCreateBatchModal
          {...args}
          open={open}
          title="New batch"
          initialBatchName=""
          onClose={() => setOpen(false)}
          onSubmit={() => undefined}
        />
      </div>
    );
  }
};

export const Playground: Story = {
  render: args => {
    const [open, setOpen] = useState(true);
    const [query, setQuery] = useState("");
    const [selectedBrandId, setSelectedBrandId] = useState<string>();

    const brands = [
      { id: "b1", name: "Seed Co", subtitle: "Breeder" },
      { id: "b2", name: "Grow Tech", subtitle: "Filter" }
    ];

    const allProducts = [
      { id: "p1", name: "Blue Dream Seed", subtitle: "Seed", brandId: "b1" },
      { id: "p2", name: "White Widow Seed", subtitle: "Seed", brandId: "b1" },
      { id: "p3", name: "Carbon Filter 100", subtitle: "Filter", brandId: "b2" }
    ];

    const filteredProducts = allProducts
      .filter(product => (selectedBrandId ? product.brandId === selectedBrandId : true))
      .filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
      .map(({ brandId: _brandId, ...rest }) => rest);

    return (
      <div style={{ minHeight: 700, padding: 20, background: "#eff4ff" }}>
        <button onClick={() => setOpen(true)} style={{ marginBottom: 12 }}>
          Open modal
        </button>
        <UxCreateBatchModal
          {...args}
          open={open}
          initialBatchName="Spring 2026 / Demo Batch"
          initialItems={[
            {
              name: "Blue Dream #1",
              quantity: 1,
              itemLabel: "",
              productId: "",
              productLabel: "Blue Dream Seed",
              productAvatarUrl: "",
              productSubtitle: "Seed",
              potType: "growBag",
              potSize: "11",
              period: "vegetation"
            },
            {
              name: "White Widow #1",
              quantity: 1,
              itemLabel: "",
              productId: "",
              productLabel: "White Widow Seed",
              productAvatarUrl: "",
              productSubtitle: "Seed",
              potType: "plastic",
              potSize: "7",
              period: "vegetation"
            },
            {
              name: "OG Kush Group",
              quantity: 3,
              itemLabel: "Dream Collection A",
              productId: "",
              productLabel: "Blue Dream Seed",
              productAvatarUrl: "",
              productSubtitle: "Seed",
              potType: "airPot",
              potSize: "10",
              period: "bloom"
            }
          ]}
          onClose={() => setOpen(false)}
          productsModal={{
            title: "Choose product",
            brands,
            products: filteredProducts,
            onSelectBrand: setSelectedBrandId,
            onSearchChange: setQuery
          }}
          onSubmit={payload => {
            // eslint-disable-next-line no-console
            console.log("Create batch payload", payload);
          }}
        />
      </div>
    );
  }
};
