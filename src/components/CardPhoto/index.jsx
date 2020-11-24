import React from 'react';
import PropTypes from 'prop-types';
import { Card, Body } from './styles';
import { FiDownload } from "react-icons/fi";
import Axios from 'axios';

export default function CardPhoto({ data }) {
  const image = `https://admin.sinos.art.br${data.image.formats.medium.url}`;

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
            <figcaption>
              {/* {`Foto por: ${data.autor.nome}`} */}
            </figcaption>
            <button onClick={download}>
              <FiDownload /> 
            </button>
          </div>
        </figure>
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