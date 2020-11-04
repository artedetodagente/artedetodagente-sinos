import React from 'react'
import { P, Container } from './CardObraStyles'

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