import React from 'react'
import store from '../store'
import Menu from './Menu'

function HomeLanding() {


  const {landing} = store

  const slides = landing.slides.map((src, i) => {
    return <div
            key={`lading-slide-${i}`}
            className="cover-slideshow-image"
            style={{backgroundImage: `url(${src})`}}
          >
          </div>
  })

  return (
    <section className={`home-landing full-section cover-slideshow cover-slideshow-${landing.slides.length}`}>
      <div className="cover-slideshow-viewport">
        {slides}
      </div>
      <div className="content">
        <div className="logo"><img src="/img/logo-sinos.svg" /></div>
        <div className="site-menu-1 bg-r">
          <Menu />
        </div>
      </div>
    </section>
  );
}

export default HomeLanding;
