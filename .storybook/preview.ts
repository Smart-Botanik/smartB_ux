import type { Preview } from "@storybook/react";
import { createElement } from "react";

const preview: Preview = {
  decorators: [
    Story =>
      createElement(
        "div",
        { style: { fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif" } },
        createElement(Story)
      ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    layout: "centered"
  }
};

export default preview;
