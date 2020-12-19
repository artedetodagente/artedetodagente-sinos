import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import api from "../services/api";
import CardConcerto from "../components/CardConcerto";
import { BiggerButton } from "../components/HomeRepertorioStyles";
import { P, Container } from '../components/CardObraStyles';
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default function HomeRevista({ concertoSinos, url }) {
  const revista = {
      id: 1,
      title: "Revista Sinos",
      date: "18/12/2020"
  }

  return (
    <section
      id="Concertos-Sinos"
      className={`home-curso full-section curso-${1}`}
    >
      <div className="curso-swiper">
        <SwiperSlide key={`${1}-slide-${1}`}>
          <div
            className="curso-slide"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(https://admin.sinos.art.br/uploads/5_musicalidadefotowaldamarques_4c4f1e7fbe.jpg)`,
            }}
          />
        </SwiperSlide>
      </div>

      <div className="curso-info">
        <div className="col col-1">
          <div className="title" style={{ backgroundColor: "rgb(139, 199, 59)" }}>
          PUBLICAÇÕES SINOS
          </div>
          <div className="content">
            <div className="text">As Publicações SINOS abrangem diferentes produtos. São cadernos pedagógicos, apostilas e livros que abordam conteúdos especificos para apoio às aulas de música. Já a Revista SINOS é o período que promove a discussão sobre temas relevantes ligados ao mundo das orquestras e da educação musical, além de ser o veiculo para a divulgação das atividades dos projetos socias.</div>
          </div>
        </div>

        <div className="col col-2">
          <div className={`title white`}>PUBLICAÇÕES SINOS</div>
            <Link to="/revista-sinos/1">
                <Container>
                    <P primary>
                      Revista Sinos 2020
                    </P>
                    <P>
                      1ª Edição
                    </P>
                </Container>
            </Link>
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
