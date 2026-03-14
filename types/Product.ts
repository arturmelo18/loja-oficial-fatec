export interface Product {
  id: string
  name: string
  price: number
  quantity: number
  description?: string
  image?: string
  createdAt?: Date
  updatedAt?: Date
}
