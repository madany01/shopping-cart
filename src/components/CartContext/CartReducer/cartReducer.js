import CART_ACTION from './CART_ACTION'

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

export default cartReducer
