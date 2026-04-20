import React from 'react'
import img from '../../assets/cta.png'
import { Link } from 'react-router-dom'
const Add1 = () => {
  return (
    <section className='bg-gray-100'>
    <div className=' max-w-7xl px-2 lg:px-6 xl:px-8 mx-auto '>
      <Link to={"/contact"}>
        <img src={img} alt="" />
        </Link>
    </div>
    </section>
  )
}

export default Add1