import styled from 'styled-components'

const P = styled.p`
    background-color: ${props=>props.primary ? "red": "white"};
    color: ${props=> props.primary ? "white": "black"};
    font-size: 1em;
    padding: 0.25em 1em;
`

const SmallBox = styled(P)`
    background-color: gray;
`
const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-top: 1vh;
`
const Span = styled.span`
    background-color: gray;
    color: white;
    padding: 0.25em 1em;
    margin-right: ${props=> props.first ? '0.5vh' : '0'};
`
const Container = styled.div`
    margin-top: 1.3vh;
`

export { P, SmallBox, Container, Span, Content }