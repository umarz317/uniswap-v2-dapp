/**
 * ConnectWalletButton Component
 * 
 * This component provides a user interface for connecting Web3 wallets to the application.
 * It demonstrates integration with modern Web3 libraries and React hooks for managing
 * blockchain wallet connectivity in decentralized applications (dApps).
 * 
 * Key Web3 Concepts:
 * - Wallet Connection: Linking user's cryptocurrency wallet to the dApp
 * - Account Management: Tracking wallet connection state
 * - User Experience: Providing clear feedback during connection process
 * 
 * Key React Concepts:
 * - Custom Hooks: Using hooks from Web3 libraries
 * - Conditional Rendering: Showing different button states
 * - Event Handling: Responding to user wallet connection requests
 * - Component State: Reacting to external state changes (wallet status)
 */

// Import the useAppKit hook from Reown AppKit (formerly WalletConnect)
// This hook provides methods to open the wallet connection modal
import { useAppKit } from "@reown/appkit/react";

// Import the useAccount hook from Wagmi (Web3 React library)
// This hook provides information about the currently connected wallet account
import { useAccount } from "wagmi";

/**
 * ConnectWalletButton Functional Component
 * 
 * A button component that manages wallet connection state and provides
 * appropriate user interface feedback based on the current connection status.
 * 
 * The component uses Web3 hooks to:
 * - Access wallet connection methods
 * - Monitor connection state
 * - Provide real-time feedback to users
 * 
 * @returns {JSX.Element} The rendered wallet connection button
 */
export default function ConnectWalletButton() {
  /**
   * AppKit Hook Usage
   * 
   * useAppKit provides methods to interact with the AppKit wallet modal.
   * The 'open' function triggers the wallet selection and connection interface.
   * 
   * AppKit (formerly WalletConnect) supports multiple wallet types:
   * - Browser extension wallets (MetaMask, Coinbase Wallet, etc.)
   * - Mobile wallets via QR code scanning
   * - Hardware wallets (Ledger, Trezor)
   * - Web3 social login options
   */
  const { open } = useAppKit()
  
  /**
   * Account State Hook Usage
   * 
   * useAccount provides real-time information about wallet connection status:
   * - isConnected: Boolean indicating if a wallet is currently connected
   * - isConnecting: Boolean indicating if a connection attempt is in progress
   * - address: The connected wallet address (when connected)
   * - connector: Information about which wallet/method is being used
   * 
   * This hook automatically updates when wallet state changes, causing
   * the component to re-render with updated information.
   */
  const { isConnected, isConnecting } = useAccount()
  
  /**
   * Component Render Return
   * 
   * Returns a button that changes its appearance and text based on wallet state.
   * The button uses conditional rendering to show appropriate messages.
   */
  return (
    /**
     * Wallet Connection Button
     * 
     * Key attributes:
     * - onClick={() => open()}: Triggers the AppKit wallet connection modal
     * - className: Tailwind CSS classes for styling
     * 
     * Tailwind classes breakdown:
     * - w-full: Full width of container
     * - border border-blue-600: Blue border with 1px width  
     * - text-blue-600: Blue text color
     * - py-2: Vertical padding of 0.5rem
     * - rounded-lg: Medium border radius for rounded corners
     * - font-medium: Medium font weight
     * - hover:bg-blue-50: Light blue background on hover
     * - transition: Smooth transitions for hover effects
     * 
     * The button style uses a "ghost" button pattern (border + text color, 
     * transparent background) which is common for secondary actions.
     */
    <button 
      onClick={() => open()} 
      className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition"
    >
      {/**
       * Conditional Button Text Rendering
       * 
       * This uses JavaScript's ternary operator to show different text based on
       * wallet connection state. The logic follows this priority:
       * 
       * 1. If isConnected is true → Show "Connected"
       * 2. Else if isConnecting is true → Show "Connecting..."  
       * 3. Else → Show "Connect Wallet"
       * 
       * This provides clear feedback to users about the current state:
       * - "Connect Wallet": Initial state, prompts user action
       * - "Connecting...": Feedback during connection process
       * - "Connected": Confirmation of successful connection
       * 
       * The button remains clickable in all states, allowing users to:
       * - Initiate connection when disconnected
       * - Cancel connection attempts
       * - Switch wallets or disconnect when connected
       */}
      {isConnected ? "Connected" : isConnecting ? "Connecting..." : 'Connect Wallet'}
    </button>
  );
}
