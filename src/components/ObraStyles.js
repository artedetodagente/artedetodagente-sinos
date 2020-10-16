import styled from 'styled-components'

const ObrasContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    margin-top: 5vh;

    @media (max-width: 768px) {
        display: block;
    }
`

const ObraContainer = styled.div`
    display: block;
`

const Title = styled.span`
    background-color: gray;
    text-align: left;
    padding: 8px;
`

export { ObrasContainer, ObraContainer, Title }