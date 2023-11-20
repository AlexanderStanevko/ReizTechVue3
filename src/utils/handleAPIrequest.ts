type FetchRequestArgs<RequestBodyType> = {
  controller?: string;
  httpMethod?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: RequestBodyType;
  params?: Record<string, unknown>;
  baseURL?: string;
}

type ExtendedResponse<ResponseType> = ResponseType & { error?: string };

export const handleAPIRequest = async <ResponseType, RequestBodyType>({
  controller = 'products',
  httpMethod = 'GET',
  body,
  params,
  baseURL = 'https://dummyjson.com',
}: FetchRequestArgs<RequestBodyType>): Promise<ExtendedResponse<ResponseType>> => {
  try {
    const url = new URL(controller || '', baseURL)

    if (params?.q) {
      url.searchParams.append('q', String(params.q))
    }

    const fetchConfig: RequestInit = {
      method: httpMethod,
      headers: { 'Content-Type': 'application/json' },
    }

    if (body && (httpMethod === 'POST' || httpMethod === 'PUT')) {
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
