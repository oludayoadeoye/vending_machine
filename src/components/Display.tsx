import React from 'react';
import { Product } from '../types';

interface DisplayProps {
  selectedProduct: Product | null;
  insertedAmount: number;
  message: string;
}

export function Display({ selectedProduct, insertedAmount, message }: DisplayProps) {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-green-400 font-mono p-6 rounded-xl shadow-lg min-h-[160px] flex flex-col justify-between border border-gray-700">
      <div className="space-y-2">
        <p className="flex justify-between">
          <span>Selected:</span>
          <span>{selectedProduct ? `${selectedProduct.name} ($${selectedProduct.price.toFixed(2)})` : 'None'}</span>
        </p>
        <p className="flex justify-between">
          <span>Balance:</span>
          <span>${insertedAmount.toFixed(2)}</span>
        </p>
      </div>
      <div className="pt-4 border-t border-gray-700">
        <p className="text-lg tracking-wide typing-effect">{message}</p>
      </div>
    </div>
  );
}