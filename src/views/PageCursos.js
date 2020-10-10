import React, { useState, useEffect } from 'react'

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
