import React from 'react'

export default function Cover({ data}){

    return(
        <div>
            <img src={`https://admin.sinos.art.br${data.cover.url}`}/>
        </div>
    )
}