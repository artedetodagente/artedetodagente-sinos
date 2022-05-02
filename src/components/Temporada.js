import React from 'react';
import { Link } from "react-router-dom";
import CardConcerto from './CardConcerto';
//import { Container } from './CardObraStyles';
import { ObrasContainer } from './ObraStyles'
import { TemporadaContainer } from './TemporadaStyles';

export default function Temporada({ temporada, concertos }) {
  return (
    <TemporadaContainer>
      <p>Temporada {temporada}</p>
      <ObrasContainer>
        {
          concertos.map((concerto, i) => {
            return (
              <Link to={`/concertos-sinos/${concerto.slug}`} key={i}>
                <CardConcerto concerto={concerto} />
              </Link>
            )
          })
        }
      </ObrasContainer>
    </TemporadaContainer>
  )
};
