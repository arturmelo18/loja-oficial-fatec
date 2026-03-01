import { defineMongooseModel } from '#nuxt/mongoose'
import { AddressSchema } from './address'

export const UserSchema = defineMongooseModel({
  name: 'User',
  schema: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: AddressSchema,
      required: true,
    },
  },
})
