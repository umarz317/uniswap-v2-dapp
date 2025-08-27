import React, { useState } from "react";

export default function SettingsModal({ onClose }) {
  const [slippage, setSlippage] = useState(0.5);
  const [deadline, setDeadline] = useState(20);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-80">
        <h3 className="text-lg font-semibold mb-4">Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">
              Slippage Tolerance (%)
            </label>
            <input
              type="number"
              className="mt-1 w-full border border-gray-400  rounded-lg p-2"
              value={slippage}
              onChange={(e) => setSlippage(e.target.value)}
            />
          </div>
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
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:underline "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
