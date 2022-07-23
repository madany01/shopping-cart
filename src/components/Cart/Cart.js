import { useEffect } from 'react'
import products from '../../products'
import CartProduct from '../CartProduct'
import { useCart } from '../CartContext'

function Cart({ visible = false, onClose }) {
  const cart = useCart()

  useEffect(() => {
    if (visible) document.body.classList.add('noscroll')
    else document.body.classList.remove('noscroll')
  }, [visible])

  const totalCost = Object.entries(cart).reduce(
    (acc, [productId, quantity]) => acc + quantity * products[productId].cost,
    0
  )

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      data-testid='cartContainer'
      className={`cart-modal ${visible ? 'visible' : ''}`}
      role='button'
      aria-hidden={!visible}
      tabIndex={0}
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className='content-wrap'>
        <h2 className='title'>your cart:</h2>
        <ul className='cart-products'>
          {Object.entries(cart).map(([productId, quantity]) => (
            <li key={productId}>
              <CartProduct productId={productId} quantity={quantity} />
            </li>
          ))}
        </ul>

        <hr />

        <p className='total-cost-ctr'>
          total cost ={' '}
          <span className='total-cost' data-testid='totalCost'>
            {totalCost}$
          </span>
        </p>

        <div className='btns'>
          <button className='checkout'>checkout</button>
          <button onClick={onClose} className='close'>
            close
          </button>
        </div>
      </div>
    </div>
  )
}
export default Cart
