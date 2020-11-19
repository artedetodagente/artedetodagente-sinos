import styled from 'styled-components'

const Button = styled.button`
    background-color: red;
    font-size: 1.25em;
    color: white;
    padding: 8px;
`
const BiggerButton = styled(Button)`
    margin-top: 1vh;
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
`

export { Button, BiggerButton }