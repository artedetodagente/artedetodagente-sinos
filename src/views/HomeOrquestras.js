import React from 'react'
import store from '../store'

function HomeOrquestras(props) {

  const {pages: {eorquestras: page}} = store

  return (
    <section id={props.id} className="home-orquestras full-section">
      <div className="section-header">
        <div className="title">E-Orquestras</div>
      </div>
      <div className="center-out">
        <div className="center-in">
          <p>{page.text}</p>
        </div>
      </div>
    </section>
  );
}

export default HomeOrquestras;
