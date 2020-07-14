import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { HashLink as Link } from 'react-router-hash-link'

function HomeCurso(props) {

  const {data} = props

  return (
    <section id={data.id} className="home-curso full-section">
      <div className="curso-swiper">
        <Swiper
          spaceBetween={50}
          loop={true}
          // slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
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
          <div className="dropdown">Dropdown</div>
        </div>
        <div className="content">
          <div className="text">{data.text}</div>
          <div className="counter">6 modulos</div>
        </div>
        <div className="acessar">
          <Link to={`/cursos/${data.id}`}>Acessar</Link>
        </div>
      </div>
    </section>
  );
}

export default HomeCurso;
