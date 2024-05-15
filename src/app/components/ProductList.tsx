import { useEffect, useId, useState } from "react"
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useProducts from '../../hooks/useProducts'
import Button from "./common/Button";
import theme from "../../theme"
import { useCartContext } from "@/context/cartContext";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "./Spinner";
import { IProduct } from "@/models/Product";

export default function ProductList() {

  const { cartContextValue, setCartContextValue } = useCartContext()
  const [magicKey, setMagicKey] = useState("")
  const { status, data, error, isFetching } = useProducts()
  const [products, setProducts] = useState<IProduct[]>([])
  function filterByValue(array, string) {
    return array.filter(obj => {
      for (let prop in obj) {
        let propValue = obj[prop].toString().toLowerCase();
        let lowerString = string.toLowerCase();
        if (propValue.includes(lowerString)) {
          return true;
        }
      }
      return false;
    });
  }
  useEffect(() => {
    if (status == 'pending') return
    if (!data) return;
    let currentData = []
    // add uuid to all item
    if (data[0]['uuid'] == undefined) {
      currentData = data.map((item) => {
        return {
          ...item, uuid: new Date().valueOf()
        }
      }
      )
    }
    const newData = filterByValue(currentData, magicKey)
    setProducts(newData)
  }, [magicKey, data])
  if (status == 'pending') return (
    <Spinner />
  )
  const onHandleAddToCart = (product) => {
    product.uuid = new Date().valueOf();
    setCartContextValue({ ...cartContextValue, cartItems: [...cartContextValue.cartItems, product] })
    Cookies.set('cartItems', JSON.stringify([...cartContextValue.cartItems, product]))
    toast("Item added to cart!")
  }
  const onHandleChange = (event) => {
    setMagicKey(event)
  }
  return (
    <div className="product_list_container" /* style={theme.secondary_color} */>
      <ToastContainer />

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <input type="text" onChange={(event) => onHandleChange(event.target.value)} className="search-input mb-5 h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Find products..." />

        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Top trending products</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.image}
                  alt={product.description}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between" style={{ minHeight: '40px' }}>
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={`product/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title.length > 30 ? `${product.title.slice(0, 25)}...` : product.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
              </div>
              <div className="w-full ">
                <Button onClick={() => onHandleAddToCart(product)} label={'Add to cart'} backgroundColor={theme.secondary_color} labelColor={theme.typography.primary_color} color="rose" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
