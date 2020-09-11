import React, { useState } from 'react'

export default function Block({data}){

    const [slider, setSlider] = useState(data.Slider)

    return(
        <div style={{marginTop: '10vh'}}>
            <h2 style={{marginBottom: '2vh'}}>{data.title}</h2>
            <div id="box-div" style={
                {display: data.grid ? 'grid' : 'block'}, 
                {gridTemplateColumns: '1fr 1fr 1fr'}
                }>
                {slider.map(slide=>
                    <a href={slide.Link}><img style={{marginBottom: '10vh'}} src={`https://admin.sinos.art.br${slide.Picture.url}`} alt={slide.Caption ? slide.Caption : null}/></a>
                )}
            </div>
        </div>
    )
}