import React, { useEffect, useState } from 'react'

import Page from '../views/Page'

import CardConcerto from '../components/CardConcerto'

import { P } from '../components/CardObraStyles';

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
import slugify from 'slugify'

export default function PageFimuca(){

    const [obras, setObras] = useState([]);
    const [edicao, setEdicao] = useState({});

    const {slug} = useParams();
    const {path} = useRouteMatch();

    useEffect(()=>{
        async function fetchData(){
            const response = await api.get(`/fimuca-edicoes/${slug}`)
            setEdicao(response.data);
            setObras(response.data.fimuca_obras.reverse())
        }
        fetchData()
    },[slug])
    
    return (
        <Switch>
            <Page title='Concertos Sinos' className="obra-content">
                <Route exact path={path}>
                  <div className="breadcrumbs">
                    <span><Link to={`/`}>Home</Link> &raquo;&nbsp;</span>
                    <span>{edicao.title}</span>
                  </div>
                  <DesktopFlexCol>

                  </DesktopFlexCol>
                    <ObrasContainer>
                      {
                        obras.map((obra, i)=>{
                          return (
                            <Link to={`/fimuca/${slug}/${obra.slug}`} key={i}>
                              <P primary>{obra.title}</P>
                              <P>{obra.fimuca_autor.nome}</P>
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

    const {obra_slug, slug} = useParams()

    const [obra, setObra] = useState([])
    const [obras, setObras] = useState([])

    const [autor, setAutor] = useState([])

    const [aula, setAula] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const response = await api.get(`/fimuca-obras/${obra_slug}`)
            setAula(response.data.obras[0])
            setObra(response.data);
            setObras(response.data.obras);
            setAutor(response.data.fimuca_autor)
        };
        fetchData()
    },[obra_slug])

  return (
        <div>
          <div className="breadcrumbs">
            <span><Link to={`/`}>Home</Link> &raquo;&nbsp;</span>
            <span><Link to={`/fimuca/${slug}`}>{slug}</Link> &raquo;&nbsp;</span>
            <span>{obra.title}</span>
          </div>
          <div className="repertorio-container" >
            <div className="left-container">
              <div className="repertorio-video-container">
                <p className="repertorio-title">
                  {obra.title}
                </p>
                <p className="repertorio-inner">
                  {obra.intro}<br/>
                </p>
              </div>
              <div>
                <p className="repertorio-title">Autor</p>
                   <SimpleAccordion title={autor.nome} text={autor.mini_bio} fimuca={true}/>
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
                      title={`Vídeo ${i+1}`}
                      video={obras[i].url}
                    />
                )}
              </div>       
            </div>
          </div>
      </div>
    )
}