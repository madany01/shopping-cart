import Header from './Header'
import Home from './Home'
import Cart from './Cart'
import Products from './Products'
import Footer from './Footer'

const cart = {
  python: 1,
  css: 4,
  django: 3,
  fastapi: 2,
  mongodb: 2,
}

function App() {
  const numCartItems = Object.entries(cart).reduce((acc, [, cnt]) => acc + cnt, 0)
  const cartVisibility = true

  return (
    <>
      <Header numCartItems={numCartItems} />

      <main className='page-main-content'>
        <Cart visible={cartVisibility} cart={cart} />
        <Home />
        {/* <Products cart={cart} /> */}
      </main>

      <Footer />
    </>
  )
}

export default App
