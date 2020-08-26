import React, { useState, useEffect } from 'react'
// import ReactMarkdown from 'react-markdown'


import api from '../services/api'

import {
  Switch,
  Route,
  // useParams,
  useRouteMatch
} from "react-router-dom"
// import { HashLink as Link } from 'react-router-hash-link'
import {fdate} from '../util'

import Page from './Page'

function PageAgenda() {

  let { path } = useRouteMatch()

  const [ schedules, setSchedules ] = useState([])

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get('/schedules')
      setSchedules(response.data.reverse())
    }
    fetchData()
  },[])

  return (
    <Page title="Programação">
      <div className="page-view agenda-view">
        <Switch>

          <Route exact path={path}>
            <div class="title-1">Programação</div>
            <p>&nbsp;</p>
            <div className="agenda-feed">
            {schedules.map((evento,i) => {
              const date = fdate(evento.date)
              return (
                <article>
                  <div className="agenda-item" key={`agenda-${i}`}>
                    <div className="agenda-date">
                      <h3 style={{color: evento.projeto.color}}>{date.day}</h3>
                      <p>{date.month}</p>
                    </div>
                    <div className="agenda-content">
                      <h3 style={{color: evento.projeto.color}}>{evento.time} | {evento.title}</h3>
                      <p>{evento.text}</p>
                    </div>
                  </div>
                </article>
              )
            })}
            </div>
          </Route>

          {/* <Route path={`${path}/:postid`}>
            <Noticia />
          </Route> */}

        </Switch>
      </div>
    </Page>
  );
}

// function Noticia(props) {

//   const {postid} = useParams()
//   const [noticia, setNoticia] = useState([])
//   const [date, setDate] = useState([])

//   useEffect(()=>{
//     async function fetchData(){
//       const response = await api.get(`/noticias/${postid}`)
//       setDate(fdate(response.data.date))
//       setNoticia(response.data)
//     }
//     fetchData()
//   },[postid])
//   const foto = noticia.pic

//   return (
//     <>
//       <div class="title-1"><Link to={`/noticias`}>Notícias</Link> &raquo; {noticia.title}</div>
//       {foto ? <img alt={noticia.title} src={`https://admin.sinos.art.br${foto.url}`} width="50%" style={{float:'right', margin: '40px 0 40px 40px'}} /> : null}
//       <ReactMarkdown
//         source={noticia.description}
//       />
//       <p>&nbsp;</p>
//       {<p className="post-date">Publicado em {date.day} de {date.month} de {date.year}</p>}
//     </>
//   )
// }

export default PageAgenda;
