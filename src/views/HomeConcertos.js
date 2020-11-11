import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import api from "../services/api";
import CardConcerto from "../components/CardConcerto";
import { BiggerButton } from "../components/HomeRepertorioStyles";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default function ConcertosSinos({ concertoSinos, url }) {
  const [concertos, setConcertos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/concertos");
      setConcertos(response.data);
    }
    fetchData();
  }, []);

  return (
    <section
      id="Concertos-Sinos"
      className={`home-curso full-section curso-${concertos.id}`}
    >
      <div className="curso-swiper">
        <SwiperSlide key={`${concertoSinos.id}-slide-${1}`}>
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
            CONCERTOS SINOS
          </div>
          <div className="content">
            <div className="text">{concertoSinos.intro}</div>
          </div>
        </div>

        <div className="col col-2">
          <div className={`title white`}>CONCERTOS PRESENTES</div>
          {concertos.slice(0, 3).map((concerto, i) => {
            return (
              <Link key={i} to={`/concertos-sinos/${concerto.slug}`}>
                <CardConcerto concerto={concerto} />
              </Link>
            );
          })}
          <BiggerButton>
            {" "}
            <Link to="/concertos-sinos">ACESSAR TODOS OS CONCERTOS </Link>
            <ArrowForwardIosIcon />
          </BiggerButton>
        </div>
      </div>
    </section>
  );
}
