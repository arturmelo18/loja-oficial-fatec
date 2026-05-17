import { CartSchema } from '~/server/models/cart'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body || !body.userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'userId é obrigatório para criar um carrinho',
    })
  }

  const { userId } = body

  try {
    const existingCart = await CartSchema.findOne({ user: userId })
    
    if (existingCart) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Este usuário já possui um carrinho',
      })
    }

    const cart = await CartSchema.create({
      user: userId,
      items: [],
    })

    return {
      statusCode: 201,
      message: 'Carrinho criado com sucesso',
      cart,
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao criar carrinho',
    })
  }
})