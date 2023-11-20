type FetchRequestArgs<RequestBodyType> = {
  controller?: string;
  httpMethod?: string;
  body?: RequestBodyType;
  baseURL?: string;
}

type ExtendedResponse<ResponseType> = ResponseType & { error?: string };

export const handleAPIRequest = async <ResponseType, RequestBodyType>({
  controller = 'products',
  httpMethod = 'GET',
  body,
  baseURL = 'https://dummyjson.com',
}: FetchRequestArgs<RequestBodyType>): Promise<ExtendedResponse<ResponseType>> => {
  try {
    const url = new URL(controller, baseURL)

    const fetchConfig: RequestInit = {
      method: httpMethod,
      headers: { 'Content-Type': 'application/json' },
    }

    if (body) {
      fetchConfig.body = JSON.stringify(body)
    }

    const response = await fetch(url.toString(), fetchConfig)
    const data: ExtendedResponse<ResponseType> = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Error response')
    }

    return data
  } catch (error) {
    console.error('Error while executing a query:', error)
    throw error
  }
}
