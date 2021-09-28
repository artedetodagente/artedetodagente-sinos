import styled from 'styled-components'

const P = styled.p`
    background-color: ${props=>props.primary ? "red": "#d0cece"};
    color: ${props=> props.primary ? "white": "black"};
    font-size: 1em;
    padding: 0.25em 1em;
`

const SmallBox = styled(P)`
    background-color: #e6e6e6;
    min-height: 56px;
`
const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-top: 1vh;
`
const Span = styled.span`
    background-color: #4c4c4c;
    color: white;
    padding: 0.25em 1em;
    margin-right: 0;
`
const Container = styled.div`
    margin-top: 1.3vh;
`

export { P, SmallBox, Container, Span, Content }