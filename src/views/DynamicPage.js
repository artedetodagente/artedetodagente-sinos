import React from 'react'

import Block from './dynamic/Block'
import Cover from './dynamic/Cover'
import Embed from './dynamic/Embed'

const DynamicPage = (props) => {

    const blocks = {
        'pages.block': Block,
        'pages.cover': Cover,
        'pages.embed': Embed
    }

    const type = props.data["__component"]

    if(type && type in blocks){
        const MyBlock = blocks[type]
        return <MyBlock data={props.data}/>
    }
}

export default DynamicPage