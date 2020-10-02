import React, {useState, useEffect} from 'react'
import {
  useParams,
  Switch,
  Route,
  useRouteMatch,
  } from 'react-router-dom'
import * as R from 'ramda'
import api from '../services/api'
import {fdate} from '../util'

import parse from 'html-react-parser'

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

export default function AcademyPageAgenda(){

  const {slug} = useParams()
  const {path} = useRouteMatch()

  const [schedules, setSchedules] = useState([])
  const [projeto, setProjeto] = useState([])
  const [events, setEvents] = useState([])
  const [index, setIndex] = useState()

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get(`/projetos/${slug}`)
      setIndex(-1)
      setSchedules(response.data.avs_schedules)
      setProjeto(response.data)
    }
    fetchData()
  },[slug])

  useEffect(()=>{
    const todayMonth = new Date().getMonth()
    const index = R.findIndex(R.propEq('month', months[todayMonth]), schedules)
    if(index !== undefined && index !== -1){
      setIndex(index)
    }
  },[schedules])
  
  useEffect(()=>{
    if(schedules && index !== undefined && index !== -1){
      setEvents(schedules[index].Days)
    }
  },[schedules,index])

  const prevEnabled = index > 0
  const nextEnabled = index < schedules.length - 1

  function nextMonth() {
    if(nextEnabled) setIndex(index + 1)
  }
  
  function prevMonth() {
    if(prevEnabled) setIndex(index - 1)
  }

  return (
    <>
      <div className="page-view agenda-view">
        <Switch>
          <Route path={path}>
            <nav className="agenda-nav">
              <button
                onClick={()=>prevMonth()}
                style={{opacity: prevEnabled ? 1 : 0.5}}
              >◀</button>
              <span>{schedules[index]?.month || `...`}</span>
              <button
                onClick={()=>nextMonth()}
                style={{opacity: nextEnabled ? 1 : 0.5}}
              >▶</button>
            </nav>

            <p>&nbsp;</p>

            <div className="agenda-feed">
              {events && events.map((evento,i) => {
                const date = fdate(evento.date)
                  return (
                    <article key={`agenda-${index}-${i}`}>
                      <div className="agenda-item">
                        <div className="agenda-date">
                          <h3 style={{color: `${projeto.color}`}}>{date.day}</h3>
                          <p>{date.month}</p>
                        </div>
                        <div className="agenda-content">
                          <h3 style={{color: projeto.color}}>{evento.time} | {evento.title}</h3>
                          <div>{parse(evento.description)}</div>
                        </div>
                      </div>
                    </article>
                  )
                })}
            </div>
          </Route>
        </Switch>
      </div>
      <div id="form-box">
        {projeto.form_link ? 
          <a href={projeto.form_link} target="__blank">
                Clique aqui para fazer sua inscrição
          </a>
        : null}
      </div>
    </>
  )
}