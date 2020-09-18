import React, { useState, useEffect } from 'react'
import HomeLanding from './HomeLanding'
import HomeNews from './HomeNews'
import HomeCurso from './HomeCurso'
// import HomeOrquestras from './HomeOrquestras'
import Footer from './Footer'
import VirtualAcademy from '../views/VirtualAcademy'

import api from '../services/api'

function Home() {
  const [projetos, setProjetos] = useState([])
  const [academies, setAcademy] = useState([])

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get('/projetos')
      setProjetos(response.data)
      const academyResponse = await api.get('/academia-virtuals')
      setAcademy(academyResponse.data)
    }
    fetchData()
  },[])

  return (
    <div className="Home">
      <HomeLanding />
      <HomeNews />
      {projetos.map((data,i) =>{
        return <HomeCurso id={data.slug} key={`home-curso-${data.id}`} data={data}/>
      })}
      {/* <HomeOrquestras id="eorquestras" /> */}
      {academies.map((data, i) => {
        return <VirtualAcademy academy={data} key={data.id} projects={data.projetos}/>
      })  
      }
      <Footer />
    </div>
  );
}

export default Home;
