export interface User {
  id?: string;
  name: string;
  username: string;
  password: string;
  craetedAt?: string;
}

export interface Category {
  id?: string;
  name: string;
  userId: String;
  createdAt?: string;
}

export interface Product {
  id?: string;
  productName: string;
  categoryId: string;
  basePrice: number;
  price: number;
  stock: number;
  createdAt?: string;
  userId: string;
  category?: Category;
  user?: User;
}

export interface Order {
  id: string;
  userId: string;
  billNumber: number;
  name: string;
  address: string;
  phone: string;
  category: string;
  productName: string;
  quantity: number;
  price: number;
  FullAmount: number;
  createdAt: Date;
}

export type chartDataType = {
  date: string;
  profit: number;
};

export interface DashboardType {
  findCategory: number;
  findProduct: number;
  findOrder: number;
  total: number;
  LastOrder: Order[];
  chartData: chartDataType[];
}
