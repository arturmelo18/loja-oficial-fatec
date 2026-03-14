export default defineEventHandler(async (event) => {
  const { _id } = getQuery(event)

  if (!_id) {
    throw createError({
      statusCode: 400,
      statusMessage: `${event}`,
    })
  }
  
  const product = await ProductSchema.findOne({
    _id: _id
  })

  if (!product) {
     throw createError({
      statusCode: 404,
      statusMessage: 'Produto não encontrado.',
    })
  }

  return product
})