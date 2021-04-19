import React, {useState, useEffect} from 'react'
import parse from 'html-react-parser'
import md from '../util/parsemd'
import Page from './Page'
import api from '../services/api'
import DynamicPage from './DynamicPage'
import Button from '../components/Button'

function PageProject(props) {

  const [page, setPage] = useState([])
  const [text, setText] = useState('')
  const [content, setcontent] = useState([])
  const [id, setId] = useState('projeto')

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
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 25 }}>
          <div style={{ marginRight: 15 }}>
            <Button
              text="Sobre o Projeto"
              click={() => setId('projeto')}
            />
          </div>
          <div>
            <Button
              text="Ficha Institucional"
              click={() => setId('projeto-ficha')}
            />
          </div>
        </div>
        {parse(md(text))}
        <div className="page-zones">
          {content.map((component,i) => <DynamicPage key={i} data={component}/>)}
        </div>
      </div>
      
    </Page>
  );
}

export default PageProject;
