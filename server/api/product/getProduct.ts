export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Para obter um produto específico é necessário passar seu identificador.',
    })
  }

  const { id } = body

  const product = await ProductSchema.findOne({
    _id: id
  })

  if (!product) {
     throw createError({
      statusCode: 404,
      statusMessage: 'Produto não encontrado.',
    })
  }

  return product
})