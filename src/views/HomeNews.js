import * as R from 'ramda'
import React, {useState, useEffect} from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { HashLink as Link } from 'react-router-hash-link'

import {fdate} from '../util'
import api from '../services/api'

function HomeNews() {

  const [slideNext, setSlideNext] = useState(null)
  const [noticias, setNoticias] = useState([])
  const [schedules, setSchedules] = useState([])

  useEffect(()=>{
    async function fetchData(){
      const noticias = await api.get('/noticias')
      setNoticias(noticias.data.reverse())
      const schedules = await api.get('/schedules?_limit=5')
      setSchedules(schedules.data)
    }
    fetchData()

  },[])

  useEffect(() => {
    const interval = setInterval(() => {
      slideNext && slideNext()
    }, 8000);
    return () => clearInterval(interval)
  }, [slideNext])

  const latestPosts = R.slice(0, 3, noticias)
  const bindSwiper = (swiper) => setSlideNext(() => () => swiper.slideNext())
  const bgcover = (url) => `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${url}) no-repeat 50% 50%`

  return (
    <section id="noticias" className="home-news full-section">
      <div className="cols">
        <div className="col agenda center-out">
          <div className="section-header">
            <div className="title">Nossa Programação</div>
            <div className="projetos-box">
              <div className="projetos-box-title bg-g">Pedagogia das Cordas</div>
              <div className="projetos-box-title bg-b">Projetos Espiral</div>
              <div className="projetos-box-title bg-y">Academia de Regência</div>
            </div>
          </div>
          <div className="center-in">
            {schedules.map((evento,i) => {
              const date = fdate(evento.date)
              return (
                <div className="agenda-item" key={`agenda-${i}`}>
                  <div className="agenda-date">
                    <h3 style={{color: evento.projeto.color}}>{date.day}</h3>
                    <p>{date.month}</p>
                  </div>
                  <div className="agenda-content">
                    <h3 style={{color: evento.projeto.color}}>{evento.time} | {evento.title}</h3>
                    <p>{evento.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="col noticias center-out--off">
          <div className="section-header">
            <div className="title">Notícias</div>
          </div>
          {noticias.length &&
            <Swiper
              loop={true}
              onSwiper={bindSwiper}
            >
              {latestPosts.map((noticia,i)=>{
                const date = fdate(noticia.date)
                const foto = noticia.pic
                return(
                  <SwiperSlide key={`${noticia.id}-slide-${i}`}>
                    <article
                      className="noticia"
                      style={{background: bgcover(`https://admin.sinos.art.br${foto.url}`), backgroundSize: `cover` }}
                    >
                      <div className="content-wrapper">
                        <div className="content">
                          <h3>{noticia.title}</h3>
                          <p>{noticia.call}</p>
                          <p className="post-date">Publicado em {date.day} de {date.month} de {date.year}</p>
                        </div>
                        <div><Link className="leiamais" to={`/noticias/${noticia.id}`}>Leia mais</Link></div>
                      </div>
                      
                    </article>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          }
        </div>
      </div>
    </section>
  );
}

export default HomeNews;
