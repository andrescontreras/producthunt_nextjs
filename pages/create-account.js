import React, { useState } from 'react';
import { css } from '@emotion/react';
import styles from '../styles/Home.module.css';
import styled from '@emotion/styled';
import Layout from '../components/layouts/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';
import Router from 'next/router';

import useValidation from '../hooks/useValidation';
import validateCreateAccount from '../validation/validateCreateAccount';

import firebase from '../firebase';

const Heading = styled.h1`
  color: red;
`;

export default function CreateAccount() {
  const initialState = {
    name: '',
    email: '',
    password: '',
  };

  const [error, saveError] = useState(false);

  const createAccount = async () => {
    try {
      console.log('Creando cuenta');
      await firebase.register(name, email, password);
      Router.push('/');
    } catch (error) {
      console.log(Error);
      saveError(error.message);
    }
  };

  const {
    values,
    errors,
    submitForm,
    handleSubmit,
    handleChange,
    handleBlur,
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
                onBlur={handleBlur}
              />
            </Field>
            {errors.name && <Error>{errors.name}</Error>}
            <Field>
              <label htmlFor="email">Correo</label>
              <input
                type="text"
                id="email"
                placeholder="Correo"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.email && <Error>{errors.email}</Error>}
            <Field>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.password && <Error>{errors.password}</Error>}
            {error && <Error>{error}</Error>}
            <InputSubmit type="submit" value="Crear cuenta" />
          </Form>
        </>
      </Layout>
    </div>
  );
}
