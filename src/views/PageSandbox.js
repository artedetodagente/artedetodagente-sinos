import React from 'react'
import Page from './Page'

import {DropDown} from '../components/Dropdown'
import {Code} from '../components/CommonStyles'

const DropDownSource =
`<DropDown
  onSelect={(i)=>setTimeout(()=>alert(\`selected \${i}\`,800))}
  options={[
    {title: 'option 1'},
    {title: 'option 2 red  ', color: '#fff', background: '#f00'},
    {title: 'option 3 green', color: '#000', background: '#0f0'},
    {title: 'option 4 blue ', color: '#fff', background: '#00f'},
  ]}
/>`


function PageDefault(props) {

  return (
    <Page title="SANDBOX">
      <div className="page-view default-view">

        <h3 className="title-box">Styled components</h3>

        <p>Alguns componentes reutilizáveis</p>

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

        <Code>
          {DropDownSource}
        </Code>

      </div>
    </Page>
  );
}

export default PageDefault;
