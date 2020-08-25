import React, { useState, useEffect } from 'react'
import HomeLanding from './HomeLanding'
import HomeNews from './HomeNews'
import HomeCurso from './HomeCurso'
// import HomeOrquestras from './HomeOrquestras'
import Footer from './Footer'

import api from '../services/api'

function Home() {
  const [projetos, setProjetos] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get('/projetos')
      const posts = await api.get('/blog-posts')
      setProjetos(response.data)
      setPosts(posts.data)
    }
    fetchData()
  },[])
  
  return (
    <div className="Home">
      <HomeLanding />
      <HomeNews />
      {projetos.map((data,i) =>{
        return <HomeCurso id={data.id} key={`home-curso-${data.id}`} data={data}/>
      })}
      {/* <HomeOrquestras id="eorquestras" /> */}
      <Footer />
    </div>
  );
}

export default Home;
