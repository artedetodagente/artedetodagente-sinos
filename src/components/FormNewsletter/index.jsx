import React, { useState } from 'react'
import { Container, Form, Title } from './styles'

function FormNewsletter({ submit }) {
  const [form, setForm] = useState({ email: '' });

  return (
    <Container>
      <Title>Cadastre-se para receber notícias do Um Novo Olhar</Title>
      <Form method="post" onSubmit={(e) => submit(e, form)}>
        <input placeholder="Digite seu email aqui" type="email" name="email" />
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}

export default FormNewsletter;
