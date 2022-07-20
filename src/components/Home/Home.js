import { Link } from 'react-router-dom'
import homeImg from './home-img.jpg'

function Home() {
  return (
    <div className='home'>
      <div className='website-info'>
        <h1 className='large'>WebDev Courses</h1>
        <p className='md'>Learn Web development</p>
        <Link to='/products' className='products-btn'>
          Show Courses
        </Link>
      </div>
      <div className='img-wrap'>
        <img src={homeImg} alt='programmer typing in front of three screens' />
      </div>
    </div>
  )
}

export default Home
