import React from 'react'
import { P, SmallBox, Container, Span, Content } from './CardObraStyles'

export default function CardObra({ obra, autors }) {

    return (
        <>
        <Container>
            <P primary>
                CONCERTO: N{`${obra.id}º`}
            </P>
            <P>
                {obra.title}
            </P>
        </Container>
        </>
    )
}