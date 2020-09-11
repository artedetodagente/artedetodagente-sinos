import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import parse from 'html-react-parser'
import md from '../util/parsemd'

import Page from './Page'

import api from '../services/api'

import DynamicPage from './DynamicPage'

function PageDefault(props) {

  const [page, setPage] = useState([])
  const [text, setText] = useState('')
  const [content, setcontent] = useState([])
  const {id} = useParams()

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get(`/page-builders/${id}`)
      setPage(response.data)
      setcontent(response.data.Content)
      setText(response.data.page_text)
    }
    fetchData()
  },[id])

  return (
    <Page title={page.page_title}>
      <div className="page-view default-view">
        {parse(md(text))}
      </div>
      <div className="page-zones">
        {content.map( component => <DynamicPage data={component}/>)}
      </div>
    </Page>
  );
}

export default PageDefault;
