import type { Product } from "./Product";
import type { User } from "./User";

export interface Cart {
    _id: string;
    user: User;
    items: CartItem[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}