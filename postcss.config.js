/**
 * PostCSS Configuration File
 * 
 * PostCSS is a tool for transforming CSS with JavaScript plugins.
 * It acts as a pipeline that processes your CSS through various transformations.
 * This config file tells PostCSS which plugins to use and in what order.
 * 
 * PostCSS is commonly used for:
 * - Adding vendor prefixes automatically (autoprefixer)
 * - Processing modern CSS features for browser compatibility
 * - Integrating CSS frameworks like Tailwind CSS
 * - Optimizing CSS for production (minification, purging unused styles)
 * - Enabling CSS-in-JS transformations
 */

/**
 * PostCSS Configuration Export
 * 
 * This configuration object defines which PostCSS plugins should be applied
 * to your CSS files during the build process. Plugins are executed in the
 * order they appear in the plugins object.
 */
export default {
  /**
   * Plugins Configuration Object
   * 
   * Each key represents a PostCSS plugin name, and the value contains
   * the plugin's configuration options. An empty object {} means
   * "use this plugin with its default settings".
   */
  plugins: {
    /**
     * Tailwind CSS Plugin
     * 
     * Tailwind CSS is a utility-first CSS framework that works as a PostCSS plugin.
     * This plugin:
     * - Processes Tailwind directives (@tailwind base, @tailwind components, @tailwind utilities)
     * - Generates utility classes based on your tailwind.config.js
     * - Purges unused styles in production builds
     * - Applies design system constraints (spacing, colors, typography, etc.)
     * 
     * The empty object {} tells the plugin to use default configuration,
     * which will look for tailwind.config.js in the project root.
     */
    tailwindcss: {},
    
    /**
     * Autoprefixer Plugin
     * 
     * Autoprefixer automatically adds vendor prefixes to CSS properties
     * based on browser compatibility data from Can I Use.
     * 
     * For example, it transforms:
     *   display: flex;
     * Into:
     *   display: -webkit-box;
     *   display: -ms-flexbox;
     *   display: flex;
     * 
     * This ensures your CSS works across different browsers without
     * manually writing vendor prefixes. The plugin uses browserslist
     * configuration to determine which prefixes are needed.
     * 
     * The empty object {} uses default browserslist settings, typically
     * defined in package.json or a .browserslistrc file.
     */
    autoprefixer: {},
  },
}
