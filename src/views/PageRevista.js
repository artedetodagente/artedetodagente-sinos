import React, { useEffect, useState } from "react";

import slugify from 'slugify'

import CardObra from "../components/CardObra";
import Page from "./Page";

import { ObrasContainer } from "../components/ObraStyles";
import { DesktopFlexCol } from "../components/CommonStyles";

import SimpleAccordion from "../components/Accordion";

import ReactPlayer from "react-player";

import { Document, Page as Pager } from "react-pdf/dist/umd/entry.webpack";

import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

import { useRouteMatch, useParams, Switch, Route } from "react-router-dom";

import { HashLink as Link } from "react-router-hash-link";

import api from "../services/api";

export default function PageRevista({ path }) {
    
    const { id } = useParams();
    const [partitura, setPartitura] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(2);
  
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
        <Page title="Revista Sinos">
            <div style={{marginLeft: '10vh'}}>
                <div className="breadcrumbs">
                    <span>
                        <Link to={`/`}>Home</Link> &raquo;&nbsp;
                    </span>
                    <span>Revista Sinos</span>
                
                </div>
                <div className="repertorio-container">
  
                    <div id="partituras" className="partituras-container">
                    
                        <nav className="pdf-nav" style={{marginLeft: '20vh'}}>
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
                                    href={`https://admin.sinos.art.br/uploads/Revista_Sinos_completo_17_12_20_f17de997d1.pdf`}
                                >
                                Download do PDF
                                </a>
                            </div>
                        </nav>
                    <Document
                        className="pdf"
                        error="Aguarde um momento, carregando PDF..."
                        loading="Carregando PDF..."
                        file={`https://admin.sinos.art.br/uploads/Revista_Sinos_completo_17_12_20_f17de997d1.pdf`}
                        onLoadSuccess={onDocumentLoadSuccess}
                        renderMode="svg"
                    >
                        <Pager pageNumber={pageNumber} scale={reSize()}/>
                    </Document>
            
            
                    </div>
                </div>
            </div>
        </Page>
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
  