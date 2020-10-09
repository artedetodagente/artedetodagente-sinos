import React, { useState, useEffect } from 'react'
import HomeLanding from './HomeLanding'
import HomeNews from './HomeNews'
import HomeCurso from './HomeCurso'
import HomeAVS from './HomeAVS'
import RepertorioSinos from './HomeRepertorio'
// import HomeOrquestras from './HomeOrquestras'
import Footer from './Footer'

import api from '../services/api'

function Home() {
  const [projetos, setProjetos] = useState([])
  const [academies, setAcademy] = useState([])
  const [repertorio, setRepertorio] = useState([])
  const [coverUrl, setRepertorioCover] = useState('')

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get('/projetos');
      setProjetos(response.data);
      const academyResponse = await api.get('/academia-virtuals');
      setAcademy(academyResponse.data);
      const repertorioResponse = await api.get('/repertorio-sinos');
      setRepertorio(repertorioResponse.data);
      setRepertorioCover(repertorioResponse.data.cover.url)
    }
    fetchData();
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
        return <HomeAVS academy={data} key={data.id} projects={data.projetos}/>
      })  
      }
      <RepertorioSinos repertorio={repertorio} url={coverUrl}/>
      <Footer />
    </div>
  );
}

export default Home;
