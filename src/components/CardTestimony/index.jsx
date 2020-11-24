import React from 'react';
import PropTypes from 'prop-types';
import { Card, Header, Body } from './styles';

export default function CardTestimony({ data }) {
  return (
    <Card>
      <Header>
        <figure>
          <img src={`https://admin.bossacriativa.art.br${data.image.url}`} alt=""/>
        </figure>
        <h1>{data.autor.nome}</h1>
      </Header>
      <Body>
        <p>{data.text}</p>
      </Body>
    </Card>
  )
};

CardTestimony.propTypes = {
  data: PropTypes.shape({
    autor: PropTypes.shape(),
    text: PropTypes.string.isRequired
  }).isRequired
};