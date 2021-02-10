import React from 'react';
import Search from '../ui/Search';
import Navigation from './Navigation';
import Link from 'next/link';
const Header = () => {
  return (
    <header>
      <div>
        <div>
          <p>P</p>
          <Search></Search>
          <Navigation />
        </div>
        <div>
          <p>Hola Andres</p>
          <button type="button">Cerrar sesión</button>
          <Link href="/">Login</Link>
          <Link href="/">Crear cuenta</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
