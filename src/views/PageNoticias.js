import React from 'react'
import * as R from 'ramda'
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

  const {posts} = store
  // const programa = R.find(R.propEq('id', id), store.cursos)

  let { path } = useRouteMatch()

  return (
    <PageDefault title="Notícias">
      <div class="page-view posts-view">
        <Switch>

          <Route exact path={path}>
            <div class="title-1">Notícias</div>
            <p>&nbsp;</p>
            <div className="posts-feed">
            {posts.map((post,i) => {
                const date = fdate(post.date)
                return (
                  <article className="post">
                    <Link className="post-image" to={`/noticias/${post.id}`}>
                      <img alt={post.title} src={post.image || '/img/noticias/default.jpg'} />
                    </Link>
                    <Link className="post-title" to={`/noticias/${post.id}`}>{post.title}</Link>
                    <p className="post-text">{post.text}</p>
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
  const {posts} = store
  const post = R.find(R.propEq('id', postid), posts)
  const date = fdate(post.date)
  
  return (
    <>
      <div class="title-1"><Link to={`/noticias`}>Notícias</Link> &raquo; {post.title}</div>
      {post.image ? <img alt={post.title} src={post.image} width="50%" style={{float:'right', margin: '40px 0 40px 40px'}} /> : null}
      {parse(post.fulltext.split("\n").join("<br/>"))}
      <p>&nbsp;</p>
      <p className="post-date">Publicado em {date.day} de {date.month} de {date.year}</p>
    </>
  )
}

export default PageNoticias;
