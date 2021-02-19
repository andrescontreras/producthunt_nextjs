import App from 'next/app';
import firebase, { FirebaseContext } from '../firebase';
import useAuth from '../hooks/useAuth';

const MyApp = (props) => {
  const { Component, PageProps } = props;
  const user = useAuth();
  console.log(user);

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        user,
      }}
    >
      <Component {...PageProps} />
    </FirebaseContext.Provider>
  );
};

export default MyApp;
