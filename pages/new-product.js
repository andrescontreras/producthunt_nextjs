import React, { useState, useContext } from 'react';
import { css } from '@emotion/react';
import styles from '../styles/Home.module.css';
import styled from '@emotion/styled';
import Layout from '../components/layouts/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';
import Router, { useRouter } from 'next/router';

import useValidation from '../hooks/useValidation';
import validateCreateAccount from '../validation/validateCreateProduct';
import FileUploader from 'react-firebase-file-uploader';

import firebase from 'firebase';
import { FirebaseContext } from '../firebase';

export default function NewProduct() {
  {
    const initialState = {
      name: '',
      company: '',
      imageUrl: '',
      url: '',
      description: '',
    };

    const [imageName, saveImageName] = useState('');
    const [uploading, saveUploading] = useState(false);
    const [progress, saveProgress] = useState(0);
    const [imageUrl, saveImageUrl] = useState('');

    const router = useRouter();

    const { user, firebase } = useContext(FirebaseContext);

    const [error, saveError] = useState(false);

    const handleUploadStart = () => {
      saveProgress(0);
      saveUploading(true);
    };

    const handleProgress = (progress) => saveProgress({ progress });

    const handleUploadError = (error) => {
      saveUploading(error);
      console.log(error);
    };

    const handleUploadSuccess = (filename) => {
      console.log('***', filename);
      saveProgress(100);
      saveUploading(false);
      saveImageName(filename);

      firebase.storage
        .ref('products')
        .child(filename)
        .getDownloadURL()
        .then((url) => {
          saveImageUrl(url);
          console.log(url);
        });
    };

    const createProduct = async () => {
      if (!user) {
        return router.push('/login');
      }

      const product = {
        name,
        company,
        imageUrl,
        url,
        description,
        votes: 0,
        comments: [],
        created: Date.now(),
      };

      firebase.db.collection('Products').add(product);
      return router.push('/');
    };

    const {
      values,
      errors,
      submitForm,
      handleSubmit,
      handleChange,
      handleBlur,
    } = useValidation(initialState, validateCreateAccount, createProduct);

    const { name, company, image, url, description } = values;

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
              Nuevo Producto
            </h1>
            <Form onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend>Informacion General</legend>

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
                  <label htmlFor="company">Empresa</label>
                  <input
                    type="text"
                    id="company"
                    placeholder="Empresa"
                    name="company"
                    value={company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                {errors.company && <Error>{errors.company}</Error>}
                <Field>
                  <label htmlFor="imagep">Imagen</label>
                  <FileUploader
                    accept="image/*"
                    name="imagep"
                    randomizeFilename
                    storageRef={firebase.storage.ref('products')}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
                </Field>
                <Field>
                  <label htmlFor="url">URL</label>
                  <input
                    type="text"
                    id="url"
                    placeholder="URL"
                    name="url"
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                {errors.url && <Error>{errors.url}</Error>}
              </fieldset>
              <fieldset>
                <legend>Sobre tu producto</legend>
                <Field>
                  <label htmlFor="description">Descripción</label>
                  <textarea
                    id="description"
                    placeholder="Descripción"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                {errors.description && <Error>{errors.description}</Error>}
              </fieldset>

              {error && <Error>{error}</Error>}
              <InputSubmit type="submit" value="Crear producto" />
            </Form>
          </>
        </Layout>
      </div>
    );
  }
}
