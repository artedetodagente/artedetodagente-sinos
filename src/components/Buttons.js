import styled from 'styled-components'
import tw from 'tailwind.macro'
import { HashLink as Link } from 'react-router-hash-link'

export const RedLink = styled(Link)`
  ${tw`no-underline text-white px-4 py-2 inline-block uppercase leading-none`}
  background: #d4423b;
  &:hover {
    @apply bg-black;
  }
`