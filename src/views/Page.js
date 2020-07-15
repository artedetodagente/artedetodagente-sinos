import React from 'react'
import {useParams} from "react-router-dom"
import parse from 'html-react-parser'

import store from '../store'
import PageDefault from './PageDefault'


function Page(props) {

  const {id} = useParams()
  const {pages} = store

  const content = pages[id] || pages[404]

  return (
    <PageDefault title={content.title}>
      {parse(content.fulltext.split("\n").join("<br/>"))}
    </PageDefault>
  );
}

export default Page;
