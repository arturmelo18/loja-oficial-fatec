import { OrderSchema } from '~/server/models/order'

export default defineEventHandler(async (event) => {
    const { userId } = getQuery(event)

    if (!userId) {
        throw createError({ statusCode: 400, statusMessage: 'userId é obrigatório' })
    }

    const orders = await OrderSchema.find({ user: userId })
        .populate({ path: 'items', populate: { path: 'product' } })
        .sort({ createdAt: -1 })

    return orders
})