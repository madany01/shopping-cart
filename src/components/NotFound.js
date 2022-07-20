import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='not-found'>
      <h1>404 Not Found</h1>
      <p>Make sure you type the correct URL</p>
      <Link to='/'>👉 Back to Home</Link>
    </div>
  )
}

export default NotFound
