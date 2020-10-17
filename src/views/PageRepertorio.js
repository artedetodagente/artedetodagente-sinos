import React, { useState, useEffect } from 'react'

import {
  useRouteMatch,
} from "react-router-dom"

import { HashLink as Link } from 'react-router-hash-link'

import Page from './Page'
import {RedLink} from '../components/CommonStyles'

import ReactMarkdown from 'react-markdown'

import api from '../services/api'

function PageRepertorio({ id }){

    const {path} = useRouteMatch()

    const [repertorio, setRepertorio] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const response = await api.get('/repertorio-sinos')
            setRepertorio(response.data)
        }
        fetchData()
    },[])

    return(
        <Page title={repertorio.title}>
            <div className="links">
                <Link to='/'>HOME >></Link>
                <Link to={path}> REPERTÓRIO SINOS >> </Link>
            </div>
            <div style={{marginTop: '4vh'}}>
                <ReactMarkdown source={repertorio.description} />
            </div>
            <RedLink to={`/repertorio-sinos/obras`} style={{marginTop: '2vh'}}>Saiba mais</RedLink>
        </Page>
    )
};

export default PageRepertorio;