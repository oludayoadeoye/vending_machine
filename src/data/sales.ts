import { Sale } from '../types';

// Simulated sales data for the last 30 days
const generateSalesData = (): Sale[] => {
  const sales: Sale[] = [];
  const products = [
    { id: '1', name: 'Classic Cola', price: 2.50 },
    { id: '2', name: 'Crunchy Chips', price: 1.75 },
    { id: '3', name: 'Chocolate Bar', price: 2.00 },
    { id: '4', name: 'Sparkling Water', price: 1.50 }
  ];

  for (let i = 0; i < 200; i++) {
    const product = products[Math.floor(Math.random() * products.length)];
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    sales.push({
      id: `sale-${i}`,
      productId: product.id,
      productName: product.name,
      price: product.price,
      timestamp: date.toISOString()
    });
  }

  return sales.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

export const salesData = generateSalesData();