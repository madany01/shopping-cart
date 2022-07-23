import products from '../../products'
import { CART_ACTION, useCartDispatch } from '../CartContext'

function CartProduct({ productId, quantity }) {
  const product = products[productId]
  const cartDispatch = useCartDispatch()

  const increase = () => {
    cartDispatch({ type: CART_ACTION.INCREMENT, id: productId })
  }

  const decrease = () => {
    cartDispatch({ type: CART_ACTION.DECREMENT, id: productId })
  }

  const setQuantity = e => {
    const newQuantity = Number(e.target.value)

    cartDispatch({ type: CART_ACTION.SET_QUANTITY, id: productId, quantity: newQuantity })
  }

  return (
    <div className='cart-product'>
      <div className='left'>
        <img src={product.img} alt={product.name} />
        <p className='cost-ctr'>
          <span className='cost'>{product.cost}</span>$
        </p>
      </div>

      <div className='right'>
        <div className='quantity-controls'>
          <button className='minus' onClick={decrease}>
            ➖
          </button>
          <input type='number' min='0' value={quantity} onChange={setQuantity} />
          <button className='plus' onClick={increase}>
            ➕
          </button>
        </div>

        <p className='total-ctr'>
          <span>total = </span>
          <span className='total' data-testid='totalCost'>
            {product.cost * quantity}$
          </span>
        </p>
      </div>
    </div>
  )
}

export default CartProduct
