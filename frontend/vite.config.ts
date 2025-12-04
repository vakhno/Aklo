import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
	server: {
		host: "0.0.0.0",
		port: 5173,
		watch: {
			usePolling: true,
			interval: 100
		},
		allowedHosts: ["requiring-meanwhile-dana-say.trycloudflare.com"]
	},
	plugins: [tanstackRouter({ target: "react", autoCodeSplitting: true }), react(), tailwindcss(), tsconfigPaths()]
});
