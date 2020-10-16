import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'
import api from '../services/api'
import CardObra from '../components/CardObra'
import { Button, BiggerButton } from '../components/HomeRepertorioStyles'

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
                    <div className="text" style={{height: '54vh'}}>
                        <p style={{marginBottom: '6vh'}}>{repertorio.intro}</p>
                        <Button><Link to={'/repertorio-sinos'}>SAIBA MAIS</Link></Button>   
                    </div>
                </div>

                <div className="col col-2">
                    <div className={`title white`}>
                        OBRAS PRESENTES
                    </div>
                        {repertorioObras.map((obra,i)=>{
                            return <CardObra obra={obra} key={i} autor={obra.repertorio_autor} />
                        })}
                    <BiggerButton> <Link to="/repertorio-sinos/obras">ACESSAR TODAS AS OBRAS</Link><IoIosArrowForward/></BiggerButton>
                </div>
            </div>
    </section>
    </>
    )
}