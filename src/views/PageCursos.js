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
  const cursos = R.find(R.propEq('id', id), store.cursos)

  const {path} = useRouteMatch()

  return (
    <PageDefault title={cursos.title}>
      <div className="page-view curso-view">
        <Switch>

          <Route exact path={path}>
            <div className="title-1">{cursos.title}</div>
            <p>&nbsp;</p>
            <p>Selecione uma categoria</p>
            {cursos.categorias.map((cat,i) => <Link className="curso-select" to={`/cursos/${id}/${cat.id}`}>{cat.title}</Link>)}
            <p>&nbsp;</p>
            <p>{cursos.fulltext}</p>
          </Route>

          <Route path={`${path}/:catid`}>
            <Category id={id} cursos={cursos} />
          </Route>

        </Switch>
      </div>
    </PageDefault>
  );
}

function Category(props) {

  const {path} = useRouteMatch()

  const {id,cursos} = props
  const {catid} = useParams()
  const cat = R.find(R.propEq('id', catid), cursos.categorias)

  return (
    <Switch>
      <Route exact path={path}>
        <div className="title-1">
          <Link to={`/cursos/${cursos.id}`}>{cursos.title}</Link> &raquo; {cat.title}</div>
        <p>&nbsp;</p>
        <p>Selecione um curso</p>
        {cat.cursos.map((curso,i) => {
          return (
            <Link key={i} className="curso-select" to={`/cursos/${id}/${cat.id}/${curso.id}`}>
              {curso.title} com {curso.professor}
            </Link>
          )
        })}
      </Route>
      <Route path={`${path}/:cursoid`}>
        <Curso id={id} cursos={cursos} cat={cat} />
      </Route>
    </Switch>
  )
}

function Curso(props) {

  const {cursos,cat} = props
  const {cursoid} = useParams()
  const curso = R.find(R.propEq('id', cursoid), cat.cursos)

  const [aula,aulaSelect] = useState(0)

  return (
    <>
      <div className="title-1">
        <Link to={`/cursos/${cursos.id}`}>{cursos.title}</Link>
        &nbsp;&raquo;&nbsp;
        <Link to={`/cursos/${cursos.id}/${cat.id}`}>{cat.title}</Link>
        &nbsp;&raquo;&nbsp;
        {curso.professor}
      </div>
      <p>{curso.fulltext}</p>
      <p>{curso.text}</p>
      <p>&nbsp;</p>
      <div className="aulas-panel">
        <div className="aulas-view">
          <AulaView aula={curso.classes[aula]} />
        </div>
        <div className="aulas-select">
          {curso.classes.map((aula,i)=> <AulaSelect key={i} aula={aula} click={() => aulaSelect(i)} />)}
        </div>
      </div>
    </>
  )
}

function AulaSelect(props) {
  const {aula,click} = props
  return (
    <div className="aula" onClick={click} >
      <div className="box">
        <YouThumb url={aula.youtube} />
        <p>{aula.title}</p>
      </div>
    </div>
  )
}

function AulaView(props) {
  const {aula} = props
  return (
    <div>
      <YouEmbed url={aula.youtube} />
      <p>&nbsp;</p>
      <p className="title-1">{aula.title}</p>
      <p>{aula.text}</p>
    </div>
  )
}

export default PageCursos;
