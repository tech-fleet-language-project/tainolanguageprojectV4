/**
 * @format
 * @param {string} email - email of user
 * @param {string} password - password of user
 * @returns {JSX.function}
 * @class
 */

import React, {useCallback, useEffect, useState} from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  ProviderId,
  AuthErrorCodes,
  UserCredential,
} from 'firebase/auth';
import {auth} from './firebase.init';
import Alert from 'react-native';
import {FirebaseError} from 'firebase/app';
import next from 'next';

// TODO: code may need to be normalized
// TODO: use firebase admin library after creating server for app after revising file structure for server

export default class firebaseAuth extends React.Component {
  // sign up new user
  handleSignupFirebase = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        return userCredential;
        // pass data to database: implement function in other file SOC
      })
      .catch(error => {
        if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
          console.error('Email is already in use!');
          // error message and feedback to user
        } else if (error.code === AuthErrorCodes.INVALID_EMAIL) {
          console.error('Invalid Email');
        } else {
          console.error('Other Error');
        }
        const errorCode = error.code;
        const errorMessage = error.message;

        return [errorCode, errorMessage];
      });
  };

  // login  user
  handleLoginFirebase = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const {user} = userCredential;
        return {user};
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        return [errorCode, errorMessage];
      });
  };

  // confirm login of user
  handleConfirmLoginFirebase = async () => {
    return await onAuthStateChanged(auth, user => {
      if (user) {
        // user is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid} = user;

        return {uid};
      } else {
        // user is signed out
        // pass data to DB log
      }
    });
  };

  // needs to be configed: Google, Faceback, GitHUb, etc. in Firebase

  // DRY?!
  handlePopupProviderFirebase = async (provider: string) => {
    if (ProviderId.GOOGLE === provider) {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider)
        .then(result => {
          // the signed-in user info.
          const {user} = result;

          // this gives you a Google Access Token you can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);

          // @ts-ignore
          const {accessToken} = credential;

          return {accessToken};

          // IdP data available using getAdditionalUserInfo(result)
        })
        .catch(error => {
          this.handleCredentialError(error);
          // the email of the user's account used.
          const {email} = error.customData;
          // the AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    } else if (ProviderId.FACEBOOK === provider) {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider)
        .then(result => {
          // the signed-in user info.
          const {user} = result;

          // this gives you a Facebook Access Token. You can use it to access the Facebook API.
          const credential = FacebookAuthProvider.credentialFromResult(result);

          // @ts-ignore
          const {accessToken} = credential;

          return {accessToken};

          // IdP data available using getAdditionalUserInfo(result)
        })
        .catch(error => {
          this.handleCredentialError(error);
          // the email of the user's account used.
          const {email} = error.customData;
          // the AuthCredential type that was used.
          const credential = FacebookAuthProvider.credentialFromError(error);
        });
    } else if (ProviderId.TWITTER === provider) {
      const provider = new TwitterAuthProvider();
      await signInWithPopup(auth, provider)
        .then(result => {
          // the signed-in user info.
          const {user} = result;

          // this gives you a Facebook Access Token. You can use it to access the Facebook API.
          const credential = TwitterAuthProvider.credentialFromResult(result);

          // @ts-ignore
          const {accessToken} = credential;

          return {accessToken};

          // IdP data available using getAdditionalUserInfo(result)
        })
        .catch(error => {
          this.handleCredentialError(error);
          // the email of the user's account used.
          const {email} = error.customData;
          // the AuthCredential type that was used.
          const credential = TwitterAuthProvider.credentialFromError(error);
        });
    } else if (ProviderId.GITHUB === provider) {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider)
        .then(result => {
          // the signed-in user info.
          const {user} = result;

          // this gives you a Facebook Access Token. You can use it to access the Facebook API.
          const credential = GithubAuthProvider.credentialFromResult(result);

          // @ts-ignore
          const {accessToken} = credential;

          return {accessToken};

          // IdP data available using getAdditionalUserInfo(result)
        })
        .catch(error => {
          this.handleCredentialError(error);
          // the email of the user's account used.
          const {email} = error.customData;
          // the AuthCredential type that was used.
          const credential = GithubAuthProvider.credentialFromError(error);
        });
    } else if (provider === 'microsoft.com') {
      const provider = new OAuthProvider('microsoft.com');
      await signInWithPopup(auth, provider)
        .then(result => {
          // user is signed in.
          // IdP data available in result.additionalUserInfo.profile.

          // get the OAuth access token and ID Token
          const credential = OAuthProvider.credentialFromResult(result);

          // @ts-ignore
          const {accessToken} = credential;

          // @ts-ignore
          const {idToken} = credential;

          return [{accessToken}, {idToken}];
        })
        .catch(error => {
          this.handleCredentialError(error);
        });
    } else if (provider === 'yahoo.com') {
      const provider = new OAuthProvider('yahoo.com');
      await signInWithPopup(auth, provider)
        .then(result => {
          // user is signed in.
          // IdP data available in result.additionalUserInfo.profile.

          // get the OAuth access token and ID Token
          const credential = OAuthProvider.credentialFromResult(result);

          // @ts-ignore
          const {accessToken} = credential;

          // @ts-ignore
          const {idToken} = credential;

          return [{accessToken}, {idToken}];
        })
        .catch(error => {
          this.handleCredentialError(error);
        });
    }
  };

  // TODO: confirm correct interface and admen import
  handleCredentialError = (error: FirebaseError) => {
    if (error.code === AuthErrorCodes.CREDENTIAL_ALREADY_IN_USE) {
      console.error('Credentials is already in use!');
      // error message and feedback to user
    } else if (error.code === AuthErrorCodes.CREDENTIAL_MISMATCH) {
      console.error('Invalid Credentials');
    } else if (error.code === AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN) {
      console.error('Credentials are outdated');
    } else {
      console.error('Error');
    }
    // handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    return [errorCode, errorMessage];
  };
}
