import { CartSchema, CartItemSchema } from '~/server/models/cart'
import { ProductSchema } from '~/server/models/product'

export default defineEventHandler(async (event) => {
  const { cartId, productId, quantity } = await readBody(event)

  if (!cartId || !productId || !quantity) {
    throw createError({
      statusCode: 400,
      statusMessage: 'cartId, productId e quantity são obrigatórios',
    })
  }

  try {
    const product = await ProductSchema.findById(productId)
    if (!product) {
      throw createError({ statusCode: 404, statusMessage: 'Produto não encontrado' })
    }

    const existingItem = await CartItemSchema.findOne({ cartId, product: productId })

    if (existingItem) {
      existingItem.quantity += quantity
      existingItem.price = product.price
      await existingItem.save()
      await existingItem.populate('product')
      return existingItem
    }

    const item = await CartItemSchema.create({
      product: productId,
      quantity,
      cartId,
      price: product.price,
    })

    await CartSchema.findByIdAndUpdate(cartId, {
      $push: { items: item._id },
    })

    await item.populate('product')
    return item
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao adicionar item ao carrinho',
    })
  }
})