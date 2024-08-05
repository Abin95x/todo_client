import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ProjectList from '../../components/ProjectList/ProjectList'


const Home = () => {
  const [render,setRender] = useState(true)
  return (
    <div>
      <Header render={render} setRender={setRender}/>
      <div>
        <ProjectList render={render} setRender={setRender}/>
      </div>
    </div>
  )
}

export default Home