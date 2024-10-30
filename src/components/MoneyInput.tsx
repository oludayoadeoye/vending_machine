import React from 'react';
import { Money } from '../types';

interface MoneyInputProps {
  acceptedMoney: Money[];
  onInsertMoney: (value: number) => void;
  insertedAmount: number;
}

export function MoneyInput({ acceptedMoney, onInsertMoney, insertedAmount }: MoneyInputProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Current Balance</h3>
        <p className="text-3xl font-bold text-green-600">
          ${insertedAmount.toFixed(2)}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {acceptedMoney.map((money) => (
          <button
            key={money.value}
            onClick={() => onInsertMoney(money.value)}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            {money.label}
          </button>
        ))}
      </div>
    </div>
  );
}