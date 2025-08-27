/**
 * SettingsModal Component
 * 
 * This component renders a modal dialog for configuring trading settings in a DEX application.
 * It demonstrates several important React patterns and concepts for building interactive UIs.
 * 
 * Key React Concepts Demonstrated:
 * - useState Hook: Managing component state
 * - Props: Receiving data and callbacks from parent components
 * - Event Handling: Responding to user interactions
 * - Controlled Components: Form inputs controlled by React state
 * - Modal Pattern: Overlay dialogs for focused interactions
 * 
 * DEX Trading Concepts:
 * - Slippage Tolerance: Maximum acceptable price change during trade execution
 * - Transaction Deadline: Maximum time before a transaction expires
 */

// Import useState hook for managing component state
// useState is the most commonly used React hook for adding state to functional components
import { useState } from "react";

/**
 * SettingsModal Functional Component
 * 
 * A modal dialog component for configuring trading parameters. This component uses
 * local state to manage form values and communicates with its parent through props.
 * 
 * @param {Object} props - The component props
 * @param {Function} props.onClose - Callback function to close the modal, passed from parent
 * @param {Object} props.currentSettings - Current settings object with slippage and deadline values
 * @param {Function} props.onSaveSettings - Callback function to save settings, passed from parent
 * @returns {JSX.Element} The rendered modal dialog
 */
export default function SettingsModal({ onClose, currentSettings, onSaveSettings }) {
  /**
   * State Management with useState Hook
   * 
   * useState returns an array with two elements:
   * 1. The current state value
   * 2. A setter function to update the state
   * 
   * When state updates, React re-renders the component with the new values.
   */
  
  /**
   * Slippage Tolerance State
   * 
   * Slippage tolerance is the maximum percentage difference between expected 
   * and actual trade execution price that a user is willing to accept.
   * 
   * Example: 0.5% slippage on a $100 trade means the actual price can be 
   * between $99.50 and $100.50.
   * 
   * Initial value: Uses current settings or defaults to 0.5 (representing 0.5%)
   */
  const [slippage, setSlippage] = useState(currentSettings?.slippage || 0.5);
  
  /**
   * Transaction Deadline State
   * 
   * Transaction deadline is the maximum time (in minutes) that a transaction
   * can remain pending before it expires and gets reverted.
   * 
   * This prevents transactions from being executed at stale prices if
   * network congestion causes significant delays.
   * 
   * Initial value: Uses current settings or defaults to 20 (representing 20 minutes)
   */
  const [deadline, setDeadline] = useState(currentSettings?.deadline || 20);

  /**
   * Handle Save Settings
   * 
   * Saves the current form values and closes the modal
   */
  const handleSave = () => {
    onSaveSettings({
      slippage: parseFloat(slippage),
      deadline: parseInt(deadline)
    });
    onClose();
  };

  /**
   * Component Render Return
   * 
   * Returns JSX that creates a modal overlay with a settings form.
   * The modal uses a backdrop-blur pattern for better user experience.
   */
  return (
    /**
     * Modal Overlay Container
     * 
     * Tailwind classes breakdown:
     * - fixed: Positions the element relative to the viewport
     * - inset-0: Sets top, right, bottom, left to 0 (full screen coverage)
     * - bg-black bg-opacity-50: Semi-transparent black backdrop
     * - flex items-center justify-center: Centers the modal content
     * 
     * This creates a full-screen overlay that dims the background content
     * and focuses attention on the modal.
     */
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      {/**
       * Modal Content Container
       * 
       * Tailwind classes breakdown:
       * - bg-white: White background for the modal content
       * - rounded-2xl: Large border radius for modern rounded corners
       * - p-6: Padding of 1.5rem (24px) on all sides
       * - w-80: Fixed width of 20rem (320px)
       * 
       * This creates the actual modal dialog box with proper spacing and styling.
       */}
      <div className="bg-white rounded-2xl p-6 w-80">
        {/**
         * Modal Header
         * 
         * Simple heading that clearly identifies the modal's purpose.
         * Uses semantic HTML (h3) for proper document structure.
         */}
        <h3 className="text-lg font-semibold mb-4">Settings</h3>
        
        {/**
         * Form Fields Container
         * 
         * space-y-4 class adds consistent vertical spacing (1rem) between child elements.
         * This is more maintainable than manually adding margins to each field.
         */}
        <div className="space-y-4">
          {/**
           * Slippage Tolerance Input Field
           * 
           * This section demonstrates a controlled component pattern where:
           * - Input value is controlled by React state (slippage)
           * - Changes trigger state updates via onChange handler
           * - React re-renders the component when state changes
           */}
          <div>
            <label className="text-sm text-gray-600">
              Slippage Tolerance (%)
            </label>
            {/**
             * Controlled Number Input
             * 
             * Key attributes:
             * - type="number": Provides numeric input validation and UI
             * - value={slippage}: Controlled by React state (single source of truth)
             * - onChange: Event handler that updates state when user types
             * 
             * The onChange handler receives a SyntheticEvent object, and we
             * access the new value via e.target.value.
             */}
            <input
              type="number"
              className="mt-1 w-full border border-gray-400 rounded-lg p-2"
              value={slippage}
              onChange={(e) => setSlippage(e.target.value)}
            />
          </div>
          
          {/**
           * Transaction Deadline Input Field
           * 
           * Similar controlled component pattern as slippage field.
           * Maintains consistency in form handling throughout the component.
           */}
          <div>
            <label className="text-sm text-gray-600">
              Transaction Deadline (mins)
            </label>
            <input
              type="number"
              className="mt-1 w-full border border-gray-400 rounded-lg p-2"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
        </div>
        
        {/**
         * Modal Footer with Action Button
         * 
         * flex justify-end: Aligns button to the right side
         * This follows common modal patterns where action buttons are right-aligned.
         */}
        <div className="mt-6 flex justify-end space-x-3">
          {/**
           * Cancel Button
           * 
           * onClick={onClose}: Calls the callback function passed from parent component
           * This demonstrates "lifting state up" pattern - the parent controls
           * whether the modal is open/closed, and this component notifies the
           * parent when the user wants to close it.
           */}
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:underline"
          >
            Cancel
          </button>
          
          {/**
           * Save Button
           * 
           * onClick={handleSave}: Saves the settings and closes the modal
           * Primary button styling to indicate it's the main action
           */}
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
