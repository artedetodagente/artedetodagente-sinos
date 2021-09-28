import React from 'react'
import styled from 'styled-components'
import tw from 'tailwind.macro'

import {
  DynamicBlock,
  TitleBox
} from './Dynamic.Styles'

const BlockSlider = styled.div`
  ${tw`p-4 flex flex-wrap justify-center`}
  .dynamic-block-slider-item {
    ${tw`m-4`}
    a {
      ${tw`block flex items-center h-full`}
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
      <DynamicBlock>
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
      </DynamicBlock>
    )
}