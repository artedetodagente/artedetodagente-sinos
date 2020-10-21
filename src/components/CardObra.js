import React from 'react'
import { P, SmallBox, Container, Span, Content } from './CardObraStyles'

export default function CardObra({ obra, autors }) {

    return (
        <>
        <Container>
            <P primary>
                AUTORES:
                {
                    autors.map((autor,i) => <span key={i} style={{marginLeft: '0.5vh'}} >{autor.nome};</span>)
                }
            </P>
            <P>
                {obra.title}
            </P>
            <SmallBox>
                INSTRUMENTAÇÃO: 
                {
                    obra.repertorio_instrumentos.map((instrumento,i) => <span key={i} style={{marginLeft: '0.5vh'}}>{instrumento.title};</span>)
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