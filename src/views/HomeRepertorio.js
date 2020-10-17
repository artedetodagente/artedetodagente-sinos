import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'
import api from '../services/api'
import CardObra from '../components/CardObra'
import { BiggerButton } from '../components/HomeRepertorioStyles'

import {RedLink} from '../components/CommonStyles'

import { IoIosArrowForward } from 'react-icons/io'

export default function HomeRepertorio({ repertorio, url }){

    const [repertorioObras, setObras] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const response = await api.get('/repertorio-obras')
            setObras(response.data)
        }
        fetchData()
    },[])

    return (
        <>
        <section id={repertorio.id} className={`home-curso full-section curso-${repertorio.id}`}>

            <div className="curso-swiper">
                <SwiperSlide key={`${repertorio.id}-slide-${1}`}>
                    <div className="curso-slide" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(https://admin.sinos.art.br${url})`}}/>
                </SwiperSlide>
            </div>

            <div className="curso-info">
                <div className="col col-1">
                    <div className="title" style={{backgroundColor: repertorio.color}}>{repertorio.title}</div>
                    <div className="content">
                        <div className="text">{repertorio.intro}</div>
                        <RedLink to={`/repertorio-sinos`}>Saiba mais</RedLink>
                </div>
                </div>

                <div className="col col-2">
                    <div className={`title white`}>
                        OBRAS PRESENTES
                    </div>
                        {repertorioObras.map((obra,i)=>{
                            return <Link key={i} to={`/repertorio-sinos/obras/${obra.slug}`} ><CardObra obra={obra} autor={obra.repertorio_autor} /></Link>
                        })}
                    <BiggerButton> <Link to="/repertorio-sinos/obras">ACESSAR TODAS AS OBRAS</Link><IoIosArrowForward/></BiggerButton>
                </div>
            </div>
    </section>
    </>
    )
}