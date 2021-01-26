import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import CardConcerto from "../components/CardConcerto";
import { BiggerButton } from "../components/HomeRepertorioStyles";
import { P, Container } from '../components/CardObraStyles';
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import api from '../services/api'

export default function HomeRevista({ publicacoes, url }) {

  const [revista, setRevista] = useState({});
  const [cover, setCover] = useState({});

  const fetchData = async () => {
    try {
      const response = await api.get('/revista-sinos');
      
      setRevista(response.data);
      setCover(response.data.cover)
      
    } catch (error) {

      return error;
    }
  }

  useEffect(()=> {
    fetchData();
  },[]);

  return (
    <section
      id="Publicacoes-Sinos"
      className={`home-curso full-section curso-${1}`}
    >
      <div className="curso-swiper">
        <SwiperSlide key={`${1}-slide-${1}`}>
          <div
            className="curso-slide"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(https://admin.sinos.art.br${cover.url})`,
            }}
          />
        </SwiperSlide>
      </div>

      <div className="curso-info">
        <div className="col col-1">
          <div className="title" style={{ backgroundColor: "rgb(139, 199, 59)" }}>
          {revista.title}
          </div>
          <div className="content">
            <div className="text">{revista.description}</div>
          </div>
        </div>

        <div className="col col-2">
          <div className={`title white`}>PUBLICAÇÕES SINOS</div>
          {publicacoes.length > 0 ? 
            publicacoes.map((publicacao, i)=>{
              return (
                <Link to={`/revista-sinos/${publicacao.id}`} key={publicacao.id}>
                  <Container>
                      <P primary>
                        {publicacao.title}
                      </P>
                      <P>
                        {publicacao.edition}
                      </P>
                  </Container>
                </Link>
              )
            }) : null  
          }
          
            
          {/*<BiggerButton>
            {" "}
            <Link to="/concertos-sinos">ACESSAR TODOS OS CONCERTOS </Link>
            <ArrowForwardIosIcon  fontSize="small" />
          </BiggerButton>*/}
        </div>
      </div>
    </section>
  );
}
