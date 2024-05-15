'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import ProductOverview from '../../components/ProductOverview'
import useProducts from '@/hooks/useProducts'
import Spinner from '@/app/components/Spinner'
const Product = () => {
  const params = useParams()

  const { status, data } = useProducts(params?.productId)
  if (status == 'pending') return (
    <Spinner />
  )
  return (
    <div className='product_list_container'>
      <ProductOverview selectedProduct={data} />

    </div>
  )
}

export default Product