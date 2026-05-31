import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema } from 'mongoose'
import type { Order } from '~/types/Order'

export const OrderSchema = defineMongooseModel<Order>({
  name: 'Order',
  schema: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'CartItem',
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'PAID', 'EXPIRED', 'CANCELLED', 'REFUNDED'],
      default: 'PENDING',
    },
    abacatePayCheckoutId: {
      type: String,
      required: true,
    },
    abacatePayCheckoutUrl: {
      type: String,
      required: true,
    },
    externalId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  options: { timestamps: true },
})