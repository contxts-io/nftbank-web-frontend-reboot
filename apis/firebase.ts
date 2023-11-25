import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  confirmPasswordReset,
  fetchSignInMethodsForEmail,
  signOut,
} from 'firebase/auth';
import { auth } from '@/utils/firebase/config';

import errorMessage from '@/utils/errorMessage';
import { FirebaseError } from '@firebase/app';

const provider = new GoogleAuthProvider();

export const createFirebaseWithEmail = async (email: string, password: string) => {
  const idToken = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    return userCredential.user?.getIdToken()
    }).catch((error) => {
      throw { ...error, message: errorMessage(error?.code) };
    });
  return idToken;
};
export const getIdTokenByEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      return result?.user?.getIdToken();
    })
    .catch((error) => {
      throw { ...error, message: errorMessage(error?.code) };
    });
};
export const getSignInMethods = async (email: string) => {
  return await fetchSignInMethodsForEmail(auth, email)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw { ...error, message: errorMessage(error?.code) };
    });
}
export const getIdTokenByGoogle = async () => {
  return await signInWithPopup(auth, provider)
    .then((result) => {
      return result.user?.getIdToken();
    })
    .catch((error: FirebaseError) => {
      if (error.code !== 'auth/popup-closed-by-user') {
        throw { ...error, message: errorMessage(error?.code) };
      }
    });
};
export const sendPasswordReset = async (email: string) => {
  return await sendPasswordResetEmail(auth, email)
    .then(() => {
      return true;
    })
    .catch((error) => {
      throw { ...error, message: errorMessage(error?.code) };
    });
};
export const updatePassword = async (oobCode: string, newPassword: string) => {
  return await confirmPasswordReset(auth, oobCode, newPassword)
    .then(() => {
      return true;
    })
    .catch((error) => {
      throw { ...error, message: errorMessage(error?.code) };
    });
};
export const logout = async () => { 
  return await signOut(auth)
    .then(() => {
      console.log('logout');
      return true;
    })
    .catch((error) => {
      throw { ...error, message: errorMessage(error?.code) };
    });
}
