function Product({ product, quantity }) {
  return (
    <div className='product'>
      <div className='img-wrap'>
        <img src={product.img} alt={product.name} />
      </div>

      <div className='name-cost'>
        <div className='name'>{product.name}</div>
        <div className='cost'>{product.cost}$</div>
      </div>

      {(quantity > 0 && (
        <div className='quantity-controls'>
          <button className='minus'>➖</button>
          <input type='number' min='0' value={quantity} />
          <button className='plus'>➕</button>
        </div>
      )) || <button className='add-to-cart'>add to cart</button>}
    </div>
  )
}

export default Product
