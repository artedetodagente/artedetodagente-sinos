import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import { HashLink as Link } from 'react-router-hash-link'

import {fdate} from '../util'
import api from '../services/api'

export default function Noticia(props) {

  const {postid} = useParams()
  const [noticia, setNoticia] = useState([])
  const [date, setDate] = useState([])

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get(`/noticias/${postid}`)
      setDate(fdate(response.data.date))
      setNoticia(response.data)
    }
    fetchData()
  },[postid])
  const foto = noticia.pic

  return (
    <>
      <div className="title-1">
        <span><Link to={`/`}>SINOS</Link> &raquo;&nbsp;</span>
        <span><Link to={`/noticias`}>Notícias</Link> &raquo;&nbsp;</span>
        <span>{noticia.title}</span>
      </div>
      {foto ? <img alt={noticia.title} src={`https://admin.sinos.art.br${foto.url}`} width="50%" style={{float:'right', margin: '40px 0 40px 40px'}} /> : null}
      <ReactMarkdown source={noticia.description} />
      <p>&nbsp;</p>
      {<p className="post-date">Publicado em {date.day} de {date.month} de {date.year}</p>}
    </>
  )
}