import React, { useState, useEffect } from 'react'
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom"
import {fdate} from '../util'
import Page from './Page'
import api from '../services/api'

function PageAgenda() {
  const { path } = useRouteMatch()
  const date = new Date();
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
  const [current, setCurrent] = useState({ 
    month: date.getMonth(), year: date.getFullYear() 
  })
  const [events, setEvents] = useState([])

  useEffect(() => {
    api.get(`/events?_sort=date:ASC&schedule.month=${months[current.month]}&date_gte=${current.year}-${`0${current.month + 1}`.slice(-2)}-01&date_lt=${current.year}-${`0${current.month + 2}`.slice(-2)}-01`)
      .then(({ data }) => setEvents(data));
  }, [current])

  function nextMonth() {
    if(current.month + 1 > 11) setCurrent({ month: 0, year: current.year + 1 });
    else setCurrent({ ...current, month: current.month + 1 });
  }

  function prevMonth() {
    if(current.month - 1 < 0) setCurrent({ month: 11, year: current.year - 1 });
    else setCurrent({ ...current, month: current.month - 1 });
  }

  return (
    <Page title="Programação">
      <div className="page-view agenda-view">
        <Switch>
          <Route exact path={path}>
            <nav className="agenda-nav">
              <button
                onClick={()=>prevMonth()}
                style={{opacity: current.month - 1 < 0 ? 1 : 0.5}}
              >◀</button>
              <span>{months[current.month] || `...`}</span>
              <button
                onClick={()=>nextMonth()}
                style={{opacity: current.month + 1 > 11 ? 1 : 0.5}}
              >▶</button>
            </nav>
            <p>&nbsp;</p>
            <div className="agenda-feed">
            {events.map((evento,i) => {
              const date = fdate(evento.date)
              return (
                <article key={`agenda-${current.month}-${i}`}>
                  <div className="agenda-item">
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
        </Switch>
      </div>
    </Page>
  );
}

export default PageAgenda;
