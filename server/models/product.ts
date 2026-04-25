import { defineMongooseModel } from '#nuxt/mongoose'
import { Product } from '~/types/Product'

export const ProductSchema = defineMongooseModel<Product>({
  name: 'Product',
  schema: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    active: {
      type: Boolean,
      required: true,
      default: false
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  options: {
    timestamps: true,
  },
})
