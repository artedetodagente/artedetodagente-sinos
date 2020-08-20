import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

import * as R from 'ramda'
import api from '../services/api'

import {
  Switch,
  Route,
  useParams,
  useRouteMatch
} from "react-router-dom"
import { HashLink as Link } from 'react-router-hash-link'
import parse from 'html-react-parser'

import store from '../store'
import {fdate} from '../util'

import PageDefault from './PageDefault'

function PageNoticias() {

  let { path } = useRouteMatch()

  const [ noticias, setNoticias ] = useState([])

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get('/noticias')

      setNoticias(response.data.reverse())
    }
    fetchData()
  },[])

  return (
    <PageDefault title="Notícias">
      <div class="page-view posts-view">
        <Switch>

          <Route exact path={path}>
            <div class="title-1">Notícias</div>
            <p>&nbsp;</p>
            <div className="posts-feed">
            {noticias.map((noticia,i) => {
                const date = fdate(noticia.date)
                console.log(date)
                const foto = noticia.pic
                return (
                  <article className="post">
                    <Link className="post-image" to={`/noticias/${noticia.id}`}>
                      <img alt={noticia.title} src={`https://admin.sinos.art.br${foto.url}`} />
                    </Link>
                    <Link className="post-title" to={`/noticias/${noticia.id}`}>{noticia.title}</Link>
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
    </PageDefault>
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
  },[])
  const foto = noticia.pic

  return (
    <>
      <div class="title-1"><Link to={`/noticias`}>Notícias</Link> &raquo; {noticia.title}</div>
      {foto ? <img alt={noticia.title} src={`http://localhost:1337${foto.url}`} width="50%" style={{float:'right', margin: '40px 0 40px 40px'}} /> : null}
      <ReactMarkdown
      source={noticia.description}
      />
      <p>&nbsp;</p>
      {<p className="post-date">Publicado em {date.day} de {date.month} de {date.year}</p>}
    </>
  )
}

export default PageNoticias;
