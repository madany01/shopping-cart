import { CART_ACTION, useCartDispatch } from '../CartContext'

function Product({ product, quantity }) {
  const cartDispatch = useCartDispatch()

  const productId = product.id

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

  const addToCart = () => {
    cartDispatch({ type: CART_ACTION.ADD_TO_CART, id: productId })
  }

  return (
    <div className='product'>
      <div className='img-wrap'>
        <img src={product.img} alt={product.name} />
      </div>

      <div className='name-cost'>
        <p className='name'>{product.name}</p>
        <strong className='cost'>{product.cost}$</strong>
      </div>

      {(quantity > 0 && (
        <div className='quantity-controls'>
          <button className='minus' onClick={decrease}>
            ➖
          </button>
          <input type='number' min='0' value={quantity} onChange={setQuantity} />
          <button className='plus' onClick={increase}>
            ➕
          </button>
        </div>
      )) || (
        <button className='add-to-cart' onClick={addToCart}>
          add to cart
        </button>
      )}
    </div>
  )
}

export default Product
