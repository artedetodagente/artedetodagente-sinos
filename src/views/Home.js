import React from 'react'
import store from '../store'
import HomeLanding from './HomeLanding'
import HomeNews from './HomeNews'
import HomeCurso from './HomeCurso'
import HomeOrquestras from './HomeOrquestras'
import Footer from './Footer'

function Home() {
  return (
    <div className="Home">
      <HomeLanding />
      <HomeNews />
      {store.cursos.map((data,i) =>{
        return <HomeCurso id={data.id} key={`home-curso-${data.id}`} data={data} />
      })}
      {/* <HomeOrquestras id="eorquestras" /> */}
      <Footer />
    </div>
  );
}

export default Home;
