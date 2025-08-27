/**
 * Vite Configuration File
 * 
 * Vite is a modern, fast build tool and development server for frontend projects.
 * It provides lightning-fast hot module replacement (HMR) during development
 * and optimized production builds using Rollup under the hood.
 * 
 * Key Features:
 * - Instant server start (no bundling in development)
 * - Lightning-fast Hot Module Replacement (HMR)
 * - Rich feature set with plugin ecosystem
 * - Optimized builds with tree-shaking and code splitting
 * - Built-in TypeScript support
 */

// Import the main configuration function from Vite
// defineConfig provides TypeScript intellisense and type checking for the config
import { defineConfig } from 'vite'

// Import the official React plugin for Vite
// This plugin provides React Fast Refresh, JSX transformation, and React-specific optimizations
import react from '@vitejs/plugin-react'

/**
 * Vite Configuration Export
 * 
 * This configuration object defines how Vite should build and serve your application.
 * The configuration is used for both development and production modes.
 * 
 * For more configuration options, visit: https://vite.dev/config/
 */
export default defineConfig({
  /**
   * Plugins Array
   * 
   * Plugins extend Vite's functionality. They can:
   * - Transform files during development and build
   * - Add new file type support
   * - Provide framework-specific features
   * - Integrate with external tools
   */
  plugins: [
    /**
     * React Plugin
     * 
     * The @vitejs/plugin-react plugin provides:
     * - JSX transformation (converts JSX to regular JavaScript)
     * - React Fast Refresh for instant component updates without losing state
     * - Automatic React import detection (no need to import React in every file)
     * - React Developer Tools integration
     * 
     * This plugin uses esbuild for super-fast JSX transformation in development
     * and ensures your React app works seamlessly with Vite's build system.
     */
    react()
  ],
  
  /**
   * Additional Configuration Options (currently using defaults)
   * 
   * Other common options you might add here include:
   * 
   * - server: Configure the development server (port, host, proxy, etc.)
   * - build: Customize the production build (output directory, minification, etc.)
   * - resolve: Configure module resolution (aliases, extensions, etc.)
   * - define: Define global constants replaced at build time
   * - css: Configure CSS processing (preprocessors, modules, etc.)
   * - optimizeDeps: Configure dependency pre-bundling for faster dev server startup
   */
})
