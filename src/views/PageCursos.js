import React, { useState } from 'react'
import * as R from 'ramda'
import {
  Switch,
  Route,
  useParams,
  useRouteMatch
} from "react-router-dom"
import { HashLink as Link } from 'react-router-hash-link'

import store from '../store'
import PageDefault from './PageDefault'
import YouThumb from './YouThumb'
import YouEmbed from './YouEmbed'

function PageCursos() {

  const {id} = useParams()
  const programa = R.find(R.propEq('id', id), store.cursos)

  let { path } = useRouteMatch()

  return (
    <PageDefault title={programa.title}>
      <div class="page-view curso-view">
        <Switch>

          <Route exact path={path}>
            <div class="title-1">Cursos {programa.title}</div>
            <p>&nbsp;</p>
            <p>Selecione um curso</p>
            {programa.modules.map((curso,i) => <Link className="curso-select" to={`/cursos/${id}/${curso.id}`}>{curso.title}</Link>)}
            <p>&nbsp;</p>
            <p>{programa.fulltext}</p>
          </Route>

          <Route path={`${path}/:cursoid`}>
            <Curso programa={programa} />
          </Route>

        </Switch>
      </div>
    </PageDefault>
  );
}

function Curso(props) {

  const {programa} = props
  const {cursoid} = useParams()
  const curso = R.find(R.propEq('id', cursoid), programa.modules)

  const [aula,aulaSelect] = useState(0)

  return (
    <>
      <div class="title-1"><Link to={`/cursos/${programa.id}`}>Cursos {programa.title}</Link> &raquo; {curso.title}</div>
      <p>{curso.fulltext}</p>
      <p>{curso.text}</p>
      <p>&nbsp;</p>
      <div className="aulas-panel">
        <div className="aulas-select">
          {curso.classes.map((aula,i)=> <AulaSelect key={i} aula={aula} click={() => aulaSelect(i)} />)}
        </div>
        <div className="aulas-view">
          <AulaView aula={curso.classes[aula]} />
        </div>
      </div>
    </>
  )
}

function AulaSelect(props) {
  const {aula,click} = props
  return (
    <div className="aula" onClick={click} >
      <YouThumb url={aula.youtube} />
      <p>{aula.title}</p>
    </div>
  )
}

function AulaView(props) {
  const {aula} = props
  return (
    <div>
      <YouEmbed url={aula.youtube} />
      <p>&nbsp;</p>
      <p class="title-1">{aula.title}</p>
      <p>{aula.text}</p>
    </div>
  )
}

export default PageCursos;
