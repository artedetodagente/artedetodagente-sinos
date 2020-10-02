import React, {useState,useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import Page from './Page'
import AcademyPageAgenda from './AcademyPageAgenda'
import {DropDown} from '../components/Dropdown'
import * as R from 'ramda'
import api from '../services/api'

export default function AcademyAgenda(props){

  const {slug} = useParams()
  const [projetos, setProjetos] = useState([])

  let history = useHistory()

  useEffect(()=>{
    const fetchData = async () => {
      const responseProjetos = await api.get('/projetos')
      setProjetos(responseProjetos.data.slice(0,2))
    }
    fetchData()
  },[])

  const onSelect = (i) => history.push(`/academyAgenda/${projetos[i].slug}`)
  const selected = R.findIndex(R.propEq('slug', slug), projetos)
  const options = projetos.map((proj,i) => {
    return {
      title: proj.title,
      background: proj.color,
      color: '#fff'
    }
  })

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
          selected={selected}
          onSelect={onSelect}
          options={options}
        />
        }
      </div>
      <AcademyPageAgenda/>
    </Page>
  )
}