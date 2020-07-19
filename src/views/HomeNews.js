import React from 'react'
import store from '../store'
import { HashLink as Link } from 'react-router-hash-link'

function HomeNews() {

  const {agenda, posts} = store

  function fdate(d){
    const date = new Date(d)
    const dateTimeFormat = new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' })
    const [{ value: day },,{ value: month },,{ value: year }] = dateTimeFormat.formatToParts(date) 
    return {day,month,year}
  }

  return (
    <section id="noticias" className="home-news full-section">
      <div className="section-header">
        <div className="title">Nossa Programação</div>
      </div>
      <div className="cols">
        <div className="col agenda center-out">
          <div className="center-in">
            {agenda.posts.map((evento,i) => {
              const date = fdate(evento.date)
              return (
                <div className="agenda-item" key={`agenda-${i}`}>
                  <div className="agenda-date">
                    <h3>{date.day}</h3>
                    <p>{date.month}</p>
                  </div>
                  <div className="agenda-content">
                    <h3>{evento.time} | {evento.title}</h3>
                    <p>{evento.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="col noticias center-out">
          <div className="center-in">
            <article class="noticia">
              <div className="content">
                <h3>{posts[0].title}</h3>
                <p>{posts[0].text}</p>
              </div>
              <Link className="leiamais" to="/#noticias">Leia mais</Link>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeNews;
