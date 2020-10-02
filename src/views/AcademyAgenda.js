import React, {useState,useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import Page from './Page'
import AcademyPageAgenda from './AcademyPageAgenda'
import {DropDown} from '../components/Dropdown'
import * as R from 'ramda'
import api from '../services/api'

export default function AcademyAgenda(props){

    const {slug} = useParams()

    const [projeto, setProjeto] = useState([])
    const [projetos, setProjetos] = useState([])

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

    
    function dropSelect (project) {
      history.push(`/academyAgenda/${project.slug}`)
    }

    // console.log([`slug`,R.findIndex(R.propEq('slug', slug),projetos)])

    return(
        <Page title="Academia Virtual Sinos" id="page-avs">
          <div id="box">
            <div id="box-title">
              <h3>
                Programação
              </h3>
            </div>
            {projetos &&
            <DropDown
              selected={R.findIndex(R.propEq('slug', slug),projetos)}
              onSelect={(i)=>dropSelect(projetos[i])}
              options={projetos.map((proj,i) => {
                return {title: proj.title, background: proj.color, color: '#fff'}
              })}
            />
            }
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