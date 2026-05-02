export interface User {
  fullName: string;
  email: string;
  role: string;
  token: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
  categoryId: number;
  categoryName: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  createdAt: string;
  status: string;
  totalAmount: number;
  address: string | null;
  items: OrderItem[];
}