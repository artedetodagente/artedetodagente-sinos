import React, { useEffect, useState } from 'react'

import Page from '../views/Page'
import CardObra from '../components/CardObra'

import {
    useRouteMatch,
  } from "react-router-dom"

import { HashLink as Link } from 'react-router-hash-link'

import api from '../services/api'

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

    const styles = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '20px',
        marginTop: '5vh'
    }


    return (
        <Page title='Obras'>
            <Link to='/'>HOME >></Link>
            <Link to='/repertorio-sinos'> REPERTÓRIO SINOS >> </Link>
            <Link to={path}> OBRAS </Link>
            <div style={styles}>
            {
                obras.map((obra, i)=>{
                    return <CardObra obra={obra} key={i} autor={obra.repertorio_autor} />
                })
            }
            </div>
        </Page>
    )
}