import React, { useState, useEffect } from 'react'

import {
  Switch,
  Redirect,
  Route,
  useParams,
  useRouteMatch
} from "react-router-dom"
import { HashLink as Link } from 'react-router-hash-link'

import Page from './Page'
import YouThumb from './YouThumb'
import YouEmbed from './YouEmbed'

import {DropDown} from '../components/Dropdown'
import {AccessLink,DesktopFlexCol} from '../components/CommonStyles'

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
            <Projeto id={id} projeto={projeto} categorias={categorias} />
          </Route>

          <Route path={`${path}/:catid`}>
            <Category id={id} projeto={projeto} />
          </Route>

        </Switch>
      </div>
    </Page>
  );
}

function Projeto({id,projeto,categorias}) {
  
  const placeholder = {
    'Pedagogia-das-Cordas': 'selecione uma categoria',
    'Projeto-Espiral': 'selecione um instrumento',
    'Academia-de-Regencia': 'selecione um tema'
  }

  const [categoria, setCategoria] = useState(null)
  // const [professor, setProfessor] = useState(null)

  const selectCategoria = (i) => {
    // setProfessor(null)
    setCategoria(i)
  }

  // const selectProfessor = (i) => {
  //   setProfessor(i)
  //   setCategoria(null)
  // }

  return (
    <>
      <div className="title-1">
        <span><Link to={`/`}>SINOS</Link> &raquo;&nbsp;</span>
        <span>{projeto.title}</span>
      </div>
      <p>&nbsp;</p>
      <DesktopFlexCol>
        <DropDown
          black
          selected={categoria}
          placeholder={placeholder[projeto.slug] || 'selecione uma categoria'}
          options={categorias.map((cat,i) => cat)}
          onSelect={(i)=>selectCategoria(i)}
        />
        <div>&nbsp;</div>
        {/* <DropDown
          black
          selected={professor}
          placeholder="selecione um professor"
          onSelect={(i)=>selectProfessor(i)}
        /> */}
      </DesktopFlexCol>
      <p>&nbsp;</p>
      {categoria !== null && categorias[categoria].cursos.map((curso,i)=>{
        return(
          <AccessLink
            key={`curso-${i}`}
            title={curso.title}
            url={`/cursos/${id}/${categorias[categoria].slug}/${curso.slug}`}
          />
        )
      })}
      {/* <p>Selecione uma categoria</p> */}
      {/* {categorias.map((cat,i) => <Link className="curso-select" key={i} to={`/cursos/${id}/${cat.slug}`}>{cat.title}</Link>)} */}
      <p>&nbsp;</p>
      <p>{projeto.description}</p>
    </>
  )
}

function Category({id, projeto}) {

  const {path} = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        <Redirect to={`/cursos/${id}`} />
      </Route>
      <Route path={`${path}/:cursoid`}>
        <Curso projeto={projeto} />
      </Route>
    </Switch>
  )
}

function Curso({projeto}) {
  
  const [curso, setCurso] = useState([])
  const [aulas, setAulas] = useState([])
  const [aula, setAula] = useState([])

  const {cursoid} = useParams()

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get(`/cursos/${cursoid}`)
      setCurso(response.data)
      const today = new Date().toISOString()
      const responseAulas = await api.get(`/aulas?curso.slug=${cursoid}&_where[date_lte]=${today}&_sort=date:ASC`)
      setAulas(responseAulas.data)
      setAula(responseAulas.data[0])
    }
    fetchData()
  },[cursoid])

  console.log(aulas)

  useEffect(()=>window.scrollTo(0, 0),[aula])

  return (
    <>
      <div className="title-1">
        <span><Link to={`/`}>SINOS</Link> &raquo;&nbsp;</span>
        <span><Link to={`/cursos/${projeto.slug}`}>{projeto.title}</Link> &raquo;&nbsp;</span>
        {/* <span><Link to={`/cursos/${projeto.slug}/${cat.slug}`}>{cat.title}</Link> &raquo;&nbsp;</span> */}
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

function InfoBox({title,text}) {
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
