import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Body, Info } from './styles';
import { FiDownload, FiInfo } from "react-icons/fi";
import Axios from 'axios';

export default function CardPhoto({ data }) {
  const image = `https://admin.sinos.art.br${data.image.formats.medium.url}`;
  const [info, setInfo] = useState(false);

  async function download() {
    const res = await Axios.get(image, { responseType: 'blob' });
    const url = window.URL.createObjectURL(res.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = data.image.formats.medium.name;
    a.click();
    a.remove();
  }

  return (
    <Card>
      <Body>
        <figure>
          <img src={image} alt="" />
          <div>
            <figcaption>{data.text}</figcaption>
            <div>
              <button onClick={() => setInfo(!info)}>
                <FiInfo /> 
              </button>
              <button onClick={download}>
                <FiDownload /> 
              </button>
            </div>
          </div>
        </figure>
        <Info className={info && 'show'} show={info}>
          <p>{data.informacao}</p>
        </Info>
      </Body>
    </Card>
  )
};

CardPhoto.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.shape(),
    autor: PropTypes.shape()
  }).isRequired,
};