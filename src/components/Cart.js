import { useEffect } from 'react'
import products from '../products'
import CartProduct from './CartProduct'

function Cart({ visible = false, cart }) {
  const totalCost = Object.entries(cart).reduce(
    (acc, [productId, cnt]) => acc + cnt * products[productId].cost,
    0
  )

  useEffect(() => {
    if (visible) document.body.classList.add('noscroll')
    else document.body.classList.remove('noscroll')
  }, [visible])

  return (
    <div className={`cart-modal ${visible ? 'visible' : ''}`} aria-hidden={!visible}>
      <div className='content-wrap'>
        <h2 className='title'>your cart:</h2>
        <ul className='cart-products'>
          {Object.entries(cart).map(([productId, cnt]) => (
            <li key={productId}>
              <CartProduct productId={productId} cnt={cnt} />
            </li>
          ))}
        </ul>
        <hr />
        <p className='total-cost-ctr'>
          total cost = <span className='total-cost'>{totalCost}$</span>
        </p>
        <div className='btns'>
          <button className='checkout'>checkout</button>
          <button className='close'>close</button>
        </div>
      </div>
    </div>
  )
}
export default Cart
