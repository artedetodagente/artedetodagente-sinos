import React, { useEffect, useState } from 'react'

import Page from '../views/Page'

import CardObra from '../components/CardObra'

import { ObrasContainer } from '../components/ObraStyles'
import { DesktopFlexCol } from '../components/CommonStyles'

import SimpleAccordion from '../components/Accordion'

import ReactPlayer from 'react-player'

import { Document, Page as Pager} from 'react-pdf/dist/umd/entry.webpack';

import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

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

    const {path} = useRouteMatch()

    useEffect(()=>{
        async function fetchData(){
            const response = await api.get('/repertorio-obras')
            setObras(response.data.reverse())
        }
        fetchData()
    },[])
    
    return (
        <Switch>
            <Page title='Repertório Sinos' className="obra-content">
                <Route exact path={path}>
                  <div className="links">
                    <Link to='/'>HOME >></Link>
                    <Link to='/repertorio-sinos/obras'> REPERTÓRIO SINOS >> </Link>
                  </div>
                  <DesktopFlexCol>
                  {/*<DropDown
                      black
                      selected={compositor}
                      placeholder={'COMPOSITOR'}
                      options={compositores.map((cat,i) => cat)}
                      onSelect={(i)=>selectCompositor(i)}
                      width="30%"
                  />*/}
                  </DesktopFlexCol>
                    <ObrasContainer>
                        {
                            obras.map((obra, i)=>{
                              
                                return (
                                    <Link to={`/repertorio-sinos/obras/${obra.slug}`} key={i}>
                                        <CardObra obra={obra} autors={obra.repertorio_autors} instrumentos={obra.Instrumentacao}/>
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


function Obra({ path }){

    const {obra_slug} = useParams()
    const [obra, setObra] = useState([])
    const [autores, setAutores] = useState([])
    const [partitura, setPartitura] = useState([])
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(null);
    const [instrumentacao, setInstrumentacao] = useState([]);
    const [geral, setGeral] = useState('')

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
  
    function nextPage(){
      if(pageNumber === numPages) return;
        setPageNumber(pageNumber + 1)
    }

  function previousPage(){
    if(pageNumber <= 1) return;
    setPageNumber(pageNumber - 1)
  }


    useEffect(()=>{
        async function fetchData(){
            const response = await api.get(`/repertorio-obras/${obra_slug}`)
            setObra(response.data)
            setAutores(response.data.repertorio_autors)
            setPartitura(response.data.geral.url)
            setGeral(response.data.geral.url)
            setInstrumentacao(response.data.Instrumentacao)
        };
        fetchData()
    },[obra_slug])

    const handleGeral = () => {
      if(partitura === geral) return;
      setPartitura(geral)
    }
    
    const handlePartitura = (data, e) => {
      setPartitura(data)
    }

    return (
        <div>
          <div className="links">
            <Link to='/'>HOME >></Link>
            <Link to='/repertorio-sinos/obras'> OBRAS >> </Link>
            <Link to={`${path}/${obra_slug}`} style={{textTransform: 'uppercase'}}> {obra.title} </Link>
          </div>
            <div className="repertorio-container" >
                <div className="left-container">
                  <div className="repertorio-video-container">
                    <p className="repertorio-title">
                      <strong>Acompanhe a partitura:</strong>
                    </p>    
                    <div className="video-container">
                      <ReactPlayer
                      url={obra.video_url}
                      controls={true}
                      width="100%"
                      height="100%"
                      light={true}
                      />  
                    </div>             
                  </div>
                  <div>
                      <p className="repertorio-title"><strong>Autor(es)</strong></p>
                      { autores.map((autor, i)=>{
                          return <SimpleAccordion key={i} nome={autor.nome} mini_bio={autor.mini_bio} autor_id={autor.id}/>
                      })
                        
                      }
                </div>
                
                <div>
                  <p className="repertorio-title"><strong>Instrumentação</strong></p>
                  <div className="instrumentos-inner">
                    <>
                    <span className="instrumentos" onClick={()=> handleGeral()}>Geral</span>
                    {instrumentacao.map((instrumento, i) => {
                      return <span key={i} className="instrumentos" onClick={(e)=> handlePartitura(instrumento.partitura.url, e)} >{instrumento.title}</span>
                    })}
                    </>
                  </div>
                </div>
                <div>
                    <p className="repertorio-title"><strong>Nivel técnico: {obra.dificuldade}</strong></p>
                </div>
                <div>
                    <p className="repertorio-title"><strong>Tempo: {obra.minutagem}</strong></p>
                </div>
            </div>
            <div className="partituras-container">
              <Document
                      className="pdf"
                      error="Aguarde um momento, carregando PDF..."
                      loading="Carregando PDF..."
                      file={`https://admin.sinos.art.br${partitura}`}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                    <Pager pageNumber={pageNumber} />
                    <div className="obra-buttons">
                      <button onClick={()=>previousPage()}><ArrowBackIos/></button>
                        <p>Página {pageNumber} de {numPages}</p>
                      <button onClick={()=>nextPage()}><ArrowForwardIos/></button>            
                    </div>
                    </Document>
                  
            </div>
          </div>
      </div>
    )
}