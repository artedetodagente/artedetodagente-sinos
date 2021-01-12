import React, { useEffect, useState } from "react";

import slugify from 'slugify'

import Page from "./Page";

import CardObra from "../components/CardObra";

import { ObrasContainer } from "../components/ObraStyles";
import { DesktopFlexCol } from "../components/CommonStyles";

import SimpleAccordion from "../components/Accordion";

import { DropDown } from '../components/Dropdown'

import * as R from 'ramda'

import ReactPlayer from "react-player";

import { Document, Page as Pager } from "react-pdf/dist/umd/entry.webpack";

import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

import { useRouteMatch, useParams, Switch, Route } from "react-router-dom";

import { HashLink as Link } from "react-router-hash-link";

import api from "../services/api";

export default function PageRepertorioObras() {
  const [obras, setObras] = useState([]);
  const [compositores, setCompositores] = useState([]);
  const [compositor, setCompositor] = useState('');
  const [nivel, setNivel] = useState([]);
  const [dificuldades, setDificuldades] = useState([]);
  const [dificuldade, setDificuldade] = useState(null);
  const [instrumentos, setInstrumentos] = useState([]);
  const [instrumento, setInstrumento] = useState({});
  const [repertorioObras, setRepertorioObras] = useState([]);

  const { path } = useRouteMatch();

  useEffect(() => {
    async function fetchData() {
      const dificuldades = [];
      const autores = []
      const response = await api.get("/repertorio-obras");
      const responseCompositores = await api.get("/repertorio-autors");
      const responseInstrumentos = await api.get("/repertorio-instrumentos");

      for(const item of response.data) {
        dificuldades.push(item.dificuldade);
        item.repertorio_autors.map(autor => autores.push(autor.nome));
      }
      
      const ordered = dificuldades.sort(function(a, b) {
        return a - b;
      });

      setCompositores(uniq(autores));
      setDificuldades(uniq(ordered));
      setInstrumentos(responseInstrumentos.data);
      setRepertorioObras(response.data.reverse());
      setObras(response.data.reverse());
    }
    fetchData();
  }, []);

  function uniq(a) {
    return Array.from(new Set(a));
  }
  
  const selectCompositor = (i) => {
    let new_obras = [];

    for(const obra of repertorioObras) {
      obra.repertorio_autors.map(autor => autor.nome == compositores[i] ? new_obras.push(obra) : null );
    }

    setCompositor(compositores[i].nome);
    setInstrumento(null);
    setDificuldade(null);
    setObras(new_obras);
  }

  const selectInstrumento = async (i) => {
    let new_obras = [];

    for(const obra of repertorioObras) {
      obra.repertorio_instrumentos.map(instrumento => instrumento.title == instrumentos[i].title ? new_obras.push(obra) : null );
    }
    
    setInstrumento(instrumentos[i]);
    setCompositor(null);
    setInstrumento(null);
    setObras(new_obras);
  }

  const selectDificuldade = async (i) => {
    setDificuldade(dificuldades[i]);
    const response = await api.get(`/repertorio-obras?dificuldade_gte=${dificuldades[i]}`);
    setObras(response.data);
  }

  return (
    <Switch>
      <Page title="Repertório Sinos" className="obra-content">
        <Route exact path={path}>
          <div className="breadcrumbs">
            <span>
              <Link to={`/`}>Home</Link> &raquo;&nbsp;
            </span>
            <span>
              <Link to={`/repertorio-sinos`}>Repertório Sinos</Link>{" "}
              &raquo;&nbsp;
            </span>
            <span>Obras</span>
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
                      placeholder={'INSTRUMENTOS'}
                      options={instrumentos.map((cat,i) => cat)}
                      onSelect={(i)=>selectInstrumento(i)}
                      width="30%"
            />
          </DesktopFlexCol>
          <ObrasContainer>
            {obras.map((obra, i) => {
              return (
                <Link to={`/repertorio-sinos/obras/${obra.slug}`} key={i}>
                  <CardObra
                    obra={obra}
                    autors={obra.repertorio_autors}
                    instrumentos={obra.repertorio_instrumentos}
                  />
                </Link>
              );
            })}
          </ObrasContainer>
        </Route>

        <Route path={`${path}/:obra_slug`}>
          <Obra path={path} />
        </Route>
      </Page>
    </Switch>
  );
}

function Obra({ path }) {
  const { obra_slug } = useParams();
  const [obra, setObra] = useState([]);
  const [autores, setAutores] = useState([]);
  const [partitura, setPartitura] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [instrumentacao, setInstrumentacao] = useState([]);

  const size = useWindowSize();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function scrollToPartituras(){
    var el = document.getElementById("partituras");
    window.scrollTo({top: el.offsetTop - 150, behavior: 'smooth'});
  }

  function nextPage() {
    scrollToPartituras();
    if (pageNumber === numPages) return;
    setPageNumber(pageNumber + 1);
  }

  function previousPage() {
    scrollToPartituras();
    if (pageNumber <= 1) return;
    setPageNumber(pageNumber - 1);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/repertorio-obras/${obra_slug}`);
      setObra(response.data);
      setAutores(response.data.repertorio_autors);
      setPartitura(response.data.Instrumentacao[0].partitura);
      setInstrumentacao(response.data.Instrumentacao);
    }
    fetchData();
  }, [obra_slug]);

  const handlePartitura = (data, e) => {
    if (data != null) {
      setPartitura(data);
    }
  };

  const reSize = () => {
    if(size.width > 1200) {
      return 1.5
    } else if (size.width < 1070 && size.width > 842) {
      return 1.3
    } else if (size.width < 842 && size.width > 646){
      return 1.0
    } else if (size.width < 646 && size.width > 534) {
      return 0.8
    } else if (size.width < 534 && size.width > 400) {
      return 0.6
    } else {
      return 0.5
    }
  }

  return (
    <div>
      <div className="breadcrumbs">
        <span>
          <Link to={`/`}>Home</Link> &raquo;&nbsp;
        </span>
        <span>
          <Link to={`/repertorio-sinos`}>Repertório Sinos</Link> &raquo;&nbsp;
        </span>
        <span>
          <Link to={`/repertorio-sinos/obras`}>Obras</Link> &raquo;&nbsp;
        </span>
        <span>{obra.title}</span>
      </div>
      <div className="repertorio-container">
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
            <p className="repertorio-title">
              <strong>Autor(es)</strong>
            </p>
            {autores.map((autor, i) => {
              return (
                <SimpleAccordion
                  key={i}
                  title={autor.nome}
                  text={autor.mini_bio}
                  link={`/repertorio-sinos/autor/${autor.id}/${slugify(autor.nome)}`}
                />
              );
            })}
          </div>

          <div>
            <p className="repertorio-title">
              <strong>Instrumentação</strong>
            </p>
            <div className="instrumentos-inner">
              <>
                {instrumentacao.map((instrumento, i) => {
                  return (
                    <span
                      key={i}
                      className="instrumentos"
                      onClick={(e) => handlePartitura(instrumento.partitura, e)}
                    >
                      {instrumento.title}
                    </span>
                  );
                })}
              </>
            </div>
          </div>
          <div>
            <p className="repertorio-title">
              <strong>Nivel técnico: {obra.dificuldade}</strong>
            </p>
          </div>
          <div>
            <p className="repertorio-title">
              <strong>Tempo: {obra.minutagem}</strong>
            </p>
          </div>
        </div>
        <div id="partituras" className="partituras-container">
          {partitura ? (
            <>
            <nav className="pdf-nav">
              <div className="pdf-nav-block">
                <div className="obra-buttons">
                  <button onClick={() => previousPage()}>
                    <ArrowBackIos />
                  </button>
                  <div>
                    Página {pageNumber} de {numPages}
                  </div>
                  <button onClick={() => nextPage()}>
                    <ArrowForwardIos />
                  </button>
                </div>
                <a
                  download
                  className="download-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://admin.sinos.art.br${partitura.url}`}
                >
                  Download da partitura
                </a>
              </div>
            </nav>
            <Document
              className="pdf"
              error="Aguarde um momento, carregando PDF..."
              loading="Carregando PDF..."
              file={`https://admin.sinos.art.br${partitura.url}`}
              onLoadSuccess={onDocumentLoadSuccess}
              renderMode="svg"
            >
              <Pager pageNumber={pageNumber} scale={reSize()}/>
            </Document>
          </>
          ) : (
            "Não há PDF"
          )}
        </div>
      </div>
    </div>
  );
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}