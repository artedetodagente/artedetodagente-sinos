import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react'
import {DropDown} from '../components/Dropdown'
import {RedLink,AccessLink} from '../components/CommonStyles'

import * as R from 'ramda'

function HomeCurso(props) {

  const history = useHistory()

  const {data, id} = props

  const categorias = R.sortBy(R.prop('order'), data.categorias)

  const [selected,setSelected] = useState(null)
  const [slideTo, setSlideTo] = useState(null)

  const len = categorias.length
  const current = categorias[selected]
  const next = (selected + 1) % len
  const prev = (selected - 1 + len) % len

  const placeholder = {
    'Pedagogia-das-Cordas': 'selecione uma categoria',
    'Projeto-Espiral': 'selecione um instrumento',
    'Academia-de-Regencia': 'selecione um tema'
  }

  const selectCurso = (i) => {
    setSelected(i)
    slideTo(i)
  }

  const selectCursoFromDropdown = (i) => {
    return categorias[i].cursos.length === 1
      ? history.push(`/cursos/${data.slug}/${categorias[i].cursos[0].slug}`)
      : selectCurso(i)
  }

  // swiper events
  const onSlide = (e) => selected !== null && setSelected(e.realIndex)
  const bindSwiper = (swiper) => {
    setSlideTo(() => x => swiper.slideToLoop(x))
    setTimeout(()=>swiper&&swiper.slideToLoop(Math.random()*len),1000)
  }

  const hasnav = len > 1 ? 'block' : 'none';

  return (
    <section id={data.slug} className={`home-curso full-section curso-${id}`}>
      <div className="curso-swiper">
        <Swiper
          spaceBetween={50}
          loop={true}
          onSlideChange={onSlide}
          onSwiper={bindSwiper}
        >
          {categorias.map((m,i)=>{
            return (
              <SwiperSlide key={`${data.id}-slide-${i}`}>
                <div className="curso-slide" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(https://admin.sinos.art.br${m.image.url})`}}/>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div className="swiper-nav prev" style={{display: hasnav}} onClick={()=>selectCurso(prev)}>&laquo; {categorias[prev].title}</div>
        <div className="swiper-nav next" style={{display: hasnav}} onClick={()=>selectCurso(next)}>{categorias[next].title} &raquo;</div>
      </div>
      <div className="curso-info">
        <div className="col col-1">
          <div className="title" style={{backgroundColor: data.color}}>{data.title}</div>
          <div className="content">
            <div className="text">{data.intro}</div>
            {
              data.categorias
                .map((item) => item.cursos)
                .reduce((acc, cur) => [ ...acc, ...cur ], [])
                .length > 1 
              && <RedLink to={`/cursos/${data.slug}`}>Saiba mais</RedLink>
            }
          </div>
        </div>
        <div className="col col-2">
          {
            data.categorias.length > 1 ? (
              <>
                <DropDown
                  placeholder={placeholder[data.slug] || 'selecione uma categoria'}
                  selected={selected}
                  options={categorias.map((m,i)=>m)}
                  onSelect={(i)=>selectCursoFromDropdown(i)}
                />
                {selected !== null && current.cursos.map((curso,i)=>{
                  return(
                    <AccessLink
                      key={`curso-${i}`}
                      url={`/cursos/${data.slug}/${curso.slug}`}
                      title={curso.title}
                    />
                  )
                })}
              </>
            ) : data.categorias[0].cursos.map((curso,i)=> (
              <AccessLink
                key={`curso-${i}`}
                url={`/cursos/${data.slug}/${curso.slug}`}
                title={curso.title}
              />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default HomeCurso
