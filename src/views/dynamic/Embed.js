import React from 'react'
import YouEmbed from '../../components/YouEmbed'

export default function Embed({data}){
    return(
      <YouEmbed url={data.video_url} />
    )
}