import React from 'react'
import Header from '../../components/Header/Header'
import Body from '../../components/Body/Body'


const Home = () => {
  return (
    <div>
      <Header />
      <div className='flex'>
        <Body />
      </div>
    </div>
  )
}

export default Home