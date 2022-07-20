import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './Header'
import Home from './Home'
import Cart from './Cart'
import Products from './Products'
import Footer from './Footer'
import NotFound from './NotFound'

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
    <BrowserRouter>
      <Header numCartItems={numCartItems} />
      <main className='page-main-content'>
        <Cart visible={cartVisibility} cart={cart} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products cart={cart} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
