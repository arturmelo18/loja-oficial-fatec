export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { productId } = body

  if (!productId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'O identificador do produto deve ser fornecido.',
    })
  }

  try {
    const deletedProduct = await ProductSchema.findByIdAndDelete(productId)

    if (!deletedProduct) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Produto não encontrado para exclusão.',
      })
    }

    return {
      success: true,
      message: 'Produto excluído com sucesso.',
      id: productId
    }

  } catch (error: any) {
    console.error('Erro ao excluir o produto:', error.message)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erro interno ao excluir o produto no banco de dados.',
    })
  }
})