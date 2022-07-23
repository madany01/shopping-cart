import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { CART_ACTION, useCartDispatch } from '../CartContext'

import CartProduct from '.'

const mockedProducts = {
  p1: {
    id: 'p1',
    img: 'https://example.com/img1.jpeg',
    name: 'productName1',
    cost: 123,
  },
}

const product = mockedProducts.p1

jest.mock('../CartContext', () => {
  // eslint-disable-next-line no-shadow
  const { CART_ACTION } = jest.requireActual('../CartContext')
  return {
    CART_ACTION,
    useCartDispatch: jest.fn(),
  }
})

jest.mock('../../products', () => ({
  p1: {
    id: 'p1',
    img: 'https://example.com/img1.jpeg',
    name: 'productName1',
    cost: 123,
  },
}))

describe('CartProduct', () => {
  it('renders product info', () => {
    render(<CartProduct productId={product.id} quantity={1} />)

    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', product.img)

    expect(screen.getByText(`${product.cost}$`)).toBeInTheDocument()
  })

  it('renders total cost of product (quantity * product.cost)', () => {
    render(<CartProduct productId={product.id} quantity={5} />)
    const totalCost = 5 * product.cost
    expect(screen.getByTestId('totalCost').textContent.trim()).toBe(`${totalCost}$`)
  })

  it('renders quantity controls', () => {
    render(<CartProduct productId={product.id} quantity={2} />)

    expect(screen.getByRole('button', { name: /➖/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /➕/i })).toBeInTheDocument()

    const numberInput = screen.getByRole('spinbutton')

    expect(numberInput).toBeInTheDocument()
    expect(numberInput).toHaveAttribute('value', '2')
  })

  describe('interaction with CartContext', () => {
    it('dispatches { type: CART_ACTION.INCREMENT, productId } when use clicks plus button', () => {
      const cartDispatch = jest.fn()
      useCartDispatch.mockImplementation(() => cartDispatch)

      render(<CartProduct quantity={4} productId={product.id} />)

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

      render(<CartProduct quantity={4} productId={product.id} />)

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

      render(<CartProduct quantity={4} productId={product.id} />)

      const numberInput = screen.getByRole('spinbutton')

      userEvent.type(numberInput, '12')

      expect(cartDispatch.mock.calls).toEqual([
        [{ type: CART_ACTION.SET_QUANTITY, id: product.id, quantity: 41 }],
        [{ type: CART_ACTION.SET_QUANTITY, id: product.id, quantity: 412 }],
      ])
    })
  })
})
