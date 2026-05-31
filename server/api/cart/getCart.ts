import { CartSchema } from '~/server/models/cart'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { userId, cartId } = query

  if (!userId && !cartId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'userId ou cartId é obrigatório para buscar o carrinho',
    })
  }

  try {
    const filter = userId ? { user: userId } : { _id: cartId }
    const cart = await CartSchema.findOne(filter)
      .populate('user')
      .populate({
        path: 'items',  
        populate: {
          path: 'product'
        }
      })

    return cart ?? null 
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao buscar carrinho',
    })
  }
})