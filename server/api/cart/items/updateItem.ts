import { CartItemSchema } from '~/server/models/cart'

export default defineEventHandler(async (event) => {
  const { cartItemId, quantity } = await readBody(event)

  if (!cartItemId || !quantity) {
    throw createError({
      statusCode: 400,
      statusMessage: 'cartItemId e quantity são obrigatórios',
    })
  }

  if (quantity < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Quantidade deve ser maior que zero',
    })
  }

  try {
    const item = await CartItemSchema.findByIdAndUpdate(
      cartItemId,
      { quantity },
      { new: true }
    ).populate('product')

    if (!item) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Item não encontrado',
      })
    }

    return item
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao atualizar item',
    })
  }
})