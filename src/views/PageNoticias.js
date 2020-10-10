import React, { useState, useEffect } from 'react'
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { HashLink as Link } from 'react-router-hash-link'
import slugify from 'slugify'

import api from '../services/api'
import { fdate } from '../util'

import Page from './Page'
import PageNoticiasDetalhe from './PageNoticiasDetalhe'

function PageNoticias() {

  let {path} = useRouteMatch()

  const [noticias,setNoticias] = useState([])

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
            <PageNoticiasMain noticias={noticias} />
          </Route>
          <Route path={`${path}/:postid`}>
            <PageNoticiasDetalhe />
          </Route>
        </Switch>
      </div>
    </Page>
  );
}

function PageNoticiasMain ({noticias}) {
  return(
    <>
      <div className="title-1">
        <span><Link to={`/`}>SINOS</Link> &raquo;&nbsp;</span>
        <span>Notícias</span>
      </div>
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
        })}
      </div>
    </>
  )
}

export default PageNoticias;
