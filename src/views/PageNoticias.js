import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'


import api from '../services/api'

import {
  Switch,
  Route,
  useParams,
  useRouteMatch
} from "react-router-dom"
import { HashLink as Link } from 'react-router-hash-link'
import {fdate} from '../util'

import slugify from 'slugify'

import Page from './Page'

function PageNoticias() {

  let { path } = useRouteMatch()

  const [ noticias, setNoticias ] = useState([])

  useEffect(()=>{
    async function fetchData(){
      const today = new Date().toISOString()
      const response = await api.get(`/noticias?_sort=date:DESC&_where[date_lte]=${today}`)
      setNoticias(response.data)
    }
    fetchData()
  },[])

  return (
    <Page title="Notícias">
      <div className="page-view posts-view">
        <Switch>

          <Route exact path={path}>
            <div className="title-1">Notícias</div>
            <p>&nbsp;</p>
            <div className="posts-feed">
            {noticias.map((noticia,i) => {
                const date = fdate(noticia.date)
                const foto = noticia.pic
                return (
                  <article className="post" key={`noticia-${i}`}>
                    <Link className="post-image" to={`/noticias/${noticia.id}/${slugify(noticia.title)}`}>
                      <img alt={noticia.title} src={`https://admin.sinos.art.br${foto.url}`} />
                    </Link>
                    <Link className="post-title" to={`/noticias/${noticia.id}/${slugify(noticia.title)}`}>{noticia.title}</Link>
                    <p className="post-text">{noticia.call}</p>
                    <p className="post-date">Publicado em {date.day} de {date.month} de {date.year}</p>
                  </article>
                )
              }
            )}
            </div>
          </Route>

          <Route path={`${path}/:postid`}>
            <Noticia />
          </Route>

        </Switch>
      </div>
    </Page>
  );
}

function Noticia(props) {

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
      <div className="title-1"><Link to={`/noticias`}>Notícias</Link> &raquo; {noticia.title}</div>
      {foto ? <img alt={noticia.title} src={`https://admin.sinos.art.br${foto.url}`} width="50%" style={{float:'right', margin: '40px 0 40px 40px'}} /> : null}
      <ReactMarkdown
        source={noticia.description}
      />
      <p>&nbsp;</p>
      {<p className="post-date">Publicado em {date.day} de {date.month} de {date.year}</p>}
    </>
  )
}

export default PageNoticias;
