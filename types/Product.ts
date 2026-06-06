export interface Product {
  _id: string
  name: string
  price: number
  quantity: number
  published: boolean
  active: boolean
  abacatePayId?: string
  description?: string
  image?: string
  createdAt?: Date
  updatedAt?: Date
}
