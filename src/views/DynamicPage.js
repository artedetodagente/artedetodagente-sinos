import React from 'react'

import Block from './Block'
import Cover from './Cover'
import YouEmbed from './YouEmbed'

const DynamicPage = (props) => {

    const blocks = {
        'pages.block': Block,
        'pages.cover': Cover,
        'pages.embed': YouEmbed
    }

    const type = props.data["__component"]

    if(type && type in blocks){
        const MyBlock = blocks[type]
        return <MyBlock data={props.data}/>
    }
}

export default DynamicPage