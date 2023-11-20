import type { ProductItem } from 'types'

export type FetchAllProductsResponse = {
  limit: number;
  products: ProductItem[];
  skip: number;
  total: number;
}
