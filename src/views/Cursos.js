import React from 'react'
import store from '../store'
import {useParams} from "react-router-dom"
import Menu from './Menu'

function Cursos() {

  const {id} = useParams()

  return (
    <div className="page-cursos">
      <h1>Curso: {id}</h1>
      <Menu home={true} />
    </div>
  );
}

export default Cursos;
