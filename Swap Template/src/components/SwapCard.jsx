import React, { useState } from "react";
import TokenSelector from "./TokenSelector.jsx";
import ConnectWalletButton from "./ConnectWalletButton.jsx";
import SettingsModal from "./SettingsModal.jsx";
import PriceInfo from "./PriceInfo.jsx";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";

export default function SwapCard() {
  const [fromToken, setFromToken] = useState({
    symbol: "ETH",
    balance: "1.234",
  });
  const [toToken, setToToken] = useState({ symbol: "DAI", balance: "1000" });
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

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
          onAmountChange={setFromAmount}
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
          <PriceInfo from={fromToken} to={toToken} amount={fromAmount} />
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
        >
          Swap
        </button>
        <ConnectWalletButton />
      </div>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
