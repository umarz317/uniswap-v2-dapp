/**
 * Main App Component
 * 
 * This is the root component of the React application. In React applications,
 * all components form a tree structure, and App typically sits at the top of this tree.
 * 
 * Key React Concepts Demonstrated:
 * - Functional Components: Modern React components written as functions
 * - JSX: JavaScript XML syntax for writing component markup
 * - Component Composition: Building complex UIs by combining simpler components
 * - CSS Classes: Using className prop (not class) for styling with Tailwind CSS
 */

// Import React library (required for JSX transformation in older React versions)
// Note: In modern React 17+ with proper build tools, this import is often optional
import React from "react";

// Import the SwapCard component from the components directory
// This demonstrates component composition - App uses SwapCard as a child component
import SwapCard from "./components/SwapCard";

/**
 * App Functional Component
 * 
 * This is a React functional component, which is the modern way to write React components.
 * Functional components are simpler than class components and use hooks for state management.
 * 
 * Component Features:
 * - Pure presentational component (no state or side effects)
 * - Acts as a layout container for the main application
 * - Uses Tailwind CSS for responsive, utility-first styling
 * 
 * @returns {JSX.Element} The rendered JSX for the main application layout
 */
export default function App() {
  /**
   * Component Return Statement
   * 
   * React functional components must return JSX (or null). The JSX describes
   * what the UI should look like. Behind the scenes, JSX is transformed into
   * React.createElement() calls by build tools like Vite.
   */
  return (
    /**
     * Main Container Div
     * 
     * Tailwind CSS classes explanation:
     * - min-h-screen: Minimum height of 100vh (full viewport height)
     * - bg-slate-300: Light gray background color from Tailwind's color palette
     * - flex: Display flex container for flexbox layout
     * - items-center: Align items vertically to center (cross-axis)
     * - justify-center: Align items horizontally to center (main-axis)
     * - p-4: Padding of 1rem (16px) on all sides
     * 
     * This creates a full-screen centered layout with consistent spacing.
     */
    <div className="min-h-screen bg-slate-300 flex items-center justify-center p-4">
      {/*
        SwapCard Component
        
        This renders the main SwapCard component, which contains the token swapping interface.
        Component composition like this allows us to:
        - Keep components focused on single responsibilities
        - Make code more maintainable and testable  
        - Enable component reusability across the application
        - Create clear separation of concerns
      */}
      <SwapCard />
    </div>
  );
}
