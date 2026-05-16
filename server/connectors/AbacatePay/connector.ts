export class AbacatePayConnector {

    private static readonly abacatePayApiKey = process.env.ABACATEPAY_API_KEY
    private static readonly baseUrl = 'https://api.abacatepay.com/v2'

    static async get(url: string, params: any): Promise<any> {
        try {
            const response = await $fetch(`${AbacatePayConnector.baseUrl}${url}`, {
                method: 'GET',
                query: params, 
                headers: {
                    Authorization: `Bearer ${AbacatePayConnector.abacatePayApiKey}`,
                    'Accept': 'application/json'
                }
            })
            
            return response
        } catch (error) {
            console.error(`Erro ao fazer GET para ${url}:`, error)
            throw error
        }
    }

    static async post(url: string, params: any): Promise<any> {
        try {
            const response = await $fetch(`${AbacatePayConnector.baseUrl}${url}`, {
                method: 'POST',
                body: params,
                headers: {
                    Authorization: `Bearer ${AbacatePayConnector.abacatePayApiKey}`,
                    'Accept': 'application/json'
                }
            })
            
            return response
        } catch (error) {
            console.error(`Erro ao fazer POST para ${url}:`, error)
            throw error
        }
    }

    static async put(url: string, params: any): Promise<any> {
        try {
            const response = await $fetch(`${AbacatePayConnector.baseUrl}${url}`, {
                method: 'PUT',
                body: params,
                headers: {
                    Authorization: `Bearer ${AbacatePayConnector.abacatePayApiKey}`,
                    'Accept': 'application/json'
                }
            })
            
            return response
        } catch (error) {
            console.error(`Erro ao fazer PUT para ${url}:`, error)
            throw error
        }
    }

    static async delete(url: string, params: any): Promise<any> {
        try {
            const response = await $fetch(`${AbacatePayConnector.baseUrl}${url}`, {
                method: 'DELETE',
                query: params, 
                headers: {
                    Authorization: `Bearer ${AbacatePayConnector.abacatePayApiKey}`,
                    'Accept': 'application/json'
                }
            })
            
            return response
        } catch (error) {
            console.error(`Erro ao fazer DELETE para ${url}:`, error)
            throw error
        }
    }
}
