import React, { useEffect, useState } from 'react'

import Page from '../views/Page'
import CardObra from '../components/CardObra'

import ReactPlayer from 'react-player'

import { BiArrowFromRight, BiArrowFromLeft } from 'react-icons/bi'

import { Document, Page as Pager} from 'react-pdf/dist/umd/entry.webpack';

import { ObrasContainer } from '../components/ObraStyles'

import {
    useRouteMatch,
    useParams,
    Switch,
    Route
  } from "react-router-dom"

import { HashLink as Link } from 'react-router-hash-link'

import api from '../services/api'
import '../css/repertorio.css'

const buttonStyle={
  fontSize: '0.8em',
  textDecoration: 'none',
  marginLeft: '1vh',
  color: 'red'
}

export default function PageObras(){

    const [obras, setObras] = useState([])

    const {path} = useRouteMatch()

    useEffect(()=>{
        async function fetchData(){
            const response = await api.get('/repertorio-obras')
            setObras(response.data)
        }
        fetchData()
    },[])

    return (
        <Switch>
            <Page title='Repertório Sinos' className="obra-content">
                <Route exact path={path}>
                  <div className="links">
                    <Link to='/'>HOME >></Link>
                    <Link to='/repertorio-sinos'> REPERTÓRIO SINOS >> </Link>
                    <Link to={path}> OBRAS </Link>
                  </div>
                    <ObrasContainer>
                        {
                            obras.map((obra, i)=>{
                                return (
                                    <Link to={`/repertorio-sinos/obras/${obra.slug}`} key={i}>
                                        <CardObra obra={obra} autor={obra.repertorio_autor} />
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
    const [partitura, setPartitura] = useState([])
    const [instrumentos, setInstrumentos] = useState([])
    const [professorObras, setProfessorObras] = useState([])

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const [autor, setAutor] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const response = await api.get(`/repertorio-obras/${obra_slug}`)
            setObra(response.data)
            setPartitura(response.data.Partitura)
            setAutor(response.data.repertorio_autor)
            setInstrumentos(response.data.Instrumentos)
            setProfessorObras(response.data.repertorio_autor.repertorio_obras)
        };
        fetchData()
    },[obra_slug])

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

    return (
        <div>
          <div className="links">
            <Link to='/'>HOME >></Link>
            <Link to='/repertorio-sinos'> REPERTÓRIO SINOS >> </Link>
            <Link to={'/repertorio-sinos/obras'}> OBRAS >></Link>
            <Link to={`${path}/${obra_slug}`} style={{textTransform: 'uppercase'}}> {obra.title} </Link>
          </div>
            <div className="repertorio-container">
                <div className="left-container">
                  <div className="repertorio-video-container">
                    <p className="acompanhe">
                      Acompanhe a partitura:
                    </p>
                    <ReactPlayer 
                      className="player"
                      url={obra.video_url} 
                      light={true} 
                      controls={true} 
                      loop={true} 
                    />
                    <div>
                      <p className="repertorio-title">
                        {autor.nome}
                      </p>
                      <p className="repertorio-inner">
                        {autor.mini_bio}
                      </p>
                      <Link to={`/repertorio-sinos/autor/${autor.id}`} style={buttonStyle}>LEIA MAIS</Link>
                  </div>
                  <div>
                    <p className="repertorio-title">
                      Instrumentação
                    </p>
                    <p className="instrumentos-inner">
                        {
                          instrumentos.map((instrumento, i)=>{
                            return (
                              <li key={i} className="instrumentos" > {instrumento.title}</li>
                            )
                          })
                        }
                    </p>
                </div>

                <p className="repertorio-title">
                  Nível técnico: {obra.dificuldade}
                </p>

                <p className="repertorio-title">
                  Tempo: {obra.minutagem}
                </p>
              
            <div>
              <p className="repertorio-title" style={{backgroundColor: 'lightgreen'}}>
                Mais obras deste autor
              </p>
              <p className="repertorio-inner">
                  {
                  professorObras.map((obra, i)=>{
                    return (
                      <span key={i}>
                        <Link to={`/repertorio-sinos/obras/${obra.slug}`}>{obra.title}</Link>
                        <br/>
                      </span>
                    )
                  })
                  }
                </p>
              </div>
  
            </div>
          </div>
          <div className="partituras-container">
            
              <Document
                className="pdf"
                error="Aguarde um momento, carregando PDF..."
                loading="Carregando PDF..."
                file={`https://admin.sinos.art.br${partitura.url}`}
                onLoadSuccess={onDocumentLoadSuccess}
              >
              <Pager pageNumber={pageNumber} />
              <div className="obra-buttons">
                <button onClick={()=>previousPage()}><BiArrowFromRight/></button>
                  <p>Página {pageNumber} de {numPages}</p>
                <button onClick={()=>nextPage()}><BiArrowFromLeft/></button>            
              </div>
              </Document>

        </div>
      </div>
    </div>
    )
}