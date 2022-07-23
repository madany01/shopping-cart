import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { useCart } from '../CartContext'

import Products from './Products'

const products = {
  p1: { id: 'p1', name: 'product1' },
  p2: { id: 'p2', name: 'product2' },
  p3: { id: 'p3', name: 'product3' },
}

function MockedProduct({ product, quantity }) {
  return `product[${product.id}].quantity=${quantity}`
}

jest.mock('../../products', () => products)

jest.mock('../CartContext', () => ({
  useCart: jest.fn(),
}))

beforeEach(() => {
  // can't mock it directly in jest.mock('../CartContext') like useCart: jest.fn().mockReturnValue(...)
  useCart.mockReturnValue({})
})

jest.mock('../Product', () => MockedProduct)

describe('Products', () => {
  it('renders products', () => {
    const cart = { p1: 1, p2: 2 }
    useCart.mockReturnValue(cart)

    render(<Products />)

    expect(screen.getByRole('list')).toBeInTheDocument()

    const items = screen.getAllByRole('listitem')

    expect(items.length).toBe(Object.entries(products).length)

    Object.entries(products).forEach(([id, product]) => {
      expect(
        screen.getByText(MockedProduct({ product, quantity: cart[id] || 0 }))
      ).toBeInTheDocument()
    })
  })
})
