export interface Product {
  _id: string
  name: string
  price: number
  quantity: number
  active: boolean
  abacatePayId?: string
  description?: string
  image?: string
  createdAt?: Date
  updatedAt?: Date
}
