import React, { useState, useEffect } from 'react'
import * as R from 'ramda'
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom"
import {fdate} from '../util'

import Page from './Page'
import api from '../services/api'

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

function PageAgenda() {
  
  let { path } = useRouteMatch()

  const [current_month, setCurrentMonth] = useState()
  const [schedules, setSchedules] = useState([])
  const [events, setEvents] = useState([])

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get('/schedules?_sort=date:ASC')
      let schedules = response.data.map(item => new Date(item.date).getMonth())
      setSchedules(schedules)
      setCurrentMonth(R.last(schedules))
    }
    fetchData()
  },[])

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get(`/schedules?month=${months[current_month]}`)
      setEvents(response.data[0]?.events ?? [])
    }
    fetchData()
  },[months,current_month])

  function nextMonth() {
    if(nextEnabled) setCurrentMonth(schedules[index+1])
  }

  function prevMonth() {
    if(prevEnabled) setCurrentMonth(schedules[index-1])
  }

  const index = schedules.indexOf(current_month)
  const prevEnabled = index > 0
  const nextEnabled = index < schedules.length - 1

  return (
    <Page title="Programação">
      <div className="page-view agenda-view">
        <Switch>
          <Route exact path={path}>
            <div className="title-1">Programação</div>
            <nav className="agenda-nav">
              <button
                onClick={()=>prevMonth()}
                style={{opacity: prevEnabled ? 1 : 0.5}}
              >◀</button>
              <span>{months[current_month] || `...`}</span>
              <button
                onClick={()=>nextMonth()}
                style={{opacity: nextEnabled ? 1 : 0.5}}
              >▶</button>
            </nav>
            <p>&nbsp;</p>
            <div className="agenda-feed">
            {events.map((evento,i) => {
              const date = fdate(evento.date)
              return (
                <article key={`agenda-${current_month}-${i}`}>
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
