import { createContext, useCallback, useContext } from 'react'

import useLocalStorage from '../../hooks/useLocalStorage'
import { cartReducer } from './CartReducer'

const CartContext = createContext()
const CartDispatchContext = createContext()

function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('cart', {})

  const dispatchCart = useCallback(action => {
    setCart(c => cartReducer(c, action))
    // both setCart, cartReducer have stable identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatchCart}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  )
}

function useCart() {
  return useContext(CartContext)
}

function useCartDispatch() {
  return useContext(CartDispatchContext)
}

export { CartProvider, useCart, useCartDispatch }
