import React, { useState, useEffect } from 'react'
import HomeLanding from './HomeLanding'
import HomeNews from './HomeNews'
import HomeCurso from './HomeCurso'
import HomeAVS from './HomeAVS'
import RepertorioSinos from './HomeRepertorio'
import ConcertosSinos from './HomeConcertos'
import HomeFimuca from './HomeFimuca'
import MenuDropdown from './MenuDropdown'
import Footer from './Footer'
import HomeRevista from "./HomeRevista"

import { useScrollYPosition } from 'react-use-scroll-position'
import useWindowSize from '../util/useWindowSize'

import api from '../services/api'

function Home() {

  const scrollY = useScrollYPosition();
  const size = useWindowSize();

  const [projetos, setProjetos] = useState([]);
  const [academies, setAcademy] = useState([]);
  const [repertorio, setRepertorio] = useState([]);
  const [concerto, setConcerto] = useState([]);
  const [coverUrl, setRepertorioCover] = useState('');
  const [concertosCover, setConcertosCover] = useState('');
  const [publicacoes, setPubli] = useState({});

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get('/projetos');
      setProjetos(response.data);
      const academyResponse = await api.get('/academia-virtuals');
      setAcademy(academyResponse.data);
      const repertorioResponse = await api.get('/repertorio-sinos');
      setRepertorio(repertorioResponse.data);
      setRepertorioCover(repertorioResponse.data.cover.url)
      const concertoResponse = await api.get('/concertos-sinos');
      setConcerto(concertoResponse.data[0])
      setConcertosCover(concertoResponse.data[0].cover.url)
      const responsePublicacoes = await api.get('/publicacao-sinos');
      setPubli(responsePublicacoes.data.reverse());
    }
    fetchData();
  },[])

  return (
    <div className="Home">
      {scrollY > size.height - 300 && 
        <div className="home-menu"><MenuDropdown align="right" /></div>
      }
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
      <ConcertosSinos concertoSinos={concerto} url={concertosCover}/>
      <HomeRevista publicacoes={publicacoes}/>
      <HomeFimuca/>
      <Footer />
    </div>
  );
}

export default Home;
