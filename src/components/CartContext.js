import { createContext, useCallback, useContext } from 'react'

import useLocalStorage from '../hooks/useLocalStorage'

const CartContext = createContext()
const CartDispatchContext = createContext()

const CART_ACTION = Object.freeze({
  ADD_TO_CART: 0,
  INCREMENT: 1,
  DECREMENT: 2,
  SET_QUANTITY: 3,
})

function cartReducer(cart, action) {
  switch (action.type) {
    case CART_ACTION.ADD_TO_CART:
      return { ...cart, [action.id]: 1 }

    case CART_ACTION.INCREMENT:
      return { ...cart, [action.id]: (cart[action.id] ?? 0) + 1 }

    case CART_ACTION.DECREMENT:
      if (cart[action.id] <= 1) {
        const { [action.id]: _, ...rest } = cart
        return rest
      }
      return { ...cart, [action.id]: cart[action.id] - 1 }

    case CART_ACTION.SET_QUANTITY:
      if (action.quantity <= 0) {
        const { [action.id]: _, ...rest } = cart
        return rest
      }
      return { ...cart, [action.id]: action.quantity }

    default:
      throw new Error(
        `unknown action ${action.type}, expected to be from ${JSON.stringify(CART_ACTION)}`
      )
  }
}

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

export { CartProvider, useCart, useCartDispatch, CART_ACTION }
