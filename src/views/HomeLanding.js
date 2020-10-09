import React from 'react'
import store from '../store'
import Menu from './Menu'

import {RedLink} from '../components/CommonStyles'

function HomeLanding() {

  const {landing} = store

  const slides = landing.slides.map((src, i) => {
    return <div
            key={`lading-slide-${i}`}
            className="cover-slideshow-image"
            style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${src})`}}
          >
          </div>
  })

  return (
    <section className={`home-landing full-section cover-slideshow cover-slideshow-${landing.slides.length}`}>
      <div className="cover-slideshow-viewport">
        {slides}
      </div>
      <div className="cols">
        <div className="main">
          <div className="logo"><img src="/img/sinos-logo.svg" alt="SINOS" /></div>
          <div className="site-menu-1 bg-r">
            <Menu />
          </div>
        </div>
        <div className="content">
          <div>
            <h1>Sistema Nacional de Orquestras Sociais - Sinos</h1>
            <p>O Sistema Nacional de Orquestras Sociais (Sinos) é fruto de uma parceria entre a Fundação Nacional de Artes – Funarte e a Universidade Federal do Rio de Janeiro – UFRJ e é sustentado por uma rede composta por dezenas de profissionais de música, que atuam em cursos, oficinas, concertos e festivais, com início no segundo semestre se 2020 e que seguem por todo o ano de 2021. O objetivo é capacitar regentes, instrumentistas, compositores e educadores musicais, apoiando projetos sociais de música e, ainda, contribuir para o desenvolvimento das orquestras-escola de todo o Brasil. Esta iniciativa faz parte do Programa Funarte de Toda Gente.</p>
            <RedLink to="/projeto">Saiba Mais</RedLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeLanding;
