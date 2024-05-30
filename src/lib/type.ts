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
