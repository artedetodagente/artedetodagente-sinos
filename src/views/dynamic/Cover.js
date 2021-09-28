import React from 'react'

export default function Cover({data}){

    return(
      <div className="block-cover">
        <img
          src={`https://admin.sinos.art.br${data.cover.url}`}
          style={{width: '100%', height: 'auto'}}
          alt={``}
        />
      </div>
    )
}