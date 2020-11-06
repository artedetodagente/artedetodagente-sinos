import React from 'react'

import { P, SmallBox, Container, Span, Content } from './CardObraStyles'

export default function CardObra({ obra, autors, instrumentos }) {
    return (
        <Container>
            <P primary>
                {
                    autors.map((autor, i) => {
                        return <span> {autor.nome};</span>
                    })
                }
            </P>
            <P>
                {obra.title}
            </P>
            <SmallBox>
                INSTRUMENTAÇÃO: {instrumentos.map((instrumento, i)=> ` ${instrumento.title};`)}
            </SmallBox>
            <Content >
                <Span first>TEMPO: {obra.minutagem}</Span>
                <Span>DIFICULDADE: {obra.dificuldade}</Span>
            </Content>
        </Container>
    )
}