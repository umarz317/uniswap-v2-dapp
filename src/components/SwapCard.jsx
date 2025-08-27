// SwapCard component handles the main swap UI and logic for token exchange
import { useState } from "react";
import TokenSelector from "./TokenSelector.jsx";
import ConnectWalletButton from "./ConnectWalletButton.jsx";
import SettingsModal from "./SettingsModal.jsx";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { useEffect } from "react";
import {
  createPublicClient,
  erc20Abi,
  formatEther,
  formatUnits,
  http,
  parseEther,
} from "viem";
import {
  ChainId,
  CurrencyAmount,
  Token,
  TradeType,
  WETH9,
} from "@uniswap/sdk-core";
import { Pair, Route, Trade } from "@uniswap/v2-sdk";
import { anvilFork } from "../providers/AppkitProvider.jsx";
import IUniswapV2PairABI from "@uniswap/v2-periphery/build/IUniswapV2Pair.json";

// DAI token contract address on Ethereum mainnet
const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

export default function SwapCard() {
  // State variables for selected tokens, amounts, and UI state
  const [fromToken, setFromToken] = useState({
    symbol: "ETH",
    balance: "1.234",
  });
  const [toToken, setToToken] = useState({ symbol: "DAI", balance: "1000" });
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [isSwappingFromEth, setIsSwappingFromEth] = useState(true);

  // Swap the from and to tokens and their amounts
  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    setIsSwappingFromEth(!isSwappingFromEth);
  };

  // Get connected wallet address
  const { address } = useAccount();

  // Fetch native ETH balance
  const { data: nativeBalance, isFetched: isFetchedNative } = useBalance({
    address: address,
  });

  // Fetch DAI ERC20 token balance
  const { data: erc20Balance, isFetched: isFetchedErc20 } = useReadContract({
    abi: erc20Abi,
    address: daiAddress,
    functionName: "balanceOf",
    args: [address],
  });

  // Token objects for Uniswap SDK
  const WETH = WETH9[ChainId.MAINNET];
  const DAI = new Token(
    ChainId.MAINNET,
    daiAddress,
    18,
    "DAI",
    "Dai Stablecoin"
  );

  // Public client for blockchain interactions
  const client = createPublicClient({
    chain: [anvilFork],
    transport: http(anvilFork.rpcUrls.default.http),
  });

  // Fetch reserves for a Uniswap V2 pair
  const fetchPairReserves = async (tokenA, tokenB) => {
    const pairAddress = Pair.getAddress(tokenA, tokenB);
    const reserves = await client.readContract({
      address: pairAddress,
      abi: IUniswapV2PairABI.abi,
      functionName: "getReserves",
    });
    console.log("Reserves: ", reserves);
    return reserves;
  };

  // Create a Uniswap V2 Pair object using fetched reserves
  const getPairObject = async () => {
    const tokens = [DAI, WETH];

    const [token0, token1] = tokens[0].sortsBefore(tokens[1])
      ? tokens
      : [token1, token0];

    const reserves = await fetchPairReserves(token0, token1);

    const currencyAmount0 = CurrencyAmount.fromRawAmount(
      token0,
      reserves[0].toString()
    );
    const currencyAmount1 = CurrencyAmount.fromRawAmount(
      token1,
      reserves[1].toString()
    );

    const pair = new Pair(currencyAmount0, currencyAmount1);

    return pair;
  };

  // Fetch the best route and trade for the swap using Uniswap SDK
  const fetchRouteAndTrade = async (inputAmount, inputToken, outputToken) => {
    const pair = await getPairObject();
    const route = new Route([pair], inputToken, outputToken);
    const trade = new Trade(route, inputAmount, TradeType.EXACT_INPUT);
    console.log(trade.executionPrice.toSignificant(6));
  };

  // Handler for the Swap button click
  const handleSwapClick = async () => {
    fetchRouteAndTrade(
      CurrencyAmount.fromRawAmount(fromToken, parseEther(1).toString()),
      WETH,
      DAI
    );
  };

  // Update token balances when fetched
  useEffect(() => {
    console.log(nativeBalance, erc20Balance);
    if (isFetchedNative) {
      setFromToken((prev) => {
        return {
          ...prev,
          balance: formatUnits(nativeBalance.value, nativeBalance.decimals),
        };
      });
    }
    if (isFetchedErc20) {
      setToToken((prev) => {
        return { ...prev, balance: formatEther(erc20Balance) };
      });
    }
  }, [nativeBalance, erc20Balance]);

  // Render the swap card UI
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Swap
      </h2>
      <div className="space-y-4">
        {/* From token selector */}
        <TokenSelector
          label="From"
          token={fromToken}
          amount={fromAmount}
          onAmountChange={setFromAmount}
          onSelectToken={setFromToken}
        />
        {/* Swap direction button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleSwap}
            className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
          >
            <ArrowsUpDownIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        {/* To token selector */}
        <TokenSelector
          label="To"
          token={toToken}
          amount={toAmount}
          onAmountChange={setToAmount}
          onSelectToken={setToToken}
        />
        {/* Settings button */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => setShowSettings(true)}
            className="text-sm text-blue-500 hover:underline"
          >
            Settings
          </button>
        </div>
        {/* Swap button */}
        <button
          type="button"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          onClick={handleSwapClick}
        >
          Swap
        </button>
        {/* Connect wallet button */}
        <ConnectWalletButton />
      </div>
      {/* Settings modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
