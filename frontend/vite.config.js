import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    server    : {
        proxy: {
            "/api"    : {
                target: "http://localhost:8000", changeOrigin: true
            }, "/auth": {
                target: "http://localhost:8000", changeOrigin: true
            }
        }
    }, plugins: [react()], resolve: {
        // extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    }
});
