import React from 'react'
import Page from './Page'

import {DropDown} from '../components/Dropdown'
import {
  Code,
  Section,
  RedLink,
  AccessLink
} from '../components/CommonStyles'

const DropDownSource =
`// import {DropDown} from '../components/Dropdown'
<DropDown
  placeholder="Selecione um item"
  onSelect={(i)=>console.log(\`selected \${i}\`)}
  options={[
    {title: 'option 1'},
    {title: 'option 2 red  ', color: '#fff', background: '#f00'},
    {title: 'option 3 green', color: '#000', background: '#0f0'},
    {title: 'option 4 blue ', color: '#fff', background: '#00f'},
  ]}
/>`

const RedLinkSource = 
`// import {RedLink} from '../components/CommonStyles'
<RedLink to="/">Voltar para a HOME</RedLink>`

const AccessLinkSource = `<AccessLink title="Atalho para a homepage" url="/" />`

function PageDefault(props) {

  return (
    <Page title="SANDBOX">
      <div className="page-view default-view">

        <Section>
          <h3 className="title-box">DropDown</h3>
          <p>DropDown padrão do SINOS</p>
          <p>&nbsp;</p>
          <DropDown
            placeholder="Selecione um item"
            onSelect={(i)=>console.log(`selected ${i}`)}
            options={[
              {title: 'option 1'},
              {title: 'option 2 red  ', color: '#fff', background: '#f00'},
              {title: 'option 3 green', color: '#000', background: '#0f0'},
              {title: 'option 4 blue ', color: '#fff', background: '#00f'},
            ]}
          />
          <Code>{DropDownSource}</Code>
        </Section>
        
        <Section>
          <h3 className="title-box">RedLink</h3>
          <p>Extensão do react-router-hash-link</p>
          <p>&nbsp;</p>
          <RedLink to="/">Voltar para a HOME</RedLink>
          <Code>{RedLinkSource}</Code>
        </Section>

        <Section>
          <h3 className="title-box">AccessLink</h3>
          <p>Extensão do react-router-hash-link</p>
          <p>&nbsp;</p>
          <AccessLink title="Atalho para a homepage" url="/" />
          <Code>{AccessLinkSource}</Code>
        </Section>

      </div>
    </Page>
  );
}

export default PageDefault;
