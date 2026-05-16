export class AbacatePayConnector {

    private static getApiKey(): string {
        const key = process.env.ABACATEPAY_API_KEY
        if (!key) {
            console.warn("Aviso: ABACATEPAY_API_KEY não está definida no ambiente.")
        }
        return key || ''
    }

    private static getBaseUrl(): string {
        return 'https://api.abacatepay.com/v2'
    }

    static async get(url: string, params: any): Promise<any> {
        try {
            const response = await $fetch(`${AbacatePayConnector.getBaseUrl()}${url}`, {
                method: 'GET',
                query: params, 
                headers: {
                    'Authorization': `Bearer ${AbacatePayConnector.getApiKey()}`,
                    'Content-Type': 'application/json'
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
            const response = await $fetch(`${AbacatePayConnector.getBaseUrl()}${url}`, {
                method: 'POST',
                body: params,
                headers: {
                    'Authorization': `Bearer ${AbacatePayConnector.getApiKey()}`,
                    'Content-Type': 'application/json'
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
            const response = await $fetch(`${AbacatePayConnector.getBaseUrl()}${url}`, {
                method: 'PUT',
                body: params,
                headers: {
                    'Authorization': `Bearer ${AbacatePayConnector.getApiKey()}`,
                    'Content-Type': 'application/json'
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
            const response = await $fetch(`${AbacatePayConnector.getBaseUrl()}${url}`, {
                method: 'DELETE',
                query: params, 
                headers: {
                    'Authorization': `Bearer ${AbacatePayConnector.getApiKey()}`,
                    'Content-Type': 'application/json'
                }
            })
            
            return response
        } catch (error) {
            console.error(`Erro ao fazer DELETE para ${url}:`, error)
            throw error
        }
    }
}
