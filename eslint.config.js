/**
 * ESLint Configuration File
 * 
 * ESLint is a static analysis tool that finds and reports on patterns in JavaScript/JSX code.
 * This configuration file uses the new "flat config" format (ESLint 9+) which replaces
 * the older .eslintrc.* configuration files with a more flexible, JavaScript-based approach.
 * 
 * Key Benefits:
 * - Catches common coding errors and potential bugs
 * - Enforces consistent coding style across the project
 * - Provides React-specific linting for hooks and component patterns
 * - Integrates with development tools for real-time feedback
 */

// Import the base JavaScript recommended rules from ESLint's core
import js from '@eslint/js'

// Import predefined global variables for different environments (browser, node, etc.)
import globals from 'globals'

// Import React Hooks linting plugin to enforce Rules of Hooks
// This prevents common mistakes like calling hooks conditionally or in loops
import reactHooks from 'eslint-plugin-react-hooks'

// Import React Refresh plugin for better hot reloading during development
// Ensures components are exported properly for Fast Refresh to work
import reactRefresh from 'eslint-plugin-react-refresh'

/**
 * ESLint Flat Configuration Array
 * 
 * The new flat config format uses an array of configuration objects.
 * Each object can specify different rules for different file patterns.
 * Configurations are processed in order, with later configs overriding earlier ones.
 */
export default [
  /**
   * Ignore Configuration
   * 
   * Tells ESLint to skip linting files in the 'dist' directory.
   * The dist folder typically contains built/compiled code that shouldn't be linted.
   */
  { ignores: ['dist'] },
  
  /**
   * Main Configuration Object
   * 
   * This configuration applies to all JavaScript and JSX files in the project.
   */
  {
    // File pattern matching - applies this config to all .js and .jsx files recursively
    files: ['**/*.{js,jsx}'],
    
    /**
     * Language Options
     * 
     * Configures how ESLint parses and understands the JavaScript code.
     */
    languageOptions: {
      // Set ECMAScript version for syntax features (2020 = ES11)
      ecmaVersion: 2020,
      
      // Define global variables available in browser environment
      // This prevents ESLint from flagging browser APIs like 'window', 'document' as undefined
      globals: globals.browser,
      
      /**
       * Parser Options
       * 
       * Additional parsing configuration for modern JavaScript features.
       */
      parserOptions: {
        // Use the latest ECMAScript version for cutting-edge features
        ecmaVersion: 'latest',
        
        // Enable JSX syntax parsing for React components
        ecmaFeatures: { jsx: true },
        
        // Use ES modules (import/export) instead of CommonJS (require/module.exports)
        sourceType: 'module',
      },
    },
    
    /**
     * Plugins Configuration
     * 
     * Plugins extend ESLint with additional rules and functionality.
     * They must be imported above and registered here with a custom namespace.
     */
    plugins: {
      // Register React Hooks plugin with 'react-hooks' namespace
      'react-hooks': reactHooks,
      
      // Register React Refresh plugin with 'react-refresh' namespace  
      'react-refresh': reactRefresh,
    },
    
    /**
     * Rules Configuration
     * 
     * Rules define what ESLint should check for and how to respond.
     * Rule values can be: 'off'/0, 'warn'/1, or 'error'/2
     * Some rules accept additional configuration options as arrays.
     */
    rules: {
      // Spread in all recommended JavaScript rules from ESLint core
      // These cover basic syntax errors, potential bugs, and common best practices
      ...js.configs.recommended.rules,
      
      // Spread in all recommended React Hooks rules
      // Includes rules like 'rules-of-hooks' and 'exhaustive-deps'
      ...reactHooks.configs.recommended.rules,
      
      /**
       * Custom Rule: No Unused Variables
       * 
       * Prevents declaring variables that are never used, with an exception:
       * Variables starting with uppercase letters or underscores are ignored.
       * This is useful for React components or constants that might be temporarily unused.
       */
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      
      /**
       * React Refresh Rule
       * 
       * Ensures components are properly exported for Fast Refresh to work.
       * Fast Refresh preserves component state during hot reloading in development.
       * 'allowConstantExport: true' permits exporting constants alongside components.
       */
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
