import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'node:fs'

// Treat local .md article files as JS modules exporting their raw content,
// so import.meta.glob can load them without the ?raw query (which breaks build).
function rawMarkdownPlugin() {
  return {
    name: 'raw-markdown',
    load(id) {
      if (id.endsWith('.md')) {
        const content = fs.readFileSync(id, 'utf-8');
        return `export default ${JSON.stringify(content)}`;
      }
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error', // Suppress warnings, only show errors
  plugins: [
    base44({
      // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
      // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      visualEditAgent: true
    }),
    react(),
    rawMarkdownPlugin(),
  ]
});