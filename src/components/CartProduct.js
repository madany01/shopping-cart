import products from '../products'

function CartProduct({ productId, cnt }) {
  const product = products[productId]

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
          <button className='minus'>➖</button>
          <input type='number' min='0' value={cnt} />
          <button className='plus'>➕</button>
        </div>
        <p className='total-ctr'>
          total = <span className='total'>{product.cost * cnt}$</span>
        </p>
      </div>
    </div>
  )
}

export default CartProduct
