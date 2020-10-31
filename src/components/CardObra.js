import React from 'react'
import { P, SmallBox, Container, Span, Content } from './CardObraStyles'

export default function CardObra({ obra }) {

    return (
        <>
        <Container>
            <P primary>
                CONCERTO: {`${obra.id}º`}
            </P>
            <P>
                {obra.title}
            </P>
        </Container>
        </>
    )
}