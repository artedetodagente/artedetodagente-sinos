import React from 'react'
import styled from 'styled-components'
import tw from 'tailwind.macro'

import { HashLink as Link } from 'react-router-hash-link'

const colors = {
  red: '#d4423b'
}

export const RedLink = styled(Link)`
  ${tw`no-underline text-white px-4 py-2 inline-block uppercase leading-none`}
  background: ${colors.red};
  &:hover {
    background: #222;
  }
`
const AccessLinkStyle = styled.div`
  ${tw`flex mb-2 uppercase text-sm md:text-base`}
  .access-title {
    ${tw`bg-white px-4 py-2`}
    background: #f9f9f9;
  }
  .access-link {
    a {
      ${tw`px-4 py-2 inline-block`}
      background-color: ${colors.red};
      color: white;
      &:hover {
        background-color: #222;
      }
    }
  }
`

export const AccessLink = function({title,url}) {
  return (
    <AccessLinkStyle>
      <div className="access-title">{title}</div>
      <div className="access-link">
        <Link to={url}>Acessar &raquo;</Link>
      </div>
    </AccessLinkStyle>
  )
}

// SANDBOX

export const Code = styled.pre`
  ${tw`my-4`}
  padding: 20px;
  background: #f9f9f9;
  font-size: 12px;
  overflow: auto;
`
export const Section = styled.section`
  ${tw`mb-8`}
`