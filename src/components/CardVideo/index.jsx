import React from 'react';
import PropTypes from 'prop-types';
import { Card, Body } from './styles';
import ReactPlayer from 'react-player';

export default function CardVideo({ data }) {

  return (
    <Card>
      <Body>
        <ReactPlayer 
          url={data.video_url}
          width="100%"
          height="250px"
          controls
          style={{flex: 1}}
        />
        <div>
          <p>{data.autor.nome}</p>
        </div>
      </Body>
    </Card>
  )
};

CardVideo.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.shape(),
    autor: PropTypes.shape()
  }).isRequired,
};