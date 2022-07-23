import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../CartContext'

function Header({ onCartClick }) {
  const cart = useCart()

  const numCartItems = Object.entries(cart).reduce((acc, [, cnt]) => acc + cnt, 0)

  return (
    <header className='page-main-header'>
      <Link to='/' className='logo'>
        CourseCart
      </Link>

      <div className='right'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            `nav-link nav-link--home ${isActive ? 'active' : ''}`
          }
        >
          home
        </NavLink>
        <NavLink
          to='/products'
          className={({ isActive }) =>
            `nav-link nav-link--products ${isActive ? 'active' : ''}`
          }
        >
          products
        </NavLink>

        <button onClick={onCartClick} className='cart'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            className='bi bi-cart2'
            viewBox='0 0 16 16'
          >
            <path d='M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z' />
          </svg>
          <span className='amount'>{numCartItems}</span>
        </button>
      </div>
    </header>
  )
}

export default Header
