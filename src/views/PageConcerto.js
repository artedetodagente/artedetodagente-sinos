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

    const {id} = useParams()

    const [obra, setObra] = useState([])

    useEffect(()=>{
        async function fetchData() {
            const response = await api.get(`/repertorio-obras/${id}`)
            setObra(response.data)
        }
        fetchData()
    },[id])

    console.log(obra)

    return(
        
        <Page title="Concertos Sinos">
            <div className="links">
                <Link to='/'>HOME >></Link>
                <Link to='/repertorio-sinos/obras'> CONCERTOS SINOS >> </Link>
                <Link to={`/repertorio-sinos/concerto-obra/${obra.id}`} style={{textTransform: 'uppercase'}}> {obra.title} </Link>
            </div>
            <div className="repertorio-container" style={{display: 'block'}, {textAlign: 'center'}}>
                <div className="partituras-container" style={{width: '100%'}}>
                    <p><strong>{obra.concerto_nome}</strong></p><br/>
                    <ReactMarkdown source={obra.text}/>
                </div>
            </div>
            <RedLink to="/repertorio-sinos/obras">Voltar</RedLink>
        </Page>
            
    )
}