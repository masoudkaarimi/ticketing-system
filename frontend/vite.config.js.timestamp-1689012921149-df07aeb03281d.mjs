// vite.config.js
import { defineConfig } from "file:///D:/Exercise/ticketing-system/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Exercise/ticketing-system/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true
      },
      "/auth": {
        target: "http://localhost:8000",
        changeOrigin: true
      }
    }
  },
  plugins: [react()],
  resolve: {
    // extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxFeGVyY2lzZVxcXFx0aWNrZXRpbmctc3lzdGVtXFxcXGZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxFeGVyY2lzZVxcXFx0aWNrZXRpbmctc3lzdGVtXFxcXGZyb250ZW5kXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9FeGVyY2lzZS90aWNrZXRpbmctc3lzdGVtL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgc2VydmVyICAgIDoge1xuICAgICAgICBwcm94eToge1xuICAgICAgICAgICAgXCIvYXBpXCIgICAgOiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMFwiLCBjaGFuZ2VPcmlnaW46IHRydWVcbiAgICAgICAgICAgIH0sIFwiL2F1dGhcIjoge1xuICAgICAgICAgICAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjgwMDBcIiwgY2hhbmdlT3JpZ2luOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCBwbHVnaW5zOiBbcmVhY3QoKV0sIHJlc29sdmU6IHtcbiAgICAgICAgLy8gZXh0ZW5zaW9uczogW1wiLm1qc1wiLCBcIi5qc1wiLCBcIi50c1wiLCBcIi5qc3hcIiwgXCIudHN4XCIsIFwiLmpzb25cIl0sXG4gICAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlTLFNBQVMsb0JBQW9CO0FBQ3RVLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixRQUFZO0FBQUEsSUFDUixPQUFPO0FBQUEsTUFDSCxRQUFZO0FBQUEsUUFDUixRQUFRO0FBQUEsUUFBeUIsY0FBYztBQUFBLE1BQ25EO0FBQUEsTUFBRyxTQUFTO0FBQUEsUUFDUixRQUFRO0FBQUEsUUFBeUIsY0FBYztBQUFBLE1BQ25EO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUFHLFNBQVM7QUFBQTtBQUFBLEVBRWhDO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
