import React, { useEffect, useState } from 'react'

import Page from '../views/Page'

import CardObra from '../components/CardObra'
import ReactPlayer from 'react-player'
import { Document, Page as Pager} from 'react-pdf/dist/umd/entry.webpack';
import { ObrasContainer } from '../components/ObraStyles'
import { DropDown } from '../components/Dropdown'
import { DesktopFlexCol } from '../components/CommonStyles'

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

import SimpleAccordion from '../components/Accordion'

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

    const [dificuldades, setDificuldades] = useState([])
    const [dificuldade, setDificuldade] = useState(null)

    const [instrumentos, setInstrumentos] = useState([])
    const [instrumento, setInstrumento] = useState(null)

    const {path} = useRouteMatch()

    function uniqueFilter(value, index, self) {
      return self.indexOf(value) === index
    }

    useEffect(()=>{
        async function fetchData(){
            const response = await api.get('/repertorio-obras')
            const responseCompositor = await api.get('/repertorio-autors')
            const responseInstrumentos = await api.get('/repertorio-instrumentos')
            setDificuldades(response.data.map(obra=>obra.dificuldade).filter(uniqueFilter))
            setInstrumentos(responseInstrumentos.data)
            setObras(response.data.reverse())
            setCompositores(responseCompositor.data)
        }
        fetchData()
    },[])

    const selectCompositor = async (i) => {
      setCompositor(i)
      setDificuldade(null)
      setInstrumento(null)
      const compositor = compositores[i]
      if(compositor){
        setObras(compositor.repertorio_obras)
      }
    }

    const selectDificuldade = async (i) => {
      setDificuldade(i)
      setCompositor(null)
      setInstrumento(null)
      const filteredObras = await api.get(`/repertorio-obras?dificuldade_gte=${dificuldades[i]}`)
      if(filteredObras){
        setObras(filteredObras.data.reverse())
      }
    }

    const selectInstrumento = (i) => {
      setInstrumento(i)
      setDificuldade(null)
      setCompositor(null)
      const {repertorio_obras} = instrumentos[i]
      if(repertorio_obras){
        setObras(repertorio_obras)
      }
    }
    
    return (
        <Switch>
            <Page title='Repertório Sinos' className="obra-content">
                <Route exact path={path}>
                  <div className="links">
                    <Link to='/'>HOME >></Link>
                    <Link to='/repertorio-sinos'> REPERTÓRIO SINOS >> </Link>
                    <Link to={path}> OBRAS </Link>
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
                  <DropDown
                      black
                      selected={dificuldade}
                      placeholder={'NÍVEL TÉCNICO'}
                      options={dificuldades.map((cat,i) => cat)}
                      onSelect={(i)=>selectDificuldade(i)}
                      width="30%"
                  />
                  <DropDown
                      black
                      selected={instrumento}
                      placeholder={'INSTRUMENTO'}
                      options={instrumentos.map((cat,i) => cat )}
                      onSelect={(i)=>selectInstrumento(i)}
                      width="30%"
                  />
                  </DesktopFlexCol>
                    <ObrasContainer>
                        {
                            obras.map((obra, i)=>{
                              
                                return (
                                    <Link to={`/repertorio-sinos/obras/${obra.slug}`} key={i}>
                                        <CardObra obra={obra} autors={obra.repertorio_autors}/>
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

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const [autores, setAutores] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const response = await api.get(`/repertorio-obras/${obra_slug}`)
            setObra(response.data)
            setPartitura(response.data.Partitura)
            setAutores(response.data.repertorio_autors)
            setInstrumentos(response.data.repertorio_instrumentos)
            
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
                      
                  </div>
                  <div>
                      <p className="repertorio-title">AUTORES DA OBRA</p>
                      { autores.map((autor, i)=>{
                          return <SimpleAccordion key={i} nome={autor.nome} mini_bio={autor.mini_bio} autor_id={autor.id}/>
                      })
                        
                      }
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
                <button onClick={()=>previousPage()}><ArrowLeftIcon/></button>
                  <p>Página {pageNumber} de {numPages}</p>
                <button onClick={()=>nextPage()}><ArrowRightIcon/></button>            
              </div>
              </Document>
        </div>
          </div>
      </div>
    )
}