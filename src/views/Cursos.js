import React from 'react'
import {useParams} from "react-router-dom"

import PageDefault from './PageDefault'
import YouThumb from './YouThumb'

function Cursos() {

  const {id} = useParams()

  return (
    <PageDefault title={id}>
      <YouThumb link="true" />
      <YouThumb url="https://www.youtube.com/watch?v=ZAllPgaXD6U" />
    </PageDefault>
  );
}

export default Cursos;
