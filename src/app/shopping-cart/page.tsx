'use client'
import React from "react";
import CartOverview from "../components/CartOverview";
import { useCartContext } from '@/context/cartContext'
import Link from "next/link";

const ShoppingCart = () => {

    const { cartContextValue } = useCartContext()
    const { cartItems } = cartContextValue
    return (
        <>
            {
                cartItems.length > 0 ? (
                    <div className='product_list_container'>
                        <CartOverview items={cartItems} />

                    </div>
                ) : (
                    <p className="flex justify-center">Nothing in bag. Check recent items<Link className="text-rose-900" href={'/'}>&nbsp;Here</Link></p>
                )
            }

        </>
    );
}

export default ShoppingCart;
