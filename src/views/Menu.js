import React from 'react'
import store from '../store'
import { HashLink as Link } from 'react-router-hash-link'

function Menu(props) {
  return (
    <>
      {props.home ? <li><Link to="/">Home</Link></li> : <></>}
      <li><Link to="/o-projeto">O Projeto</Link></li>
      <li><Link smooth to="/#pedagogiadascordas">Pedagogia das Cordas</Link></li>
      <li><Link smooth to="/#projetoespiral">Projeto Espiral</Link></li>
      <li><Link smooth to="/#eorquestras">E-Orquestras</Link></li>
      <li><Link smooth to="/#noticias">Notícias</Link></li>
    </>
  );
}

export default Menu;
