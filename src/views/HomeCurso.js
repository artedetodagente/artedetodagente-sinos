import React, {useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { HashLink as Link } from 'react-router-hash-link'

function HomeCurso(props) {

  const {data} = props
  const {modules} = data

  const [dropIsDown,setDrop] = useState(false)
  const [selected,setSelected] = useState(0)
  const [slideTo, setSlideTo] = useState(null)

  const len = modules.length
  const current = modules[selected]
  const next = (selected + 1) % len
  const prev = (selected - 1 + len) % len

  // swiper events
  const onSlide = (e) => setSelected(e.realIndex)
  const bindSwiper = (swiper) => setSlideTo(() => x => swiper.slideToLoop(x))

  // dropdown events
  const dropToggle = () => setDrop(!dropIsDown)
  const dropSelect = (i) => () => {
    if(dropIsDown){
      setDrop(false)
    }
    setSelected(i)
    slideTo(i)
  }

  const hasnav = len > 1 ? 'block' : 'none';

  return (

    <section id={data.id} className="home-curso full-section">

      <div className="curso-swiper">
        <Swiper
          spaceBetween={50}
          loop={true}
          onSlideChange={onSlide}
          onSwiper={bindSwiper}
        >
          {modules.map((m,i)=>{
            return (
              <SwiperSlide key={`${data.id}-slide-${i}`}>
                <div className="curso-slide" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${m.image})`}}/>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div className="swiper-nav prev" style={{display: hasnav}} onClick={dropSelect(prev)}>&laquo; {modules[prev].title}</div>
        <div className="swiper-nav next" style={{display: hasnav}} onClick={dropSelect(next)}>{modules[next].title} &raquo;</div>
      </div>

      <div className="curso-info">

        <div className="col col-1">
          <div className="title" style={{backgroundColor: data.color}}>{data.title}</div>
          <div className="text">{data.text}</div>
          <div className="acessar" style={{display: hasnav}}>
            <Link to={`/cursos/${data.id}/${current.id}`}>Acessar &raquo;</Link>
          </div>
        </div>

        <div className="col col-2">
          <div className={`dropdown ${dropIsDown ? 'isdown' : ''}`}>
            <div className="selected" onClick={dropToggle}>
              <div className="droptitle">{dropIsDown ? 'Selecione' : current.title}</div>
              <div className="dropicon"><img src="/img/icons/arrow-down.svg" width="20" alt="" /></div>
            </div>
            <div className="options-viewport">
              <div className="options">
              {modules.map((m,i)=>{
                return <li key={`${data.id}-drop-${i}`} onClick={dropSelect(i)}>{m.title}</li>
              })}
              </div>
            </div>
          </div>
          <div className="desc">{current.text}</div>
        </div>

      </div>
      
    </section>
  )
}

export default HomeCurso
