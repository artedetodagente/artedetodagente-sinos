import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { HashLink as Link } from 'react-router-hash-link'
import slugify from 'slugify'

import api from '../services/api'
import YouThumb from '../components/YouThumb'
import YouEmbed from '../components/YouEmbed'

export default function PageCursosDetalhe({projeto}) {
  
  const [curso, setCurso] = useState([])
  const [aulas, setAulas] = useState([])
  const [aula, setAula] = useState([])

  const {cursoid} = useParams()

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get(`/cursos?slug=${cursoid}`)
      setCurso(response.data[0])
      const today = new Date().toISOString()
      const responseAulas = await api.get(`/aulas?curso.slug=${cursoid}&_where[date_lte]=${today}&_sort=date:ASC`)
      setAulas(responseAulas.data)
      setAula(responseAulas.data[0])
    }
    fetchData()
  },[cursoid])

  console.log(curso)

  useEffect(()=>window.scrollTo(0, 0),[aula])

  return (
    <>
      <div className="title-1">
        <span><Link to={`/`}>SINOS</Link> &raquo;&nbsp;</span>
        <span><Link to={`/cursos/${projeto.slug}`}>{projeto.title}</Link> &raquo;&nbsp;</span>
        <span>{curso.title}</span>
      </div>
      <div className="aulas-panel">
        <div className="aulas-view">
          <div className="aulas-view-video">
              <YouEmbed url={aula.video_url}/>
          </div>
          <div className="aulas-view-info">
            <InfoBox title={`Conheça os professores`}>
              {curso.professores && curso.professores.map((professor,i)=>{
              return (
                <li key={`prof-${i}`}>
                  <Link to={`/cursos/${projeto.slug}/bio/${professor.id}/${slugify(professor.name)}`}>{professor.name}</Link>
                </li>
                )
              })}
            </InfoBox>
            <InfoBox title={aula.title || `carregando...`}>
              {aula.description}
            </InfoBox>
            <p>&nbsp;</p>
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

function InfoBox({title,children}) {
  return (
    <div style={{marginBottom: '2rem'}}>
      <h3 className="title-box">{title}</h3>
      {children}
    </div>
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