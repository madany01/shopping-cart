import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { useCart } from '../CartContext'

import Header from '.'

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children, to: href, ...props }) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
    NavLink: ({ children, to: href, className, ...props }) => (
      <a href={href} className={className({ isActive: false })} {...props}>
        {children}
      </a>
    ),
  }
})

jest.mock('../CartContext', () => ({
  __esModule: true,
  useCart: jest.fn(),
}))

beforeEach(() => {
  // can't mock it directly in jest.mock('../CartContext') like useCart: jest.fn().mockReturnValue(...)
  useCart.mockReturnValue({})
})

describe('Header', () => {
  describe('renders correct number of cart items', () => {
    it('renders 0 when cart is empty', () => {
      useCart.mockReturnValue({})

      render(<Header onCartClick={jest.fn()} />)
      expect(screen.getByRole('button', { name: 0 })).toBeInTheDocument()
    })

    it('renders number of cart items', () => {
      useCart.mockReturnValue({ product1: 10, product2: 5, product3: 4 })

      render(<Header onCartClick={jest.fn()} />)

      expect(screen.getByRole('button', { name: 19 })).toBeInTheDocument()
    })
  })

  it('calls onCartClick when cart clicked', () => {
    const onCartClick = jest.fn()

    render(<Header onCartClick={onCartClick} />)

    const btn = screen.getByRole('button', { name: 0 })
    userEvent.click(btn)

    expect(onCartClick).toHaveBeenCalledTimes(1)

    userEvent.click(btn)
    expect(onCartClick).toHaveBeenCalledTimes(2)
  })
})
