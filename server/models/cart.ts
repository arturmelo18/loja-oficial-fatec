import { defineMongooseModel } from '#nuxt/mongoose'
import { Cart, CartItem } from '~/types/Cart'
import { UserSchema } from './user'
import { ProductSchema } from './product'

export const CartItemSchema = defineMongooseModel<CartItem>({
  name: 'CartItem',
  schema: {
    product: {
      type: ProductSchema,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  options: {
    timestamps: true,
  },
})

export const CartSchema = defineMongooseModel<Cart>({
  name: 'Cart',
  schema: {
    user: {
      type: UserSchema,
      required: true,
    },
    items: {
      type: [CartItemSchema],
      default: [],
    },
  },
  options: {
    timestamps: true,
  },
})