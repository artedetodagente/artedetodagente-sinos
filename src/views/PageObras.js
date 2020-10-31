import React, { useEffect, useState } from 'react'

import Page from '../views/Page'

import CardObra from '../components/CardObra'

import { ObrasContainer } from '../components/ObraStyles'
import { DropDown } from '../components/Dropdown'
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


export default function PageObras(){

    const [obras, setObras] = useState([])

    const [compositores, setCompositores] = useState([])
    const [compositor, setCompositor] = useState(null)

    const {path} = useRouteMatch()

    useEffect(()=>{
        async function fetchData(){
            const response = await api.get('/repertorio-obras')
            const responseCompositor = await api.get('/repertorio-autors')
            setObras(response.data.reverse())
            setCompositores(responseCompositor.data)
        }
        fetchData()
    },[])

    const selectCompositor = async (i) => {
      setCompositor(i)
      const compositor = compositores[i]
      if(compositor){
        setObras(compositor.repertorio_obras)
      }
    }
    
    return (
        <Switch>
            <Page title='Concertos Sinos' className="obra-content">
                <Route exact path={path}>
                  <div className="links">
                    <Link to='/'>HOME >></Link>
                    <Link to='/repertorio-sinos/obras'> CONCERTOS SINOS >> </Link>
                  </div>
                  <DesktopFlexCol>
                  <DropDown
                      black
                      selected={compositor}
                      placeholder={'COMPOSITOR'}
                      options={compositores.map((cat,i) => cat)}
                      onSelect={(i)=>selectCompositor(i)}
                      width="30%"
                  />
                  </DesktopFlexCol>
                    <ObrasContainer>
                        {
                            obras.map((obra, i)=>{
                              
                                return (
                                    <Link to={`/repertorio-sinos/obras/${obra.slug}`} key={i}>
                                        <CardObra obra={obra}/>
                                    </Link>
                                    )
                        })
                      }
                    </ObrasContainer>
                </Route>

                <Route path={`${path}/:obra_slug`}>
                    <Obra path={path}/>
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

function Obra({ path }){

    const {obra_slug} = useParams()

    const [obra, setObra] = useState([])
    const [videos, setVideos] = useState([])

    const [autores, setAutores] = useState([])

    const [aula, setAula] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const response = await api.get(`/repertorio-obras/${obra_slug}`)
            setAula(response.data.videos[0])
            setObra(response.data)
            setAutores(response.data.repertorio_autors)
            setVideos(response.data.videos)
        };
        fetchData()
    },[obra_slug])

    return (
        <div>
          <div className="links">
            <Link to='/'>HOME >></Link>
            <Link to='/repertorio-sinos/obras'> CONCERTOS >> </Link>
            <Link to={`${path}/${obra_slug}`} style={{textTransform: 'uppercase'}}> {obra.title} </Link>
          </div>
            <div className="repertorio-container" >
                <div className="left-container">
                  <div className="repertorio-video-container">
                    <p className="repertorio-title">
                      {obra.concerto_nome}
                    </p>
                    <p className="repertorio-inner">
                      {obra.intro}<br/>
                      <Link to={`/repertorio-sinos/concerto-obra/${obra.slug}`} style={buttonStyle}>LEIA MAIS</Link>
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
                  {videos.map((aula,i)=>
                      <AulaBox
                        key={i}
                        onClick={() => setAula(aula)}
                        title={`Concerto ${i+1}`}
                        video={videos[i].url}
                      />
                  )}
                </div>       
            </div>
          </div>
      </div>
    )
}