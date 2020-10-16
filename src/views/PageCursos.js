import React, { useState, useEffect } from 'react'
import * as R from 'ramda'

import {
  Switch,
  Route,
  useParams,
  useRouteMatch
} from "react-router-dom"
import { HashLink as Link } from 'react-router-hash-link'

import api from '../services/api'
import { DropDown } from '../components/Dropdown'
import { AccessLink, DesktopFlexCol } from '../components/CommonStyles'

import Page from './Page'
import PageCursosDetalhe from './PageCursosDetalhe'
import PageCursosProfessor from './PageCursosProfessor'

function PageCursos() {

  const {id} = useParams()
  
  const [projeto, setProjeto] = useState([])
  const [categorias, setCategorias] = useState([])

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get(`/projetos?slug=${id}`)
      setProjeto(response.data[0])
      setCategorias( R.sortBy(R.prop('order'),response.data[0].categorias))
    }
    fetchData()
  },[id])

  const {path} = useRouteMatch()

  return (
    <Page title={projeto.title}>
      <div className="page-view curso-view">
        <Switch>

          <Route exact path={path}>
            <PageCursosMain id={id} projeto={projeto} categorias={categorias} />
          </Route>

          <Route path={`${path}/bio/:profid`}>
            <PageCursosProfessor id={id} projeto={projeto} />
          </Route>

          <Route path={`${path}/:cursoid`}>
            <PageCursosDetalhe id={id} projeto={projeto} />
          </Route>

        </Switch>
      </div>
    </Page>
  );
}

function PageCursosMain({id,projeto,categorias}) {
  
  const placeholder = {
    'Pedagogia-das-Cordas': 'selecione uma categoria',
    'Projeto-Espiral': 'selecione um instrumento',
    'Academia-de-Regencia': 'selecione um tema'
  }

  const [cursos, setCursos] = useState([])
  const [professores, setProfessores] = useState([])

  const [filter, setFilter] = useState(null)
  const [categoria, setCategoria] = useState(null)
  const [professor, setProfessor] = useState(null)

  useEffect(()=>{
    const reducedCursos = R.reduce((acc,cat)=>{
      cat.cursos.map(curso=>acc.push(curso))
      return acc
    },[],categorias)
    const reducedProfessores = R.sortBy(R.prop('name'),R.reduce((acc,curso)=>{
      curso.professores.map(prof=>acc.push(prof))
      return acc
    },[],reducedCursos))
    setCursos(reducedCursos)
    setProfessores(reducedProfessores)
    console.log('reducedCursos',reducedCursos)
    console.log('reducedProfessores',reducedProfessores)
  },[categorias])

  const selectCategoria = (i) => {
    setProfessor(null)
    setCategoria(i)
    setFilter(['categoria',categorias[i].id])
  }

  const selectProfessor = (i) => {
    setProfessor(i)
    setCategoria(null)
    setFilter(['id',professores[i].curso])
  }

  useEffect(()=>window.scrollTo(0, 0),[filter])

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
          width="50%"
        />
        <DropDown
          black
          selected={professor}
          placeholder="selecione um professor"
          options={professores.map((prof,i) => ({title: prof.name}))}
          onSelect={(i)=>selectProfessor(i)}
          width="50%"
        />
      </DesktopFlexCol>
      <p>&nbsp;</p>
      {filter !== null && R.filter(R.propEq(filter[0],filter[1]),cursos).map((curso,i)=>{
        return(
          <AccessLink
            key={`curso-${i}`}
            title={curso.title}
            url={`/cursos/${id}/${curso.slug}`}
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

export default PageCursos;
