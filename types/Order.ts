import type { CartItem } from './Cart'
import type { User } from './User'

export interface Order {
  _id: string
  user: User
  items: CartItem[]
  total: number
  status: 'PENDING' | 'PAID' | 'EXPIRED' | 'CANCELLED' | 'REFUNDED'
  abacatePayCheckoutId: string
  abacatePayCheckoutUrl: string
  externalId: string
  createdAt: Date
  updatedAt: Date
}