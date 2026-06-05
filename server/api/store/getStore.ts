import { StoreSchema } from '~/server/models/store'

export default defineEventHandler(async () => {
    const store = await StoreSchema.findOne()
    return store ?? null
})