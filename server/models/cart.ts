import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema } from 'mongoose'
import { Cart, CartItem } from '~/types/Cart'

export const CartItemSchema = defineMongooseModel<CartItem>({
  name: 'CartItem',
  schema: {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
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
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'CartItem',
      },
    ],
  },
  options: {
    timestamps: true,
  },
})