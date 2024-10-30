import React, { useState, useCallback } from 'react';
import { CircleDollarSign, LayoutDashboard } from 'lucide-react';
import { Product, Transaction } from './types';
import { products, acceptedMoney } from './data/products';
import { salesData } from './data/sales';
import { ProductGrid } from './components/ProductGrid';
import { MoneyInput } from './components/MoneyInput';
import { Display } from './components/Display';
import { AdminDashboard } from './components/AdminDashboard';

function App() {
  const [inventory, setInventory] = useState<Product[]>(products);
  const [transaction, setTransaction] = useState<Transaction>({
    selectedProduct: null,
    insertedAmount: 0
  });
  const [message, setMessage] = useState<string>('Welcome! Please select a product.');
  const [showAdmin, setShowAdmin] = useState(false);

  const handleProductSelect = (product: Product) => {
    if (product.quantity === 0) {
      setMessage('Sorry, this product is out of stock.');
      return;
    }
    setTransaction(prev => ({ ...prev, selectedProduct: product }));
    setMessage(`Selected ${product.name}. Please insert $${product.price.toFixed(2)}`);
  };

  const handleInsertMoney = (value: number) => {
    setTransaction(prev => ({
      ...prev,
      insertedAmount: prev.insertedAmount + value
    }));
  };

  const handlePurchase = useCallback(() => {
    const { selectedProduct, insertedAmount } = transaction;
    if (!selectedProduct) {
      setMessage('Please select a product first.');
      return;
    }

    if (insertedAmount < selectedProduct.price) {
      setMessage(`Please insert $${(selectedProduct.price - insertedAmount).toFixed(2)} more.`);
      return;
    }

    const change = insertedAmount - selectedProduct.price;
    setInventory(prev =>
      prev.map(p =>
        p.id === selectedProduct.id
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );

    setMessage(
      `Dispensing ${selectedProduct.name}...${
        change > 0 ? ` Returning $${change.toFixed(2)} change.` : ''
      }`
    );

    setTimeout(() => {
      setTransaction({ selectedProduct: null, insertedAmount: 0 });
      setMessage('Thank you! Please select another product.');
    }, 3000);
  }, [transaction]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <CircleDollarSign className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Smart Vending</h1>
          </div>
          <button
            onClick={() => setShowAdmin(!showAdmin)}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            {showAdmin ? 'Hide' : 'Show'} Dashboard
          </button>
        </div>

        {showAdmin ? (
          <AdminDashboard sales={salesData} />
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <ProductGrid
                products={inventory}
                onSelectProduct={handleProductSelect}
              />
            </div>

            <div className="space-y-6">
              <Display
                selectedProduct={transaction.selectedProduct}
                insertedAmount={transaction.insertedAmount}
                message={message}
              />

              <MoneyInput
                acceptedMoney={acceptedMoney}
                onInsertMoney={handleInsertMoney}
                insertedAmount={transaction.insertedAmount}
              />

              <button
                onClick={handlePurchase}
                disabled={!transaction.selectedProduct || transaction.insertedAmount < (transaction.selectedProduct?.price || 0)}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-600 hover:to-green-700 transition-all shadow-lg disabled:shadow-none"
              >
                Purchase
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;