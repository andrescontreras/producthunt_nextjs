import styles from '../styles/Home.module.css';
import styled from '@emotion/styled';
import Layout from '../components/layouts/Layout';

const Heading = styled.h1`
  color: red;
`;

export default function Popular() {
  return (
    <div className={styles.container}>
      <Layout>
        <Heading>Populares</Heading>
      </Layout>
    </div>
  );
}
