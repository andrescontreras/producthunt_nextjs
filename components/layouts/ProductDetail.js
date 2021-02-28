import styled from '@emotion/styled';
import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Link from 'next/link';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

const Product = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
`;

const PDescription = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`;

const Title = styled.a`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  :hover {
    cursor: pointer;
  }
`;

const TextDescription = styled.p`
  font-size: 1.6rem;
  margin: 0;
  color: #888;
`;

const Comments = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: 0.3rem 1rem;
    margin-right: 2rem;
  }
  img {
    width: 2rem;
    margin-right: 2rem;
  }
  p {
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;
    &:last-of-type {
      margin: 0;
    }
  }
`;

const Image = styled.img`
  width: 200px;
`;

const Votes = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid #e1e1e1;
  padding: 1rem 3rem;

  div {
    font-size: 2rem;
  }

  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`;

const ProductDetail = ({ product }) => {
  console.log(product);
  const {
    id,
    comments,
    created,
    company,
    description,
    imageUrl,
    name,
    url,
    votes,
  } = product;
  return (
    <Product>
      <PDescription>
        <div>
          <Image src={imageUrl} />
        </div>
        <div>
          <Link href="/products/[id]" as={`/products/${id}`}>
            <Title>{name}</Title>
          </Link>
          <TextDescription>{description}</TextDescription>
          <Comments>
            <div>
              <img src="/static/img/comentario.png" />
              <p>{comments.length} Comentarios</p>
            </div>
          </Comments>
          <p>Publicado hace: {formatDistanceToNow(new Date(created))}</p>
        </div>
      </PDescription>
      <Votes>
        <div>&#9650;</div>
        <p>{votes}</p>
      </Votes>
    </Product>
  );
};

export default ProductDetail;
