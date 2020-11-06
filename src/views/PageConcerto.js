import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import {
    useParams
  } from "react-router-dom"

import {RedLink} from '../components/CommonStyles'

import api from '../services/api'

import Page from './Page'

import ReactMarkdown from 'react-markdown'

export default function Autor(props){

    const {concerto_slug} = useParams()

    const [concerto, setConcerto] = useState([])

    useEffect(()=>{
        async function fetchData() {
            const response = await api.get(`/concertos/${concerto_slug}`)
            setConcerto(response.data)
        }
        fetchData()
    },[concerto_slug])

    return(
        
        <Page title="Concertos Sinos">
            <div className="links">
                <Link to='/'>HOME >></Link>
                <Link to='/concertos-sinos/concertos'> CONCERTOS SINOS >> </Link>
                <Link to={`/concertos-sinos/concerto/${concerto.id}`} style={{textTransform: 'uppercase'}}> {concerto.title} </Link>
            </div>
            <div className="repertorio-container" style={{display: 'block', textAlign: 'center'}}>
                <div className="partituras-container" style={{width: '100%'}}>
                    <p><strong>{concerto.concerto_name}</strong></p><br/>
                    <ReactMarkdown source={concerto.text}/>
                </div>
            </div>
            <RedLink to={`/concertos-sinos/concertos/${concerto_slug}`}>Voltar</RedLink>
        </Page>
            
    )
}