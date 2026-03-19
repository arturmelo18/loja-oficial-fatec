export interface Product {
  _id: string
  name: string
  price: number
  quantity: number
  active: boolean
  description?: string
  image?: string
  createdAt?: Date
  updatedAt?: Date
}
