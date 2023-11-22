import {
  describe, it, expect, vi,
} from 'vitest'
import { handleAPIRequest } from 'utils'

describe('handleAPIRequest', () => {
  it('should make a GET request and return data', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ products: ['Product 1', 'Product 2'] }),
    })) as any

    const response = await handleAPIRequest<{ products: string[] }, unknown>({})

    expect(global.fetch).toHaveBeenCalledWith('https://dummyjson.com/products', expect.anything())
    expect(response.products).toEqual(['Product 1', 'Product 2'])
  })

  it('should handle errors', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ error: 'Error response' }),
    })) as any

    try {
      await handleAPIRequest<{ products: string[] }, unknown>({})
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('Error response')
    }
  })
})
