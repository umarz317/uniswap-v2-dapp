import React from "react";

export default function TokenSelector({
  label,
  token,
  amount,
  onAmountChange,
  onSelectToken,
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <label className="flex justify-between text-sm font-medium text-gray-600">
        <span>{label}</span>
        <span>Balance: {token.balance}</span>
      </label>
      <div className="mt-2 flex">
        <input
          type="number"
          step="any"
          className="flex-1 bg-transparent outline-none text-lg font-medium border-2 border-gray-300 rounded-lg px-2 py-1.5 text-gray-900"
          placeholder="0.0"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            onSelectToken(token);
          }}
          className="ml-2 bg-white border-2 border-gray-300 px-3 rounded-lg hover:bg-gray-200 transition"
        >
          {token.symbol}
        </button>
      </div>
    </div>
  );
}
