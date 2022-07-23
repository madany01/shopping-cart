import { render } from '@testing-library/react'

import Home from './Home'

jest.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}))

describe('Home', () => {
  it('matches the snapshot', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
})
