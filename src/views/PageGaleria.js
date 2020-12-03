import React, { useState, useEffect } from 'react'
import Masonry from 'react-masonry-css';

import api from '../services/api'
import Page from './Page'

import CardPhoto from '../components/CardPhoto'

function PageGaleria(props) {

  const [midias, setMidias] = useState([]);

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get(`/galerias`)
      setMidias(response.data)
      console.log(response.data)
    }
    fetchData()
  },[])

  return (
    <Page title="Galeria">
      <div className="page-view default-view">

      <Masonry
          breakpointCols={{ default: 3, 700: 2, 500: 1 }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {midias.map((item,i) => <CardPhoto key={i} data={item} />)}
        </Masonry>

      </div>
    </Page>
  );
}

export default PageGaleria;
