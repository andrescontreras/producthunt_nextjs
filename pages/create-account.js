import React from 'react';
import { css } from '@emotion/react';
import styles from '../styles/Home.module.css';
import styled from '@emotion/styled';
import Layout from '../components/layouts/Layout';
import { Form, Field, InputSubmit } from '../components/ui/Form';

import useValidation from '../hooks/useValidation';
import validateCreateAccount from '../validation/validateCreateAccount';

const Heading = styled.h1`
  color: red;
`;

export default function CreateAccount() {
  const initialState = {
    name: '',
    email: '',
    password: '',
  };

  const createAccount = () => {
    console.log('Creando cuenta');
  };

  const {
    values,
    errors,
    submitForm,
    handleSubmit,
    handleChange,
  } = useValidation(initialState, validateCreateAccount, createAccount);

  const { name, email, password } = values;

  return (
    <div className={styles.container}>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Crear cuenta
          </h1>
          <Form onSubmit={handleSubmit} noValidate>
            <Field>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                placeholder="Nombre"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <label htmlFor="email">Correo</label>
              <input
                type="text"
                id="email"
                placeholder="Correo"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Field>

            <InputSubmit type="submit" value="Crear cuenta" />
          </Form>
        </>
      </Layout>
    </div>
  );
}
