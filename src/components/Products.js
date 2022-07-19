import products from '../products'
import Product from './Product'

function Products({ cart }) {
  return (
    <ul className='products'>
      {Object.values(products).map(product => (
        <li key={product.id}>
          <Product
            quantity={product.id in cart ? cart[product.id] : 0}
            product={product}
          />
        </li>
      ))}
    </ul>
  )
}

export default Products
