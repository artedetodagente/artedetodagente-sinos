import React, { useState } from 'react'
import { Container, Form, Title } from './styles'

function FormNewsletter({ submit }) {
  const [form, setForm] = useState({ email: '' });

  return (
    <Container>
      <Title>Cadastre-se para receber notícias do Um Novo Olhar</Title>
      <Form method="post">
        <input placeholder="Digite seu email aqui" type="email" name="email" />
        <button type="button" onClick={(e) => submit(e, form)}>Cadastrar</button>
      </Form>
    </Container>
  );
}

export default FormNewsletter;
