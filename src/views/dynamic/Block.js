import React from 'react'
import styled from 'styled-components'
import tw from 'tailwind.macro'

const TitleBox = styled.h1`
  ${tw`p-4 bg-black text-white uppercase text-2xl`}
`

const BlockSlider = styled.div`
  ${tw`p-4 flex flex-wrap justify-center`}
  .dynamic-block-slider-item {
    ${tw`m-4`}
    a {
      @apply block;
      img {
        max-height: 128px;
        max-width: 256px;
        width: auto;
      }
    }
  }
`

export default function Block({data}){
    return(
      <div className="dynamic-block">
        <TitleBox>{data.title}</TitleBox>
        <BlockSlider>
          {data.Slider && data.Slider.map((slide,i)=>{
            return (
              <div key={i} className="dynamic-block-slider-item">
                <a
                  href={slide.Link}
                  title={slide.Caption}
                  rel="noopener noreferrer"
                  target="_blank"
                  >
                    <img
                      src={`https://admin.sinos.art.br${slide.Picture.url}`}
                      alt={slide.Caption ? slide.Caption : null}/>
                </a>
              </div>
            )
          })}
        </BlockSlider>
      </div>
    )
}