import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'
import api from '../services/api'
import CardObra from '../components/CardObra'
import { BiggerButton } from '../components/HomeRepertorioStyles'

import {RedLink} from '../components/CommonStyles'

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function HomeRepertorio({ repertorio, url }){

    const [repertorioObras, setObras] = useState([])

    useEffect(()=>{
        
        async function fetchData(){

            /*const count = await api.get('/repertorio-obras/count')

            let array = []

            for(let i = 0; i <= count.data; i++){
                const number = Math.floor(Math.random() * count.data) + 1
                array.push(number)
            }

            array.filter(uniqueFilter)
            const response = await api.get(`/repertorio-obras?id_in=${array[0]}&id_in=${array[1]}&id_in=${array[2]}`)*/
            const response = await api.get('/repertorio-obras')
            setObras(response.data.reverse())
        }
        fetchData()
    },[])


    return (
        <section id='Repertorio-Sinos' className={`home-curso full-section curso-${repertorio.id}`}>

            <div className="curso-swiper">
                <SwiperSlide key={`${repertorio.id}-slide-${1}`}>
                    <div className="curso-slide" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(https://admin.sinos.art.br${url})`}}/>
                </SwiperSlide>
            </div>

            <div className="curso-info">
                <div className="col col-1">
                    <div className="title" style={{backgroundColor: '#ffa92e'}}>REPERTÓRIO SINOS</div>
                    <div className="content">
                        <div className="text">{repertorio.intro}</div>
                        <RedLink to={`/repertorio-sinos`}>Saiba mais</RedLink>
                </div>
                </div>

                <div className="col col-2">
                    <div className={`title white`}>
                        OBRAS PRESENTES
                    </div>
                        {repertorioObras.slice(0,3).map((obra,i)=>{
                            return <Link key={i} to={`/repertorio-sinos/obras/${obra.slug}`} ><CardObra obra={obra} autors={obra.repertorio_autors} instrumentos={obra.repertorio_instrumentos}/></Link>
                        })}
                    <BiggerButton> <Link to="/repertorio-sinos/obras">ACESSAR TODAS AS OBRAS </Link><ArrowForwardIosIcon fontSize="small"/></BiggerButton>
                </div>
            </div>
    </section>
    )
}