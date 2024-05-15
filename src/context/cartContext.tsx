import { createContext, useContext, useState } from "react"
import Cookies from "js-cookie";
export const CartContext = createContext<any>({})
interface ICartContext {
    cartItems: [];
    shipping: {}
}
export const CartContextProvider = ({ children }) => {
    const [cartContextValue, setCartContextValue] = useState<ICartContext>({
        cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
        shipping: Cookies.get('shipping') ? JSON.parse(Cookies.get('shipping')) : {},

    })
    return <CartContext.Provider value={{ cartContextValue, setCartContextValue}}>{children}</CartContext.Provider>
}
export const useCartContext = () => {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('CartContext must be used inside CartProvider')
    }
    return context
}