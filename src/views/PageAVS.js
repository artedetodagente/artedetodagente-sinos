import React, {useState,useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import Page from './Page'
import PageAVSAgenda from './PageAVSAgenda'
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
      setProjetos(R.filter(arr => arr.avs_schedules.length, responseProjetos.data))
    }
    fetchData()
  },[])

  const onSelect = (i) => history.push(`/academia-virtual/${projetos[i].slug}`)
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
      <PageAVSAgenda/>
    </Page>
  )
}