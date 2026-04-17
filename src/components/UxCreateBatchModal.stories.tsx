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

export const Playground: Story = {
  render: args => {
    const [open, setOpen] = useState(true);

    return (
      <div style={{ minHeight: 700, padding: 20, background: "#eff4ff" }}>
        <button onClick={() => setOpen(true)} style={{ marginBottom: 12 }}>
          Open modal
        </button>
        <UxCreateBatchModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={payload => {
            // eslint-disable-next-line no-console
            console.log("Create batch payload", payload);
          }}
        />
      </div>
    );
  }
};
