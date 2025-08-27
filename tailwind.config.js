/**
 * Tailwind CSS Configuration File
 * 
 * Tailwind CSS is a utility-first CSS framework that provides low-level utility classes
 * to build custom designs without writing custom CSS. This configuration file customizes
 * Tailwind's default design system and controls how the framework generates utility classes.
 * 
 * Key Concepts:
 * - Utility-first: Build designs using small, single-purpose utility classes
 * - Responsive design: Built-in responsive variants for all utilities
 * - Design system: Consistent spacing, colors, typography, and component sizing
 * - Customizable: Extend or override default values to match your design needs
 * - Production optimization: Automatically purges unused styles for smaller bundles
 */

/** 
 * TypeScript Type Annotation
 * 
 * This JSDoc comment provides TypeScript intellisense and type checking for the config object.
 * It imports the Config type from Tailwind CSS to ensure proper configuration structure.
 */
/** @type {import('tailwindcss').Config} */

/**
 * Tailwind Configuration Export
 * 
 * This configuration object controls how Tailwind CSS generates utility classes
 * and processes your styles. The configuration affects both development and
 * production builds.
 */
export default {
  /**
   * Content Configuration
   * 
   * The content array tells Tailwind which files to scan for CSS class usage.
   * Tailwind uses this to determine which styles to include in the final CSS bundle.
   * In production builds, only classes found in these files will be included (tree-shaking).
   * 
   * Glob patterns included:
   * - "./index.html" - The main HTML entry point
   * - "./src/**\/*.{js,ts,jsx,tsx}" - All JavaScript/TypeScript files in src and subdirectories
   * 
   * This ensures Tailwind finds classes in:
   * - React component JSX
   * - Template literals and dynamic class names
   * - Any string that contains Tailwind class names
   */
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  
  /**
   * Theme Configuration
   * 
   * The theme section allows you to customize Tailwind's default design system.
   * You can override default values or add new values to any theme section.
   * 
   * Common theme sections include:
   * - colors: Color palette for text, backgrounds, borders, etc.
   * - spacing: Padding, margin, width, height values
   * - fontFamily: Font stacks for different font weights
   * - fontSize: Font size and line-height combinations
   * - screens: Responsive breakpoints for mobile-first design
   */
  theme: {
    /**
     * Extend Configuration
     * 
     * The extend object allows you to add new values to Tailwind's default theme
     * without overriding the existing values. This is usually preferred over
     * completely replacing theme sections.
     * 
     * Currently empty, but you could add custom values like:
     * 
     * extend: {
     *   colors: {
     *     'brand-blue': '#1fb6ff',
     *     'brand-purple': '#7e5bef',
     *   },
     *   spacing: {
     *     '128': '32rem',
     *     '144': '36rem',
     *   },
     *   fontFamily: {
     *     'custom': ['CustomFont', 'sans-serif'],
     *   }
     * }
     * 
     * This would generate new utility classes like:
     * - text-brand-blue, bg-brand-blue
     * - p-128, m-128 (32rem padding/margin)
     * - font-custom
     */
    extend: {},
  },
  
  /**
   * Plugins Configuration
   * 
   * Plugins extend Tailwind with additional utility classes, components, or functionality.
   * They can add new utility classes, modify existing ones, or add component styles.
   * 
   * Popular plugins include:
   * - @tailwindcss/forms: Better form element styling
   * - @tailwindcss/typography: Rich text styling with prose classes
   * - @tailwindcss/aspect-ratio: Aspect ratio utilities
   * - @tailwindcss/line-clamp: Text truncation utilities
   * 
   * Example usage:
   * plugins: [
   *   require('@tailwindcss/forms'),
   *   require('@tailwindcss/typography'),
   * ]
   * 
   * Currently empty array means no additional plugins are loaded,
   * using only Tailwind's core utilities.
   */
  plugins: [],
};
