import React, {useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { HashLink as Link } from 'react-router-hash-link'

function HomeAVS(props) {

  const {academy, projects} = props

  const [selected,setSelected] = useState(0)
  const [slideTo, setSlideTo] = useState(null)

  const len = projects.length
  const next = (selected + 1) % len
  const prev = (selected - 1 + len) % len

  // swiper events
  const onSlide = (e) => setSelected(e.realIndex)
  const bindSwiper = (swiper) => setSlideTo(() => x => swiper.slideToLoop(x))

  const hasnav = len > 1 ? 'block' : 'none';

  return (

    <section id={academy.slug} className={`home-curso full-section curso-Academia-virtual-Sinos`}>

      <div className="curso-swiper">
      <Swiper
          spaceBetween={50}
          loop={true}
          onSlideChange={onSlide}
          onSwiper={bindSwiper}
        >
          {projects.map((m,i)=>{
            return (
              <SwiperSlide key={`${m.id}-slide-${i}`}>
                <div className="curso-slide" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(https://admin.sinos.art.br${m.cover.url})`}}/>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div className="swiper-nav prev" style={{display: hasnav}} onClick={() => slideTo(prev)}>&laquo; {projects[prev].title}</div>
        <div className="swiper-nav next" style={{display: hasnav}} onClick={() => slideTo(next)}>{projects[next].title} &raquo;</div>
      </div>

      <div className="curso-info">

        <div className="col col-1">
          <div className="title" style={{backgroundColor: academy.color}}>{academy.title}</div>
          <div className="content">{academy.description}</div>
        </div>

        <div className="col col-2">
          <div className={`title white`}>
            Selecione o projeto
          </div>
          {projects.map((project,i)=>{
            return(
              <div className="home-curso-cat" key={`home-curso-cat-${i}`}>
                <div className="desc">{project.title}</div>
                <div className="acessar">
                  <Link to={`/academia-virtual/${project.slug}/`}>Acessar &raquo;</Link>
                </div>
              </div>
            )
          })}
        </div>

      </div>
      
    </section>
  )
}

export default HomeAVS
