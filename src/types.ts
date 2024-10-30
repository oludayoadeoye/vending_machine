export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  code: string;
}

export interface Money {
  value: number;
  label: string;
}

export interface Transaction {
  selectedProduct: Product | null;
  insertedAmount: number;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  price: number;
  timestamp: string;
}

export interface DailySales {
  date: string;
  total: number;
  count: number;
}

export interface ProductSales {
  productId: string;
  productName: string;
  count: number;
  total: number;
}