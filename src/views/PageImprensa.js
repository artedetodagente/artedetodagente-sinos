import React, { useState, useEffect } from 'react'
import useWindowSize from '../util/useWindowSize'
import api from '../services/api'
import Page from './Page'

// componente de paginacao

function Pagination(props) {
  return (
    <nav className="block-nav">
      <button
        onClick={()=>props.prev()}
        style={{opacity: props.current > 1 ? 1 : 0.5}}
      >◀</button>
      <span className="pagination">{props.current}/{props.total}</span>
      <button
        onClick={()=>props.next()}
        style={{opacity: props.current < props.total ? 1 : 0.5}}
      >▶</button>
    </nav>
  )
}

// componente releases

function Releases() {

  const [releases, setReleases] = useState([])
  const [pagination, setPagination] = useState(0)

  const itemsPerPage = 4
  const totalPages = Math.ceil(releases.length/itemsPerPage)
  const start = pagination*itemsPerPage
  const end = pagination*itemsPerPage+itemsPerPage
  
  useEffect(()=>{
    async function fetchData(){
      const response = await api.get('/releases?_sort=date:DESC')
      setReleases(response.data)
    }
    fetchData()
  },[])

  function prevPage() {
    if(pagination > 0) setPagination(pagination-1)
  }
  function nextPage() {
    if(pagination < totalPages-1) setPagination(pagination+1)
  }

  return (
    <div className="imprensa-block">
      <div className="block-title">Releases</div>
      <div className="block-content gray">
        <ul>
        {releases && releases.slice(start,end).map((item,i)=>{
          return (
            <li key={i}>
              <a rel="noopener noreferrer" target="_blank" href={`http://localhost:1337${item.file.url}`}>
                {item.title}
              </a>
            </li>
          )
        })}
        </ul>
      </div>
      <div className="block-footer">
        <Pagination
          current={pagination+1}
          total={totalPages}
          prev={prevPage}
          next={nextPage}
        />
      </div>
    </div>
  )
}

// componente clippings

function Clippings() {

  const [clippings, setClippings] = useState([])
  const [pagination, setPagination] = useState(0)

  const size = useWindowSize()

  const itemsPerPage = size.width > 768 ? 6 : 1
  const totalPages = Math.ceil(clippings.length/itemsPerPage)
  const start = pagination*itemsPerPage
  const end = pagination*itemsPerPage+itemsPerPage
  
  
  useEffect(()=>{
    if(pagination > totalPages-1){
      setPagination(0)
    }
  },[size,pagination,totalPages])

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get('/clippings?_sort=date:DESC')
      setClippings(response.data)
    }
    fetchData()
  },[])

  function prevPage() {
    if(pagination > 0) setPagination(pagination-1)
  }
  function nextPage() {
    if(pagination < totalPages-1) setPagination(pagination+1)
  }

  return (
    <div className="imprensa-block">
      <div className="block-title">Clippings</div>
      
      <div className="block-content-grid">
      {clippings && clippings.slice(start,end).map((item,i)=>{
        return (
          <article key={i}>
            <div className="article-box">
              <div className="figure">
                <a rel="noopener noreferrer" target="_blank" href={item.link}>
                  <img src={`http://localhost:1337${item.cover.formats.thumbnail.url}`} alt={item.title}/>
                </a>
              </div>
              <div className="info" >
                <a rel="noopener noreferrer" target="_blank" href={item.link}>
                  <strong>{item.title}</strong>
                </a>
                <div>{item.intro}</div>
              </div>
            </div>
          </article>
        )
      })}
      </div>
        
      <div className="block-footer">
        <Pagination
          current={pagination+1}
          total={totalPages}
          prev={prevPage}
          next={nextPage}
        />
      </div>
    </div>
  )
}

// componente Contatos

function Contatos() {
  return (
    <div className="imprensa-block">
      <div className="block-title">Contatos</div>
      <div className="block-content gray">
        <p><strong>Assessoria de imprensa</strong></p>
        <ul>
          <li>Projetos UFRJ – Funarte: imprensa@musica.ufrj.br</li>
          <li>Funarte – Assessoria de Comunicação: ascomfunarte@funarte.gov.br</li>
        </ul>
      </div>
      <div className="block-footer">&nbsp;</div>
    </div>
  )
}


// componente principal

function PageImprensa() {

  return (
    <Page title="Imprensa">
      <div className="page-view imprensa-view">
        <div className="imprensa-cols">
          <Releases />
          <Contatos />
        </div>
        <Clippings />
      </div>
    </Page>
  );
}

export default PageImprensa;
