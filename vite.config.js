import react from "@vitejs/plugin-react"
import path from "path";
import { defineConfig } from "vite";
// import react, svelte and other needs...

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
    optimizeDeps: {
      // 👈 optimizedeps
      esbuildOptions: {
        target: "esnext",
        // Node.js global to browser globalThis
        define: {
          global: "globalThis",
        },
        supported: {
          bigint: true,
        },
      },
    },

    build: {
      target: ["esnext"], // 👈 build.target
    },
  });
};
