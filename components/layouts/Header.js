import React, { useContext } from 'react';
import Search from '../ui/Search';
import Navigation from './Navigation';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Button from '../ui/Button';
import { FirebaseContext } from '../../firebase';

const HeaderContent = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--orange);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: 'Roboto Slab', serif;
  margin-right: 2rem;
`;

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);

  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gray3);
        padding: 1rem 0;
      `}
    >
      <HeaderContent>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href="/">
            <Logo>P</Logo>
          </Link>

          <Search></Search>
          <Navigation />
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {user ? (
            <>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                Hola {user.displayName}
              </p>
              <Button type="button" onClick={() => firebase.logout()}>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button bgColor="true">Login</Button>
              </Link>
              <Link href="/">
                <Button>Crear cuenta </Button>
              </Link>
            </>
          )}
        </div>
      </HeaderContent>
    </header>
  );
};

export default Header;
