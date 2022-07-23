import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { CART_ACTION, useCartDispatch } from '../CartContext'

import Product from '.'

jest.mock('../CartContext', () => {
  // eslint-disable-next-line no-shadow
  const { CART_ACTION } = jest.requireActual('../CartContext')
  return {
    CART_ACTION,
    useCartDispatch: jest.fn(),
  }
})

const product = {
  id: 'productId',
  img: 'https://example.com/img.jpeg',
  name: 'productName',
  cost: 123,
}

describe('Product', () => {
  it('renders product info', () => {
    render(<Product product={product} quantity={1} />)

    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', product.img)

    expect(screen.getByText(product.name)).toBeInTheDocument()

    expect(screen.getByText(`${product.cost}$`)).toBeInTheDocument()
  })

  it('renders add to cart button when quantity = 0', () => {
    render(<Product product={product} quantity={0} />)
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })

  it('renders quantity controls when quantity > 0', () => {
    render(<Product product={product} quantity={2} />)

    expect(screen.getByRole('button', { name: /➖/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /➕/i })).toBeInTheDocument()

    const numberInput = screen.getByRole('spinbutton')

    expect(numberInput).toBeInTheDocument()
    expect(numberInput).toHaveAttribute('value', '2')
  })

  it("does't render quantity controls when quantity = 0", () => {
    render(<Product product={product} quantity={0} />)
    expect(screen.queryByRole('button', { name: /➖/i })).toBe(null)
    expect(screen.queryByRole('button', { name: /➕/i })).toBe(null)
    expect(screen.queryByRole('spinbutton')).toBe(null)
  })

  it("doesn't render add to cart button when quantity > 0", () => {
    render(<Product product={product} quantity={1} />)
    expect(screen.queryByRole('button', { name: /add to cart/i })).toBe(null)
  })

  describe('interaction with CartContext', () => {
    it('dispatches { type: CART_ACTION.ADD_TO_CART, productId } when use clicks add to cart', () => {
      const cartDispatch = jest.fn()
      useCartDispatch.mockImplementation(() => cartDispatch)

      render(<Product quantity={0} product={product} />)

      const btn = screen.getByRole('button', { name: /add to cart/i })

      userEvent.click(btn)

      expect(cartDispatch).toHaveBeenNthCalledWith(1, {
        type: CART_ACTION.ADD_TO_CART,
        id: product.id,
      })
    })

    it('dispatches { type: CART_ACTION.INCREMENT, productId } when use clicks plus button', () => {
      const cartDispatch = jest.fn()
      useCartDispatch.mockImplementation(() => cartDispatch)

      render(<Product quantity={4} product={product} />)

      const btn = screen.getByRole('button', { name: /➕/i })

      userEvent.click(btn)

      expect(cartDispatch).toHaveBeenNthCalledWith(1, {
        type: CART_ACTION.INCREMENT,
        id: product.id,
      })
    })

    it('dispatches { type: CART_ACTION.DECREMENT, productId } when use clicks minus button', () => {
      const cartDispatch = jest.fn()
      useCartDispatch.mockImplementation(() => cartDispatch)

      render(<Product quantity={4} product={product} />)

      const btn = screen.getByRole('button', { name: /➖/i })

      userEvent.click(btn)

      expect(cartDispatch).toHaveBeenNthCalledWith(1, {
        type: CART_ACTION.DECREMENT,
        id: product.id,
      })
    })

    it('dispatches { type: CART_ACTION.SET_QUANTITY, productId, quantity } when use types a number', () => {
      const cartDispatch = jest.fn()
      useCartDispatch.mockImplementation(() => cartDispatch)

      render(<Product quantity={4} product={product} />)

      const numberInput = screen.getByRole('spinbutton')

      userEvent.type(numberInput, '12')

      expect(cartDispatch.mock.calls).toEqual([
        [{ type: CART_ACTION.SET_QUANTITY, id: product.id, quantity: 41 }],
        [{ type: CART_ACTION.SET_QUANTITY, id: product.id, quantity: 412 }],
      ])
    })
  })
})
