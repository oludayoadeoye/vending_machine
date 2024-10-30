import React from 'react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export function ProductGrid({ products, onSelectProduct }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => onSelectProduct(product)}
          disabled={product.quantity === 0}
          className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl disabled:opacity-50 disabled:hover:shadow-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="relative p-4">
            <div className="absolute top-0 right-0 -translate-y-1/2 bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
              {product.code}
            </div>
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            <div className="flex justify-between items-center">
              <p className="text-green-600 font-bold text-xl">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                {product.quantity} left
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}