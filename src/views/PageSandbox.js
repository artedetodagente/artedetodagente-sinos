import React, {useState, useEffect} from 'react'
import Page from './Page'

import {DropDown} from '../components/Dropdown'

const DropDownSource = `
<DropDown
  onSelect={(i)=>setTimeout(()=>alert(\`selected \${i}\`,800))}
  options={[
    {title: 'option 1'},
    {title: 'option 2 red  ', color: '#fff', background: '#f00'},
    {title: 'option 3 green', color: '#000', background: '#0f0'},
    {title: 'option 4 blue ', color: '#fff', background: '#00f'},
  ]}
/> 
`


function PageDefault(props) {

  return (
    <Page title="SANDBOX">
      <div className="page-view default-view">

        <h3 className="title-box">Styled components</h3>

        <p>Alguns componente reutilizáveis</p>

        <p>&nbsp;</p>

        <DropDown
          onSelect={(i)=>setTimeout(()=>alert(`selected ${i}`,800))}
          options={[
            {title: 'option 1'},
            {title: 'option 2 red  ', color: '#fff', background: '#f00'},
            {title: 'option 3 green', color: '#000', background: '#0f0'},
            {title: 'option 4 blue ', color: '#fff', background: '#00f'},
          ]}
        />

        <pre style={{padding: '20px', background: '#f9f9f9', fontSize: '75%', marginBottom: '2em'}}>
          {DropDownSource}
        </pre>

      </div>
    </Page>
  );
}

export default PageDefault;
