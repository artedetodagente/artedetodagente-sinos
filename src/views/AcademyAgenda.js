import React, {useState,useEffect} from 'react'
import {useParams, Link, useHistory} from 'react-router-dom'
import Page from './Page'
import AcademyPageAgenda from './AcademyPageAgenda'

import api from '../services/api'

export default function AcademyAgenda(props){

    const {slug} = useParams()

    const [projeto, setProjeto] = useState([])
    const [projetos, setProjetos] = useState([])

    const [dropIsDown,setDrop] = useState(false)
    const [selected,setSelected] = useState(0)
    const [slideTo, setSlideTo] = useState(null)

    let history = useHistory()

    useEffect(()=>{
        const fetchData = async () => {
            const response = await api.get(`/projetos/${slug}`)
            const responseProjetos = await api.get('/projetos')
            setProjeto(response.data)
            setProjetos(responseProjetos.data.slice(0,2))
        }
        fetchData()
    },[slug])

    const onSlide = (e) => setSelected(e.realIndex)
    const bindSwiper = (swiper) => setSlideTo(() => x => swiper.slideToLoop(x))

    // dropdown events
    const dropToggle = () => setDrop(!dropIsDown)
    const dropSelect = (i, project) => () => {
        if(dropIsDown){
            setDrop(false)
        }
        setSlideTo(i)
        history.push(`/academyAgenda/${project.slug}`)
    }

    return(
        <Page title="Academia Virtual Sinos" id="page-avs">
            <div id="box">
                <div id="box-title">
                    <h3>
                        Programação
                    </h3>
                </div>
                <div className={`dropdown ${dropIsDown ? 'isdown' : ''}`}>
                    <div className="selected" onClick={dropToggle}>
                        <div className="droptitle" style={{backgroundColor: dropIsDown ? '#BEBEBE' : `${projeto.color}`, color: 'white', padding: '16px'}}>{dropIsDown ? 'Selecione' : projeto.title}</div>
                        <div className="dropicon"><img src="/img/icons/arrow-down.svg" width="20" alt="" /></div>
                    </div>
                    <div className="options-viewport">
                        <div className="options">
                            {projetos.map((projeto,i)=>{
                                return <li key={`${projeto.id}-drop-${i}`} onClick={dropSelect(i, projeto)} style={{backgroundColor: `${projeto.color}`}}>{projeto.title}</li>
                            })}
                        </div>
                    </div>
            
                </div>
          </div>
          <AcademyPageAgenda/>
          <div id="form-box">
              {projeto.form_link ? 
              <a href={projeto.form_link} target="__blank">
                    Clique aqui para fazer sua inscrição
              </a>
            : null}
          </div>
        </Page>
    )
}