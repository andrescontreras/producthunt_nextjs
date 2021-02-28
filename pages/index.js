import React, { useEffect, useState, useContext } from 'react';
import styles from '../styles/Home.module.css';
import styled from '@emotion/styled';
import Layout from '../components/layouts/Layout';
import ProductDetail from '../components/layouts/ProductDetail';

import { FirebaseContext } from '../firebase';

const Heading = styled.h1`
  color: red;
`;

export default function Home() {
  const [products, saveProducts] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const getProducts = () => {
      firebase.db
        .collection('Products')
        .orderBy('created', 'desc')
        .onSnapshot(handleSnapShot);
    };
    getProducts();
  }, []);

  function handleSnapShot(snapshot) {
    const products = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    saveProducts(products);
    console.log(products);
  }

  return (
    <div className={styles.container}>
      <Layout>
        <div className="list-products">
          <div className="container">
            <ul className="bg-white">
              {products.map((product) => (
                <ProductDetail key={product.id} product={product} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
}
