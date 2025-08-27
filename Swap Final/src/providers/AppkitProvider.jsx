/**
 * AppKitProvider - Web3 Wallet Integration Setup
 * 
 * This file sets up the Web3 wallet connection infrastructure for the React application.
 * It configures AppKit (formerly WalletConnect) to provide wallet connectivity, network
 * management, and blockchain interaction capabilities.
 * 
 * Key Web3 Concepts:
 * - Wallet Connection: Enabling users to connect their crypto wallets
 * - Network Configuration: Defining which blockchains the app supports
 * - Provider Pattern: Sharing Web3 state across the entire React app
 * - Query Management: Caching and synchronizing blockchain data
 * 
 * Key React Concepts:
 * - Context Providers: Sharing state across component tree
 * - Provider Composition: Nesting multiple providers for different functionality
 * - Configuration Objects: Setting up external libraries
 */

// Import AppKit core functionality for wallet connection UI and management
import { createAppKit } from '@reown/appkit/react'

// Import Wagmi provider for React integration with Ethereum
// Wagmi provides React hooks for wallet connections, transactions, and contract calls
import { WagmiProvider } from 'wagmi'

// Import Anvil network configuration (local Ethereum testnet)
import { anvil } from '@reown/appkit/networks'

// Import React Query for caching and synchronizing server state (blockchain data)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Import Wagmi adapter that bridges AppKit and Wagmi
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// Import HTTP transport for connecting to blockchain RPC endpoints
import { http } from 'viem'

/**
 * React Query Client Setup
 * 
 * QueryClient manages caching, background updates, and synchronization of server state.
 * In Web3 apps, this includes blockchain data like balances, transaction history, etc.
 * 
 * Benefits:
 * - Automatic background refetching of blockchain data
 * - Caching to reduce RPC calls and improve performance
 * - Loading and error states for better UX
 * - Optimistic updates for better perceived performance
 */
const queryClient = new QueryClient()

/**
 * AppKit Project ID
 * 
 * This ID is obtained from https://cloud.reown.com and identifies your project
 * to the AppKit/WalletConnect infrastructure. It enables:
 * - Wallet connection relay services
 * - Push notifications for mobile wallets
 * - Analytics and usage tracking
 * - Project-specific configuration
 */
const projectId = '7ca7cf94ee5b1caba51b405ce99386f0'

/**
 * Application Metadata
 * 
 * This metadata object provides information about your dApp that will be
 * displayed to users when they connect their wallets. It helps build trust
 * and provides context about what they're connecting to.
 * 
 * Fields:
 * - name: Display name of your application
 * - description: Brief description of your app's purpose
 * - url: Your application's URL (must match actual domain for security)
 * - icons: Array of icon URLs to display in wallet connection prompts
 */
const metadata = {
    name: 'AppKit',
    description: 'AppKit Example',
    url: 'https://example.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/179229932']
}

/**
 * Custom Network Configuration
 * 
 * Creates a modified version of the Anvil network (local Ethereum testnet)
 * with a custom chain ID. This allows the app to work with local blockchain
 * instances while maintaining compatibility with mainnet contract addresses.
 * 
 * The spread operator (...anvil) copies all properties from the anvil config,
 * then overrides the id to 1 (mainnet's chain ID) to work with mainnet contracts.
 */
export const anvilFork = {
    ...anvil,
    id: 1 // Override chain ID to 1 (mainnet) for contract compatibility
}

/**
 * Supported Networks Array
 * 
 * Defines which blockchain networks your application supports.
 * Users will be able to switch between these networks within the wallet UI.
 * Currently only supports the custom Anvil fork configuration.
 */
const networks = [anvilFork]

/**
 * Wagmi Adapter Configuration
 * 
 * The WagmiAdapter bridges AppKit's wallet connection UI with Wagmi's
 * React hooks for blockchain interactions. It configures:
 * 
 * - networks: Which blockchains to support
 * - projectId: AppKit project identifier
 * - ssr: Server-side rendering compatibility
 * - transports: How to connect to each network's RPC endpoints
 */
const wagmiAdapter = new WagmiAdapter({
    networks, // Supported blockchain networks
    projectId, // AppKit project ID for wallet services
    ssr: true, // Enable server-side rendering support
    
    /**
     * Network Transport Configuration
     * 
     * Defines how to connect to each blockchain network.
     * The key is the network's chain ID, and the value is the transport method.
     * http() creates an HTTP transport using the network's default RPC URL.
     */
    transports: {
        [anvilFork.id]: http(anvilFork.rpcUrls.default.http)
    }
})

/**
 * AppKit Modal Creation and Configuration
 * 
 * This creates the wallet connection modal that users will see when
 * connecting their wallets. It combines all the configuration objects
 * above to create a fully functional wallet connection interface.
 * 
 * The createAppKit call sets up:
 * - The wallet selection UI
 * - Network switching capabilities  
 * - Account management features
 * - Connection state management
 */
createAppKit({
    adapters: [wagmiAdapter], // Use Wagmi for blockchain interactions
    networks, // Supported blockchain networks
    projectId, // AppKit project configuration
    metadata, // App information for wallet prompts
    
    /**
     * Feature Configuration
     * 
     * Optional features that can be enabled/disabled:
     * - analytics: Usage tracking and metrics (helps improve the service)
     */
    features: {
        analytics: true // Enable usage analytics (defaults to Cloud configuration)
    }
})

/**
 * AppKitProvider React Component
 * 
 * This provider component wraps the entire React application to provide
 * Web3 functionality to all child components. It demonstrates the provider
 * pattern by composing multiple providers together.
 * 
 * Provider Hierarchy:
 * WagmiProvider (outermost) → QueryClientProvider → children
 * 
 * This setup ensures that:
 * 1. All components have access to Web3 wallet functionality (WagmiProvider)
 * 2. All blockchain data queries are cached and managed (QueryClientProvider)
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} The provider component tree
 */
export function AppKitProvider({ children }) {
    return (
        /**
         * Wagmi Provider
         * 
         * Provides access to wallet connections, account information, balances,
         * and contract interactions throughout the React component tree.
         * Uses the wagmiConfig from our adapter.
         */
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            {/**
             * React Query Provider
             * 
             * Manages caching and synchronization of blockchain data.
             * Nested inside WagmiProvider so queries can access wallet state.
             * All child components can now use React Query hooks for data fetching.
             */}
            <QueryClientProvider client={queryClient}>
                {/**
                 * Application Components
                 * 
                 * All child components now have access to:
                 * - Wallet connection hooks (useAccount, useConnect, etc.)
                 * - Blockchain data hooks (useBalance, useReadContract, etc.)
                 * - Transaction hooks (useWriteContract, useWaitForTransaction, etc.)
                 * - Query management (useQuery, useMutation, etc.)
                 */}
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}