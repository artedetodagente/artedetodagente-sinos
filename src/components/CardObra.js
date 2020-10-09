import React from 'react'
import { P, SmallBox, Container, Span, Content } from './CardObraStyles'

export default function CardObra({ obra, autor }) {

    return (
        <>
        <Container>
            <P primary>
                {autor.nome.toUpperCase()}
            </P>
            <P>
                {obra.title}
            </P>
            <SmallBox>
                INSTRUMENTAÇÃO: 
                {
                    obra.Instrumentos.map((instrumento,i) => <span key={i} style={{marginLeft: '0.5vh'}}>{instrumento.title};</span>)
                }
            </SmallBox>
            <Content>
                <Span first> TEMPO: {obra.minutagem} </Span>
                <Span> NÍVEL TÉCNICO: {obra.dificuldade} </Span>
            </Content>
        </Container>
        </>
    )
}