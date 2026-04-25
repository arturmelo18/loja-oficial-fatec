export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const limit = Number(query.limit) || 10
  const page = Number(query.page) || 1

  const skip = (page - 1) * limit

  try {
    const products = await ProductSchema.find({
      active: true
    })
    .sort({ createdAt: -1 })
    .skip(skip)             
    .limit(limit)             

    const total = await ProductSchema.countDocuments({ active: true })

    return {
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  } catch (error) {
    console.error('Erro ao buscar a lista de produtos:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor ao buscar produtos.'
    })
  }
})