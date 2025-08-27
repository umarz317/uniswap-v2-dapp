import React from "react";

export default function PriceInfo({ from, to, amount }) {
  const price = amount ? (amount * 2000).toFixed(2) : "0.00";
  return (
    <div className="text-sm text-gray-500">
      ~{price} {to.symbol}
    </div>
  );
}
