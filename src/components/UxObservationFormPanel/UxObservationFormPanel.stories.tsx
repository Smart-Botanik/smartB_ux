import type { Meta, StoryObj } from "@storybook/react";

import { UxGrowThemeProvider } from "../UxGrowThemeProvider";
import { UxObservationFormPanel } from "../UxObservationFormPanel";
import { UxPhField } from "../UxSemanticFieldController";
import { techOrganicColors, techOrganicSpacing } from "../../tokens";

const meta: Meta = {
  title: "Grow/RegistryFields",
  decorators: [
    Story => (
      <UxGrowThemeProvider>
        <div
          style={{
            width: 360,
            padding: techOrganicSpacing.lg,
            background: techOrganicColors.background,
          }}
        >
          <Story />
        </div>
      </UxGrowThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const PhInGrowTheme: Story = {
  render: () => (
    <UxObservationFormPanel title="pH субстрата" description="Field Pattern · semanticKind ph">
      <UxPhField
        label="Уровень pH"
        value={6.2}
        unitPolicy={{
          canonicalUnit: "pH",
          defaultInputUnit: "pH",
          allowedUnits: ["pH"],
        }}
        onChange={() => undefined}
        showMetaTags={false}
      />
    </UxObservationFormPanel>
  ),
};
