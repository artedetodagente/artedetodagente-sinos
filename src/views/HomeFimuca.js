import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import api from "../services/api";
import CardConcerto from "../components/CardConcerto";
import { BiggerButton } from "../components/HomeRepertorioStyles";
import { P } from "../components/CardObraStyles";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default function HomeFimuca() {
  const [fimuca, setFimuca] = useState([]);
  const [url, setUrl] = useState('');
  const [edicoes, setEdicoes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/fimuca");
      const responseEdicoes = await api.get("/fimuca-edicoes")
      setFimuca(response.data);
      setUrl(response.data.cover.url);
      setEdicoes(responseEdicoes.data);
    }
    fetchData();
  }, []);
  
  return (
    <section
      id="Fimuca-Sinos"
      className={`home-curso full-section curso-${fimuca.id}`}
    >
      <div className="curso-swiper">
        <SwiperSlide key={`${fimuca.id}-slide-${1}`}>
          <div
            className="curso-slide"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(https://admin.sinos.art.br${url})`,
            }}
          />
        </SwiperSlide>
      </div>

      <div className="curso-info">
        <div className="col col-1">
          <div className="title" style={{ backgroundColor: "#255378" }}>
            FIMUCA
          </div>
          <div className="content">
            <div className="text">{fimuca.intro}</div>
          </div>
        </div>

        <div className="col col-2">
          <div className={`title white`}>FIMUCA SINOS</div>
          {edicoes.map((edicao, i) => {
            return (
              <Link key={i} to={`/fimuca/${edicao.slug}`}>
                  <P primary>{edicao.title}</P>
                  <P>{edicao.edicao}</P>
              </Link>
            );
          })}
          {/*<BiggerButton>
            {" "}
            <Link to="/concertos-sinos">ACESSAR TODAS AS OBRAS</Link>
            <ArrowForwardIosIcon  fontSize="small" />
          </BiggerButton>*/}
        </div>
      </div>
    </section>
  );
}
