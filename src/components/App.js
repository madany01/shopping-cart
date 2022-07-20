import { BrowserRouter, Route, Routes } from 'react-router-dom'

import useToggledState from '../hooks/useToggledState'

import Header from './Header'
import Home from './Home'
import Cart from './Cart'
import Products from './Products'
import Footer from './Footer'
import NotFound from './NotFound'
import { CartProvider } from './CartContext'

function App() {
  const [cartVisibility, toggleCartVisibility] = useToggledState(false)

  return (
    <BrowserRouter>
      <CartProvider>
        <Header onCartClick={toggleCartVisibility} />
        <main className='page-main-content'>
          <Cart onClose={toggleCartVisibility} visible={cartVisibility} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </CartProvider>
      <Footer />
    </BrowserRouter>
  )
}

export default App
