import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

function useAuth() {
  const [authenticatedUser, saveauthenticatedUser] = useState(null);

  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        saveauthenticatedUser(user);
      } else {
        saveauthenticatedUser(null);
      }
    });

    return () => unsuscribe();
  }, []);

  return authenticatedUser;
}

export default useAuth;
