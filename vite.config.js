import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'node:fs'

// Load local .md article files as JS modules exporting their raw content.
// Handles both plain ".md" and ".md?raw" ids so it works whether or not the
// glob uses the ?raw query, and avoids the Vite build import-analysis error.
function rawMarkdownPlugin() {
  return {
    name: 'raw-markdown',
    enforce: 'pre',
    load(id) {
      const cleanId = id.replace(/\?raw$/, '');
      if (cleanId.endsWith('.md')) {
        const content = fs.readFileSync(cleanId, 'utf-8');
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