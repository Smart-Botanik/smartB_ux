import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "GrowingUI",
      fileName: "growing-ui",
      formats: ["es", "umd"]
    },
    rollupOptions: {
      external: ["react", "react-dom", "antd", "@ant-design/icons"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          antd: "antd",
          "@ant-design/icons": "antdIcons"
        }
      }
    }
  }
});
