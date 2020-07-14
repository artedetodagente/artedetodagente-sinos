import React from 'react'
import store from '../store'

function HomeCurso(props) {

  const {data} = props

  return (
    <section className="home-curso full-section">
      {data.id}
    </section>
  );
}

export default HomeCurso;
