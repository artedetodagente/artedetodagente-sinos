import React, { useEffect, useState } from 'react'

import Page from '../views/Page'

import CardConcerto from '../components/CardConcerto'

import { ObrasContainer } from '../components/ObraStyles'
import { DesktopFlexCol } from '../components/CommonStyles'

import SimpleAccordion from '../components/Accordion'

import YouEmbed from '../components/YouEmbed'

import AulaBox from '../components/AulaBox'

import {
    useRouteMatch,
    useParams,
    Switch,
    Route
  } from "react-router-dom"

import { HashLink as Link } from 'react-router-hash-link'

import api from '../services/api'
import '../css/repertorio.css'


export default function PageConcertos(){

    const [concertos, setConcertos] = useState([])

    const {path} = useRouteMatch()

    useEffect(()=>{
        async function fetchData(){
            const response = await api.get('/concertos')
            setConcertos(response.data.reverse())
        }
        fetchData()
    },[])
    
    return (
        <Switch>
            <Page title='Concertos Sinos' className="obra-content">
                <Route exact path={path}>
                  <div className="links">
                    <Link to='/'>HOME >></Link>
                    <Link to='/concertos-sinos/concertos'> CONCERTOS SINOS >> </Link>
                  </div>
                  <DesktopFlexCol>

                  </DesktopFlexCol>
                    <ObrasContainer>
                        {
                            concertos.map((concerto, i)=>{
                              
                                return (
                                    <Link to={`/concertos-sinos/concertos/${concerto.slug}`} key={i}>
                                        <CardConcerto concerto={concerto}/>
                                    </Link>
                                    )
                        })
                      }
                    </ObrasContainer>
                </Route>

                <Route path={`${path}/:concerto_slug`}>
                    <Concerto path={path}/>
                </Route>
            </Page>
        </Switch>
    )
}

const buttonStyle={
  fontSize: '1em',
  textDecoration: 'none',
  marginTop: '1vh',
  color: 'red'
}

function Concerto({ path }){

    const {concerto_slug} = useParams()

    const [concerto, setConcerto] = useState([])
    const [obras, setObras] = useState([])

    const [autores, setAutores] = useState([])

    const [aula, setAula] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const response = await api.get(`/concertos/${concerto_slug}`)
            setAula(response.data.obras[0])
            setConcerto(response.data)
            setAutores(response.data.repertorio_autors)
            setObras(response.data.obras)
        };
        fetchData()
    },[concerto_slug])

    return (
        <div>
          <div className="links">
            <Link to='/'>HOME >></Link>
            <Link to='/concertos-sinos/concertos'> CONCERTOS >> </Link>
            <Link to={`${path}/${concerto_slug}`} style={{textTransform: 'uppercase'}}> {concerto.title} </Link>
          </div>
            <div className="repertorio-container" >
                <div className="left-container">
                  <div className="repertorio-video-container">
                    <p className="repertorio-title">
                      {concerto.concerto_name}
                    </p>
                    <p className="repertorio-inner">
                      {concerto.intro}<br/>
                      <Link to={`/concertos-sinos/concerto/${concerto.slug}`} style={buttonStyle}>LEIA MAIS</Link>
                    </p>
                     
                  </div>
                  <div>
                      <p className="repertorio-title">Autor(es)</p>
                      { autores.map((autor, i)=>{
                          return <SimpleAccordion key={i} nome={autor.nome} mini_bio={autor.mini_bio} autor_id={autor.id}/>
                      })
                        
                      }
                    </div>
            </div>
            <div className="partituras-container">
              <div className="aulas-view">
                <div className="aulas-view-video">
                    <YouEmbed url={aula.url}/>
               </div>
               </div>
                <div className="aulas-select aula-box">
                  {obras.map((aula,i)=>
                      <AulaBox
                        key={i}
                        onClick={() => setAula(aula)}
                        title={`Concerto ${i+1}`}
                        video={obras[i].url}
                      />
                  )}
                </div>       
            </div>
          </div>
      </div>
    )
}