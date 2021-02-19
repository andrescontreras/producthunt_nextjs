import React, { useState } from 'react';
import { css } from '@emotion/react';
import styles from '../styles/Home.module.css';
import styled from '@emotion/styled';
import Layout from '../components/layouts/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';
import Router from 'next/router';

import useValidation from '../hooks/useValidation';
import validateLogin from '../validation/validateLogin';

import firebase from '../firebase';

const Heading = styled.h1`
  color: red;
`;

export default function CreateAccount() {
  const initialState = {
    email: '',
    password: '',
  };

  const [error, saveError] = useState(false);

  const login = async () => {
    console.log('iniciando sesion');
    try {
      const user = await firebase.login(email, password);
      console.log(user);
      Router.push('/');
    } catch (error) {
      console.error(error);
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
  } = useValidation(initialState, validateLogin, login);

  const { email, password } = values;

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
            Iniciar Sesión
          </h1>
          <Form onSubmit={handleSubmit} noValidate>
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
            <InputSubmit type="submit" value="Iniciar Sesión" />
          </Form>
        </>
      </Layout>
    </div>
  );
}
