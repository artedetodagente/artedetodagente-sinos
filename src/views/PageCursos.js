import React, { useState, useEffect } from 'react'

import {
  Switch,
  Route,
  useParams,
  useRouteMatch
} from "react-router-dom"
import { HashLink as Link } from 'react-router-hash-link'

import Page from './Page'
import YouThumb from './YouThumb'
import YouEmbed from './YouEmbed'

import api from '../services/api'

function PageCursos() {

  const {id} = useParams()
  
  const [projeto, setProjeto] = useState([])
  const [categorias, setCategorias] = useState([])

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get(`/projetos/${id}`)
      setProjeto(response.data)
      setCategorias(response.data.categorias)
    }
    fetchData()
  },[id])

  const {path} = useRouteMatch()

  return (
    <Page title={projeto.title}>
      <div className="page-view curso-view">
        <Switch>
          <Route exact path={path}>
            <div className="title-1">{projeto.title}</div>
            <p>&nbsp;</p>
            <p>Selecione uma categoria</p>
            {categorias.map((cat,i) => <Link className="curso-select" key={i} to={`/cursos/${id}/${cat.id}`}>{cat.title}</Link>)}
            <p>&nbsp;</p>
            <p>{projeto.description}</p>
          </Route>

          <Route path={`${path}/:catid`}>
            <Category id={id} projeto={projeto} />
          </Route>
        </Switch>
      </div>
    </Page>
  );
}

function Category(props) {

  const {path} = useRouteMatch()

  const {id, projeto} = props
  const {catid} = useParams()
  const [cat, setCat] = useState([])
  const [cursos, setCursos] = useState([])

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get(`/categorias/${catid}`)
      setCat(response.data)
      setCursos(response.data.cursos)
    }
    fetchData()
  },[catid])

  return (
    <Switch>
      <Route exact path={path}>
        <div className="title-1">
          <span><Link to={`/cursos/${projeto.id}`}>{projeto.title}</Link> &raquo;&nbsp;</span>
          <span>{cat.title}</span>
        </div>
        <p>&nbsp;</p>
        <p>Selecione um curso</p>
        {cursos.map((curso,i) => {
          return (
            <Link key={i} className="curso-select" to={`/cursos/${id}/${cat.id}/${curso.id}`}>
              {curso.title}
            </Link>
          )
        })}
        <p>&nbsp;</p>
        <p>{projeto.description}</p>
      </Route>
      <Route path={`${path}/:cursoid`}>
        <Curso id={id} projeto={projeto} cat={cat} />
      </Route>
    </Switch>
  )
}

function Curso(props) {

  const {projeto,cat} = props
  
  const [curso, setCurso] = useState([])
  const [aulas, setAulas] = useState([])
  const [aula, setAula] = useState([])
  

  const {cursoid} = useParams()

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get(`/cursos/${cursoid}`)
      setCurso(response.data)
      const today = new Date().toISOString()
      const responseAulas = await api.get(`/aulas?_where[curso]=${cursoid}&_where[date_lte]=${today}&_sort=date:ASC`)
      setAulas(responseAulas.data)
      setAula(responseAulas.data[0])
    }
    fetchData()
  },[cursoid])

  useEffect(()=>window.scrollTo(0, 0),[aula])

  return (
    <>
      <div className="title-1">
        <span><Link to={`/cursos/${projeto.id}`}>{projeto.title}</Link> &raquo;&nbsp;</span>
        <span><Link to={`/cursos/${projeto.id}/${cat.id}`}>{cat.title}</Link> &raquo;&nbsp;</span>
        <span>{curso.title}</span>
      </div>
      <div className="aulas-panel">
        <div className="aulas-view">
          <div className="aulas-view-video">
              <YouEmbed url={aula.video_url}/>
          </div>
          <div className="aulas-view-info">
            <InfoBox title={aula.title || `carregando...`} text={aula.description} />
            <p>&nbsp;</p>
            {aula.professore &&
              <InfoBox title={aula.professore.name} text={aula.professore.bio} />
            }
          </div>
        </div>
        <div className="aulas-select">
          {aulas.map((aula,i)=>
            <AulaBox
              key={i}
              onClick={() => setAula(aula)}
              title={aula.title}
              video={aula.video_url}
            />
          )}
        </div>
      </div>
    </>
  )
}

function InfoBox(props) {
  const {title,text} = props
  return (
    <>
      <h3 className="title-box">{title}</h3>
      <p>{text}</p>
    </>
  )
}

function AulaBox(props){
  const {onClick,video,title} = props
  return(
    <div className="aula" onClick={onClick} >
      <div className="box">
        <YouThumb url={video} />
        <p>{title}</p>
      </div>
    </div>
  )
}

export default PageCursos;
