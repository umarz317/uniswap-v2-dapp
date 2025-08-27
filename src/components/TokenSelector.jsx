
/**
 * TokenSelector Component
 * 
 * This reusable component provides an interface for users to input token amounts
 * and select different tokens in a DEX trading application. It demonstrates
 * several important React patterns for building flexible, reusable components.
 * 
 * Key React Concepts Demonstrated:
 * - Props: Receiving data and callbacks from parent components
 * - Component Reusability: Same component used for "From" and "To" tokens
 * - Event Handling: Managing user input and button clicks
 * - Controlled Components: Input value controlled by parent state
 * - Callback Props: Communicating user actions back to parent
 * 
 * DEX Trading Concepts:
 * - Token Selection: Choosing which cryptocurrency to trade
 * - Amount Input: Specifying how much of a token to trade
 * - Balance Display: Showing user's current token holdings
 */

/**
 * TokenSelector Functional Component
 * 
 * A reusable component that combines amount input and token selection functionality.
 * This component is "controlled" - all its data comes from props, and all changes
 * are communicated back to the parent through callback functions.
 * 
 * @param {Object} props - The component props
 * @param {string} props.label - Display label ("From" or "To")
 * @param {Object} props.token - Token object with symbol and balance properties
 * @param {string} props.amount - Current amount value (controlled by parent)
 * @param {Function} props.onAmountChange - Callback when amount input changes
 * @param {Function} props.onSelectToken - Callback when token selector is clicked
 * @returns {JSX.Element} The rendered token selector interface
 */
export default function TokenSelector({
  label,
  token,
  amount,
  onAmountChange,
  onSelectToken,
}) {
  /**
   * Component Render Return
   * 
   * Returns JSX that creates a token selection interface with:
   * - Label and balance display
   * - Amount input field
   * - Token selection button
   */
  return (
    /**
     * Main Container
     * 
     * Tailwind classes breakdown:
     * - bg-gray-50: Light gray background to distinguish from parent
     * - p-4: Padding of 1rem (16px) on all sides
     * - rounded-lg: Medium border radius for rounded corners
     * 
     * This creates a visually distinct section for each token selector.
     */
    <div className="bg-gray-50 p-4 rounded-lg">
      {/**
       * Label and Balance Header
       * 
       * Tailwind classes breakdown:
       * - flex justify-between: Creates a flexbox with space between items
       * - text-sm font-medium text-gray-600: Small, medium-weight gray text
       * 
       * This header shows the token type (From/To) and current balance.
       */}
      <label className="flex justify-between text-sm font-medium text-gray-600">
        {/**
         * Dynamic Label Display
         * 
         * {label} renders the prop value, typically "From" or "To".
         * This makes the component reusable for both input and output tokens.
         */}
        <span>{label}</span>
        
        {/**
         * Balance Display
         * 
         * Shows the user's current balance for the selected token.
         * {token.balance} accesses the balance property from the token object prop.
         * This helps users understand how much they can trade.
         */}
        <span>Balance: {token.balance}</span>
      </label>
      
      {/**
       * Input and Button Container
       * 
       * flex class creates a horizontal layout for the input and button.
       * mt-2 adds top margin for spacing from the header.
       */}
      <div className="mt-2 flex">
        {/**
         * Amount Input Field
         * 
         * This is a controlled component - its value comes from props.amount
         * and changes are handled by the onAmountChange callback.
         * 
         * Key attributes:
         * - type="number": Provides numeric input with validation
         * - step="any": Allows decimal values (not just integers)
         * - value={amount}: Controlled by parent component state
         * - onChange: Calls parent callback with new value
         * 
         * Tailwind classes breakdown:
         * - flex-1: Takes up remaining space in flex container
         * - bg-transparent: No background color
         * - outline-none: Removes default browser focus outline
         * - text-lg font-medium: Large, medium-weight text
         * - border-2 border-gray-300: Gray border with 2px width
         * - rounded-lg: Medium border radius
         * - px-2 py-1.5: Horizontal padding 0.5rem, vertical padding 0.375rem
         * - text-gray-900: Dark gray text color
         */}
        <input
          type="number"
          step="any"
          className="flex-1 bg-transparent outline-none text-lg font-medium border-2 border-gray-300 rounded-lg px-2 py-1.5 text-gray-900"
          placeholder="0.0"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
        />
        
        {/**
         * Token Selection Button
         * 
         * This button allows users to change which token is selected.
         * Currently, it calls onSelectToken with the same token, but could
         * be extended to show a token selection modal or dropdown.
         * 
         * Key attributes:
         * - type="button": Prevents form submission if inside a form
         * - onClick: Calls the onSelectToken callback with current token
         * 
         * Tailwind classes breakdown:
         * - ml-2: Left margin of 0.5rem for spacing from input
         * - bg-white: White background
         * - border-2 border-gray-300: Gray border with 2px width
         * - px-3: Horizontal padding of 0.75rem
         * - rounded-lg: Medium border radius
         * - hover:bg-gray-200: Gray background on hover
         * - transition: Smooth transitions for hover effects
         */}
        <button
          type="button"
          onClick={() => {
            /**
             * Token Selection Handler
             * 
             * Calls the onSelectToken callback prop with the current token.
             * This allows the parent component to handle token selection logic,
             * such as opening a modal to choose different tokens.
             */
            onSelectToken(token);
          }}
          className="ml-2 bg-white border-2 border-gray-300 px-3 rounded-lg hover:bg-gray-200 transition"
        >
          {/**
           * Token Symbol Display
           * 
           * {token.symbol} displays the token's symbol (e.g., "ETH", "DAI").
           * This provides a clear indication of which token is currently selected.
           */}
          {token.symbol}
        </button>
      </div>
    </div>
  );
}
