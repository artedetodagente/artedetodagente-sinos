import React from 'react'
import { P, Container } from './CardObraStyles'

export default function CardConcerto({ concerto }) {

    return (
        
        <Container>
            <P primary>
                {concerto.concerto_name}
            </P>
            <P>
                {concerto.title}
            </P>
        </Container>
        
    )
}