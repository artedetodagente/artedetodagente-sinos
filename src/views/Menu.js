import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'

function Menu(props) {
  return (
    <>
      {props.home ? <li><Link to="/">Home</Link></li> : <></>}
      <li><Link to="/projeto">O Projeto</Link></li>
      <li><Link smooth to="/#pedagogiadascordas">Pedagogia das Cordas</Link></li>
      <li><Link smooth to="/#projetoespiral">Projeto Espiral</Link></li>
      <li><Link smooth to="/#academiaderegencia">Academia de Regência</Link></li>
      <li><Link smooth to="/#eorquestras">E-Orquestras</Link></li>
      <li><Link smooth to="/publicacoes">Publicações</Link></li>
      <li><Link smooth to="/#noticias">Notícias</Link></li>
      <li><Link smooth to="/galeria">Galeria</Link></li>
      <li><Link smooth to="/parceiros">Parceiros</Link></li>
      <li><Link smooth to="/imprensa">Imprensa</Link></li>
    </>
  );
}

export default Menu;
