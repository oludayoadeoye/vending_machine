import React, { useMemo } from 'react';
import { Sale, DailySales, ProductSales } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AdminDashboardProps {
  sales: Sale[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function AdminDashboard({ sales }: AdminDashboardProps) {
  const dailySales = useMemo(() => {
    const salesByDay = sales.reduce((acc: { [key: string]: DailySales }, sale) => {
      const date = new Date(sale.timestamp).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { date, total: 0, count: 0 };
      }
      acc[date].total += sale.price;
      acc[date].count += 1;
      return acc;
    }, {});
    return Object.values(salesByDay).slice(-7);
  }, [sales]);

  const productSales = useMemo(() => {
    const salesByProduct = sales.reduce((acc: { [key: string]: ProductSales }, sale) => {
      if (!acc[sale.productId]) {
        acc[sale.productId] = {
          productId: sale.productId,
          productName: sale.productName,
          count: 0,
          total: 0
        };
      }
      acc[sale.productId].count += 1;
      acc[sale.productId].total += sale.price;
      return acc;
    }, {});
    return Object.values(salesByProduct);
  }, [sales]);

  const totalRevenue = useMemo(() => 
    sales.reduce((sum, sale) => sum + sale.price, 0)
  , [sales]);

  const totalSales = sales.length;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-medium opacity-80">Total Revenue</h3>
          <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-medium opacity-80">Total Sales</h3>
          <p className="text-3xl font-bold">{totalSales}</p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Daily Sales (Last 7 Days)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Product Sales Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={productSales}
                dataKey="count"
                nameKey="productName"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {productSales.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units Sold</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productSales.map((product) => (
              <tr key={product.productId}>
                <td className="px-6 py-4 whitespace-nowrap">{product.productName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.count}</td>
                <td className="px-6 py-4 whitespace-nowrap">${product.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}