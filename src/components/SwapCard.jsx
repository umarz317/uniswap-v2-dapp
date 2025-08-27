// SwapCard component handles the main swap UI and logic for token exchange
import { useState } from "react";
import TokenSelector from "./TokenSelector.jsx";
import ConnectWalletButton from "./ConnectWalletButton.jsx";
import SettingsModal from "./SettingsModal.jsx";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { useEffect } from "react";
import {
  erc20Abi,
  formatEther,
  formatUnits,
} from "viem";

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
