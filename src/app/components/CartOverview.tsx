import { IProduct } from "@/models/Product";
import React, { useEffect, useState } from "react";
import { useCartContext } from '@/context/cartContext'
import Cookies from "js-cookie";

function CartOverview({ items }: { items: IProduct[] }) {
    const { cartContextValue, setCartContextValue } = useCartContext()
    const { cartItems } = cartContextValue
    const [show, setShow] = useState(true);
    const [shipping, setshipping] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [total, setTotal] = useState("")
    const tax = 30
    const initialValue = 0
    useEffect(() => {
        const getSubTotal = items.reduce((acc, curr) => acc + curr.price, initialValue)
        const getTotal = getSubTotal < 500 ? getSubTotal + 35 : getSubTotal
        setSubTotal(getSubTotal) /* + tax */
        setTotal((getTotal + tax).toFixed(2))
    }, [cartItems])

    const onHandleRemoveItem = (product) => {
        const newArray = items.filter(item => item.uuid !== product.uuid)

        setCartContextValue({ ...cartContextValue, cartItems: [...newArray] })
        Cookies.set('cartItems', JSON.stringify([...newArray]))
    }
    return (
        <>
            <div className="w-full h-full bg-opacity-90 overflow-y-auto overflow-x-hidden fixed sticky-0" id="chec-div">
                <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
                    <div className="flex md:flex-row flex-col justify-end" id="cart">
                        <div className="w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">

                            <p className="text-5xl font-black leading-10 main_typo_color pt-3">Bag</p>
                            {
                                items.map((item) => (
                                    <div key={item.uuid} className="md:flex items-center mt-14 py-8 border-t border-gray-200">
                                        <div className="w-1/4">
                                            <img src={item.image} alt="" className="w-full h-full object-center object-cover" />
                                        </div>
                                        <div className="md:pl-3 md:w-3/4">

                                            <p className="text-xs leading-3 text-gray-600 pt-2">Category: {item.category} </p>
                                            <p className="text-xs leading-3 text-gray-600 py-4">Color: Default</p>
                                            <p className="w-96 text-xs leading-3 text-gray-600">{item.description}</p>
                                            <div className="flex items-center justify-between pt-5 pr-6">
                                                <div className="flex itemms-center">
                                                    <p onClick={() => onHandleRemoveItem(item)} className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</p>
                                                </div>
                                                <p className="text-base font-black leading-none text-gray-800">${item.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="xl:w-1/4 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                            <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                                <div>
                                    <p className="text-4xl font-black leading-9 main_typo_color">Summary</p>
                                    <div className="flex items-center justify-between pt-16">
                                        <p className="text-base leading-none text-gray-800">Subtotal</p>
                                        <p className="text-base leading-none text-gray-800">${subTotal}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-5">
                                        <p className="text-base leading-none text-gray-800">Shipping</p>
                                        <p className="text-base leading-none text-gray-800">${subTotal < 500 ? 35 : 0}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-5">
                                        <p className="text-base leading-none text-gray-800">Tax</p>
                                        <p className="text-base leading-none text-gray-800">${tax}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                        <p className="text-2xl leading-normal text-gray-800">Total</p>
                                        <p className="text-2xl font-bold leading-normal text-right text-gray-800">${total}</p>
                                    </div>
                                    <button onClick={() => setShow(!show)} className="text-base leading-none w-full py-5 checkout_button border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default CartOverview;
