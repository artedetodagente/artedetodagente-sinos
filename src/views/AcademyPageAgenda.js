import React, {useState, useEffect} from 'react'
import {
    useParams,
    Switch,
    Route,
    useRouteMatch,
    } from 'react-router-dom'

import api from '../services/api'
import {fdate} from '../util'

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

export default function AcademyPageAgenda({id}){

    const [current_month, setCurrentMonth] = useState(new Date().getMonth())

    const {slug} = useParams()

    let { path } = useRouteMatch()

    const [schedules, setSchedules] = useState([])
    const [projeto, setProjeto] = useState([])
    const [month, setMonth] = useState([])
    const [events, setEvents] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const response = await api.get(`/projetos/${slug}`)
            setSchedules(response.data.avs_schedules)
            setProjeto(response.data)
        }
        fetchData()
    },[slug])

    useEffect(()=>{
        async function fetchData(){
            const responseSchedule = await api.get(`/avs-schedules?month=${months[current_month]}&projeto.slug_eq=${slug}`)
            if(responseSchedule.data[0]){
              setMonth(responseSchedule.data[0])
              setEvents(responseSchedule.data[0].Days)
            }else{
              const response = await api.get(`/avs-schedules?month=${months[current_month-1]}&projeto.slug_eq=${slug}`)
              setMonth(response.data[0])
              setEvents(response.data[0].Days)
            }
        }
        fetchData()
    },[slug,current_month])

     var index

      for(const schedule of schedules){
          if(schedule.month == month.month){
            index = schedules.indexOf(schedule)
          }
      }

      const prevEnabled = index > 0
      const nextEnabled = index < schedules.length - 1

      function nextMonth() {
        if(nextEnabled) setCurrentMonth(current_month + 1)
      }
    
      function prevMonth() {
        if(prevEnabled) setCurrentMonth(current_month - 1)
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
              <span>{month.month || `...`}</span>
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
                      <h3 style={{color: `${projeto.color}`}}>{date.day}</h3>
                      <p>{date.month}</p>
                    </div>
                    <div className="agenda-content">
                      <h3 style={{color: projeto.color}}>{evento.time} | {evento.title}</h3>
                      <p>{evento.description}</p>
                    </div>
                  </div>
                </article>
              )
            })}
            </div>
                </Route>
            </Switch>
        </div>
        </>
    )
}