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
      <div className="breadcrumbs">
        <span><Link to={`/`}>Home</Link> &raquo;&nbsp;</span>
        <span><Link to={`/noticias`}>Notícias</Link> &raquo;&nbsp;</span>
        <span style={{display: 'none'}}>&nbsp;</span>
      </div>
      <div className="posts-view-single">
        <h2 className="post-title">{noticia.title}</h2>
        {foto ? <img className="post-cover" alt={noticia.title} src={`https://admin.sinos.art.br${foto.url}`} width="50%" /> : null}
        <ReactMarkdown source={noticia.description} />
        <p>&nbsp;</p>
        {<p className="post-date">Publicado em {date.day} de {date.month} de {date.year}</p>}
      </div>
    </>
  )
}