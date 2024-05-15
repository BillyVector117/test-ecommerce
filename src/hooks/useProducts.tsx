import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useProducts(productId?: string | string[]) {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products${productId ? '/' + productId : ""}`
      )
      return data
    },
  })
}