import type { Preview } from "@storybook/react";
import { ConfigProvider } from "antd";
import { createElement } from "react";

const preview: Preview = {
  decorators: [
    Story =>
      createElement(
        ConfigProvider,
        {},
        createElement(
          "div",
          { style: { fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif" } },
          createElement(Story)
        )
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
