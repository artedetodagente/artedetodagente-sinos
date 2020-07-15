import React, {useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { HashLink as Link } from 'react-router-hash-link'
import { set } from 'ramda'

function HomeCurso(props) {

  const {data} = props

  const [dropIsDown,setDrop] = useState(false)
  const [selected,setSelected] = useState(0)
  const [slideTo, setSlideTo] = useState(null)

  const current = data.modules[selected]

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

  return (

    <section id={data.id} className="home-curso full-section">

      <div className="curso-swiper">
        <Swiper
          spaceBetween={50}
          loop={true}
          onSlideChange={onSlide}
          onSwiper={bindSwiper}
        >
          {data.modules.map((m,i)=>{
            return (
              <SwiperSlide key={`${data.id}-slide-${i}`}>
                <div className="curso-slide" style={{backgroundImage: `url(${m.image})`}}/>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      <div className="curso-info">

        <div className="header">
          <div className="title" style={{backgroundColor: data.color}}>{data.title}</div>
          <div className={`dropdown ${dropIsDown ? 'isdown' : ''}`}>
            <div className="selected" onClick={dropToggle}>{current.title}</div>
            <div className="options-viewport">
              <div className="options">
              {data.modules.map((m,i)=>{
                return <li key={`${data.id}-drop-${i}`} onClick={dropSelect(i)}>{m.title}</li>
              })}
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="text">{data.text}</div>
          <div className="counter">{data.modules.length} módulos</div>
        </div>

        <div className="acessar">
          <Link to={`/cursos/${data.id}/${current.id}`}>Acessar</Link>
        </div>

      </div>
      
    </section>
  )
}

export default HomeCurso
