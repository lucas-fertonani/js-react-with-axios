import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true, // ou '0.0.0.0' para aceitar conexões externas
    port: 5173, // porta padrão, pode alterar se necessário
    strictPort: false,
    allowedHosts: [
      ".ngrok-free.app",
      ".ngrok.io",
      ".ngrok-free.dev",
      // ou simplesmente:
      // '*' // permite qualquer host
    ],
  },
});
