/**
 * Main Entry Point - React Application Bootstrap
 * 
 * This file serves as the entry point for the React application. It's responsible for:
 * - Mounting the React application to the DOM
 * - Setting up the application's provider context
 * - Configuring development tools and strict mode
 * - Importing global styles
 * 
 * Key React 18 Concepts:
 * - createRoot API: New concurrent rendering API for React 18+
 * - StrictMode: Development tool for identifying potential problems
 * - Provider Pattern: Context providers for sharing state across components
 * - Component Tree: Hierarchical structure of React components
 */

// Import StrictMode from React core
// StrictMode is a development tool that helps identify potential problems in the application
import { StrictMode } from 'react'

// Import the new createRoot API from React 18's client rendering package
// This replaces the older ReactDOM.render() method and enables concurrent features
import { createRoot } from 'react-dom/client'

// Import global CSS styles
// This CSS file typically contains Tailwind CSS imports and any global styles
import './index.css'

// Import the main App component
// This is the root component of our React application
import App from './App.jsx'

// Import the Web3 wallet provider component
// This provider sets up wallet connection functionality using AppKit/WalletConnect
import { AppKitProvider } from './providers/AppkitProvider.jsx'

/**
 * Application Bootstrap Process
 * 
 * This section handles the actual mounting of the React application to the DOM.
 * The process follows this pattern:
 * 1. Find the DOM element with id 'root' (defined in index.html)
 * 2. Create a React root using the new concurrent rendering API
 * 3. Render the component tree inside React.StrictMode
 * 4. Wrap components in necessary providers for shared functionality
 */

/**
 * Create React Root and Render Application
 * 
 * createRoot() enables React 18's concurrent features like:
 * - Automatic batching of state updates
 * - Suspense for better loading states  
 * - startTransition for non-urgent updates
 * - Time slicing for better performance
 */
createRoot(document.getElementById('root')).render(
  /**
   * React StrictMode Wrapper
   * 
   * StrictMode is a development-only component that helps identify potential issues:
   * - Identifies components with unsafe lifecycles
   * - Warns about legacy string ref API usage  
   * - Warns about deprecated findDOMNode usage
   * - Detects unexpected side effects by double-invoking functions
   * - Detects legacy context API usage
   * 
   * Note: StrictMode intentionally double-invokes functions like:
   * - Component constructors, render methods, state updaters
   * - useState, useMemo, useReducer initializers
   * This helps detect side effects and ensures your code works with concurrent rendering.
   */
  <StrictMode>
    {/**
     * AppKitProvider - Web3 Wallet Integration
     * 
     * This provider component sets up the Web3 wallet connection infrastructure:
     * - Configures supported blockchain networks
     * - Manages wallet connection state
     * - Provides hooks for wallet interactions (useAccount, useBalance, etc.)
     * - Handles wallet connection UI and user experience
     * 
     * The provider pattern allows any child component to access wallet functionality
     * through React context, eliminating prop drilling for wallet-related data.
     */}
    <AppKitProvider>
      {/**
       * App Component - Main Application
       * 
       * The App component serves as the main application container.
       * It's wrapped by providers, giving it access to:
       * - Web3 wallet functionality via AppKitProvider
       * - React's development tools via StrictMode
       * 
       * This component hierarchy demonstrates the provider pattern:
       * StrictMode -> AppKitProvider -> App -> (other components)
       * 
       * Each level of nesting provides specific functionality to child components.
       */}
      <App />
    </AppKitProvider>
  </StrictMode>,
)
