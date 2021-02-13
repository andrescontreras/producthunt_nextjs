import React from 'react';
import styles from '../styles/Home.module.css';
import styled from '@emotion/styled';
import Layout from '../components/layouts/Layout';
import { Form } from '../components/ui/Form';

const Heading = styled.h1`
  color: red;
`;

export default function CreateAccount() {
  return (
    <div className={styles.container}>
      <Layout>
        <>
          <Heading>Crear cuenta</Heading>
          <Form>
            <div>
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" placeholder="Nombre" name="nombre" />
            </div>
            <div>
              <label htmlFor="email">Correo</label>
              <input type="text" id="email" placeholder="Correo" name="email" />
            </div>

            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                name="password"
              />
            </div>

            <input type="submit" value="Crear cuenta" />
          </Form>
        </>
      </Layout>
    </div>
  );
}
