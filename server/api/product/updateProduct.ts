import generateCdnImage from '~/server/utils/helpers/generateCdnImage'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body || !body._id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID do produto é obrigatório para atualização.',
    })
  }

  const { _id, name, price, quantity, description, image, active } = body

  if (price !== undefined && price < 0) {
    throw createError({ statusCode: 400, statusMessage: 'Preço deve ser positivo.' })
  }

  if (quantity !== undefined && quantity < 0) {
    throw createError({ statusCode: 400, statusMessage: 'Quantidade deve ser positiva.' })
  }

  try {
    const existingProduct = await ProductSchema.findById(_id)
    if (!existingProduct) {
      throw createError({ statusCode: 404, statusMessage: 'Produto não encontrado.' })
    }

    let finalImageUrl = existingProduct.image

    if (image && image !== existingProduct.image) {
      const cdnImg = await generateCdnImage(image)
      finalImageUrl = cdnImg.url || ''
    }

    const updatedProduct = await ProductSchema.findByIdAndUpdate(
      _id,
      {
        name: name || existingProduct.name,
        price: price ?? existingProduct.price,
        quantity: quantity ?? existingProduct.quantity,
        description: description || existingProduct.description,
        image: finalImageUrl,
        active: active ?? existingProduct.active,
      },
      { new: true }
    )

    return {
      status: 'sucesso',
      product: updatedProduct,
    }

  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Erro ao atualizar produto no banco de dados' 
    })
  }
})