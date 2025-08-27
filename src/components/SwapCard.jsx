/**
 * SwapCard Component
 * 
 * This is the main component for a decentralized exchange (DEX) token swapping interface.
 * It demonstrates advanced React patterns, Web3 integration, and DeFi concepts including
 * automated market makers (AMM), liquidity pools, and token trading.
 * 
 * Key React Concepts:
 * - Complex state management with multiple useState hooks
 * - useEffect for side effects and data fetching
 * - Custom hooks from Web3 libraries (Wagmi)
 * - Component composition and prop passing
 * - Async/await operations with error handling
 * 
 * Key Web3/DeFi Concepts:
 * - Token swapping on Uniswap V2 protocol
 * - Price calculation using liquidity pool reserves
 * - Token approvals for smart contract interactions
 * - Transaction execution and receipt handling
 * - Balance fetching for native and ERC-20 tokens
 */

// React core imports
import React, { useState } from "react";

// Component imports - building the UI through composition
import TokenSelector from "./TokenSelector.jsx";
import ConnectWalletButton from "./ConnectWalletButton.jsx";
import SettingsModal from "./SettingsModal.jsx";

// Icon import from Heroicons for the swap button
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";

// Wagmi hooks for Web3 functionality
// Wagmi is a collection of React hooks for Ethereum development
import { useAccount, useBalance, useReadContract, useWriteContract } from "wagmi";

// React useEffect hook for side effects
import { useEffect } from "react";

// Viem utilities for Ethereum interactions
// Viem is a TypeScript interface for Ethereum that works with Wagmi
import { createPublicClient, erc20Abi, formatEther, formatUnits, http, parseEther } from "viem";

// Uniswap SDK Core for token definitions and trade calculations
import { ChainId, CurrencyAmount, Percent, Token, TradeType, WETH9 } from "@uniswap/sdk-core";

// Uniswap V2 SDK for pair, route, and trade logic
import { Pair, Route, Trade } from "@uniswap/v2-sdk";

// Custom network configuration
import { anvilFork } from "../providers/AppkitProvider.jsx";

// Uniswap V2 smart contract ABIs (Application Binary Interfaces)
// ABIs define how to interact with smart contracts
import IUniswapV2PairABI from "@uniswap/v2-periphery/build/IUniswapV2Pair.json"
import IUniswapV2RouterABI from "@uniswap/v2-periphery/build/IUniswapV2Router02.json"

/**
 * DAI Token Contract Address
 * 
 * This is the mainnet address for the DAI stablecoin contract.
 * DAI is a decentralized stablecoin pegged to the US Dollar.
 * Contract addresses are unique identifiers for smart contracts on Ethereum.
 */
const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

/**
 * SwapCard Functional Component
 * 
 * The main component that orchestrates the token swapping interface and logic.
 * This component manages all the state, handles user interactions, and coordinates
 * with smart contracts to execute token swaps.
 */
export default function SwapCard() {
  /**
   * State Management Section
   * 
   * React functional components use hooks to manage state. Each useState call
   * creates a piece of state and a function to update it. When state updates,
   * React re-renders the component with the new values.
   */
  
  /**
   * From Token State
   * 
   * Manages the token being swapped FROM (input token).
   * Contains symbol (token identifier) and balance (user's holdings).
   * Initially set to ETH with a placeholder balance.
   */
  const [fromToken, setFromToken] = useState({
    symbol: "ETH",
    balance: "1.234", // Will be updated with real balance from blockchain
  });
  
  /**
   * To Token State
   * 
   * Manages the token being swapped TO (output token).
   * Initially set to DAI stablecoin.
   */
  const [toToken, setToToken] = useState({ 
    symbol: "DAI", 
    balance: "1000" // Will be updated with real balance from blockchain
  });
  
  /**
   * Amount State Variables
   * 
   * These manage the input and calculated output amounts for the swap.
   * fromAmount: User-entered amount to swap
   * toAmount: Calculated amount user will receive (based on current prices)
   */
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  
  /**
   * UI State Variables
   * 
   * showSettings: Controls visibility of the settings modal
   * isSwappingFromEth: Tracks which direction the swap is going
   *   - true: ETH -> DAI
   *   - false: DAI -> ETH
   */
  const [showSettings, setShowSettings] = useState(false);
  const [isSwappingFromEth, setIsSwappingFromEth] = useState(true)

  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    setIsSwappingFromEth(!isSwappingFromEth)
  };

  const { writeContractAsync } = useWriteContract()

  const { address } = useAccount()

  const { data: nativeBalance, isFetched: isFetchedNative } = useBalance({
    address: address
  })

  const { data: erc20Balance, isFetched: isFetchedErc20 } = useReadContract({
    abi: erc20Abi,
    address: daiAddress,
    functionName: 'balanceOf',
    args: [address]
  })

  const WETH = WETH9[ChainId.MAINNET];
  const DAI = new Token(ChainId.MAINNET, daiAddress, 18, "DAI", "Dai Stablecoin")

  const client = createPublicClient({
    chain: [anvilFork],
    transport: http(anvilFork.rpcUrls.default.http)
  })

  const fetchPairReserves = async (tokenA, tokenB) => {
    const pairAddress = Pair.getAddress(tokenA, tokenB)
    const reserves = await client.readContract({
      address: pairAddress,
      abi: IUniswapV2PairABI.abi,
      functionName: 'getReserves'
    })
    console.log("Reserves: ", reserves)
    return reserves
  }

  const getPairObject = async () => {
    const tokens = [DAI, WETH]

    const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [token1, token0]

    const reserves = await fetchPairReserves(token0, token1)

    const currencyAmount0 = CurrencyAmount.fromRawAmount(token0, reserves[0].toString())
    const currencyAmount1 = CurrencyAmount.fromRawAmount(token1, reserves[1].toString())

    const pair = new Pair(currencyAmount0, currencyAmount1)

    return pair;
  }

  const fetchRouteAndTrade = async (inputAmount, inputToken, outputToken) => {
    const pair = await getPairObject()
    const route = new Route([pair], inputToken, outputToken)
    const trade = new Trade(route, inputAmount, TradeType.EXACT_INPUT)
    console.log(trade.executionPrice.toSignificant(6))
    return { trade, rate: trade.executionPrice.toSignificant(6) }
  }


  useEffect(() => {
    console.log(nativeBalance, erc20Balance)
    if (isFetchedNative) {
      setFromToken((prev) => {
        return { ...prev, balance: formatUnits(nativeBalance.value, nativeBalance.decimals) }
      })
    }
    if (isFetchedErc20) {
      setToToken((prev) => {
        return { ...prev, balance: formatEther(erc20Balance) }
      })
    }
  }, [nativeBalance, erc20Balance])

  const handleAmountChange = async (amount) => {
    try {
      let inputToken, outputToken
      inputToken = isSwappingFromEth ? WETH : DAI
      outputToken = isSwappingFromEth ? DAI : WETH
      let { trade, rate } = await fetchRouteAndTrade(CurrencyAmount.fromRawAmount(inputToken, parseEther(amount).toString()), inputToken, outputToken)
      setFromAmount(amount)
      setToAmount(rate * parseFloat(amount))
    }
    catch {
      setFromAmount(amount)
      setToAmount(0)
    }
  }

  const buildSwapTransaction = async () => {
    let inputAmount, trade, inputToken, outputToken
    inputToken = isSwappingFromEth ? WETH : DAI
    outputToken = isSwappingFromEth ? DAI : WETH
    inputAmount = CurrencyAmount.fromRawAmount(inputToken, parseEther(fromAmount.toString()).toString())
    trade = await fetchRouteAndTrade(inputAmount, inputToken, outputToken)
    const slippageTolerance = new Percent("50", "10000")
    const amountOutMin = trade.trade.minimumAmountOut(slippageTolerance)
    const swapParams = {
      amountIn: parseEther(trade.trade.inputAmount.toExact()),
      amountOutMin: parseEther(amountOutMin.toExact()),
      path: isSwappingFromEth ? [WETH.address, DAI.address] : [DAI.address, WETH.address],
      to: address,
      deadline: Math.floor(Date.now() / 1000 + 60 * 20)
    }
    return swapParams
  }

  const approveTokens = async (amount) => {
    try {
      const hash = await writeContractAsync({
        address: DAI.address,
        abi: erc20Abi,
        functionName: 'approve',
        args: ["0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", parseEther(amount.toString())]
      })
      return amount;
    }
    catch {
      alert("Approval Failed!")
    }
  }

  const executeSwap = async () => {
    try {
      const swapParams = await buildSwapTransaction();
      let args = Object.values(swapParams)
      if (isSwappingFromEth) {
        args.shift()

      }
      else {
        await approveTokens(args[0])
      }
      const tx = await writeContractAsync({
        address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        abi: IUniswapV2RouterABI.abi,
        functionName: isSwappingFromEth ? "swapExactETHForTokens" : "swapExactTokensForETH",
        args: args,
        value: isSwappingFromEth ? swapParams.amountIn : 0
      })
      let receipt = await client.waitForTransactionReceipt({ hash: tx })
      if (receipt.status === "success") {
        alert("Swap Success!")
      }
      else {
        alert("Swap Failed!")
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Swap
      </h2>
      <div className="space-y-4">
        <TokenSelector
          label="From"
          token={fromToken}
          amount={fromAmount}
          onAmountChange={handleAmountChange}
          onSelectToken={setFromToken}
        />
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleSwap}
            className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
          >
            <ArrowsUpDownIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <TokenSelector
          label="To"
          token={toToken}
          amount={toAmount}
          onAmountChange={setToAmount}
          onSelectToken={setToToken}
        />
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => setShowSettings(true)}
            className="text-sm text-blue-500 hover:underline"
          >
            Settings
          </button>
        </div>
        <button
          type="button"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          onClick={executeSwap}
        >
          Swap
        </button>
        <ConnectWalletButton />
      </div>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
