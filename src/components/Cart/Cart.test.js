import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { useCart } from '../CartContext'

import Cart from './Cart'

const products = {
  p1: { id: 'p1', name: 'product1' },
  p2: { id: 'p2', name: 'product2' },
  p3: { id: 'p3', name: 'product3' },
}

function MockedCartProduct({ productId, quantity }) {
  return `product[${productId}].quantity=${quantity}`
}

jest.mock('../../products', () => products)

jest.mock('../CartContext', () => ({
  useCart: jest.fn(),
}))

jest.mock('../CartProduct', () => MockedCartProduct)

beforeEach(() => {
  // can't mock it directly in jest.mock('../CartContext') like useCart: jest.fn().mockReturnValue(...)
  useCart.mockReturnValue({})
})

describe('Cart', () => {
  it('adds .noscroll to document.body when visible', () => {
    render(<Cart visible />)
    expect(document.body.classList).toContain('noscroll')
  })

  it("don't add .noscroll to document.body when not visible", () => {
    render(<Cart />)
    expect(document.body.classList).not.toContain('noscroll')
  })

  it('renders products', () => {
    const cart = { p1: 1, p2: 2 }
    useCart.mockReturnValue(cart)

    render(<Cart visible />)

    expect(screen.getByRole('list')).toBeInTheDocument()

    const items = screen.getAllByRole('listitem')

    expect(items.length).toBe(Object.entries(cart).length)

    Object.entries(cart).forEach(([productId, quantity]) => {
      expect(
        screen.getByText(MockedCartProduct({ productId, quantity }))
      ).toBeInTheDocument()
    })
  })

  it('renders correct total cost', () => {
    const cart = { p1: 1, p2: 2 }
    useCart.mockReturnValue(cart)

    render(<Cart visible />)

    const totalCost = Object.entries(cart).reduce(
      (acc, [productId, quantity]) => acc + quantity * products[productId],
      0
    )

    expect(screen.getByTestId('totalCost').textContent.trim()).toBe(`${totalCost}$`)
  })

  it('calls onClose prop when close button or overlay clicked', () => {
    const onClose = jest.fn()
    render(<Cart visible onClose={onClose} />)

    const closeBtn = screen.getByRole('button', { name: 'close' })
    userEvent.click(closeBtn)

    expect(onClose).toHaveBeenCalledTimes(1)

    const overlay = screen.getByTestId('cartContainer')
    userEvent.click(overlay)

    expect(onClose).toHaveBeenCalledTimes(2)
  })
})
