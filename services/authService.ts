// services/authService.ts
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  UserCredential,
} from 'firebase/auth';

// Define a custom error type for better error handling
interface AuthError {
  code: string;
  message: string;
}

const errorMessages: { [key: string]: string } = {
  'auth/email-already-in-use': 'This email is already registered.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/weak-password': 'Password is too weak. Please use a stronger password.',
  'auth/user-not-found': 'Invalid email or password.',
  'auth/wrong-password': 'Invalid email or password.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/expired-action-code': 'The action code has expired.',
};

const handleAuthError = (error: any) => {
  const message = errorMessages[error?.code] || 'An unknown error occurred. Please try again.';
  throw new Error(message);
};

export const signUp = async (email: string, password: string): Promise<UserCredential | undefined> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    return userCredential;
  } catch (error) {
    handleAuthError(error);
    return undefined;  // Return undefined when an error occurs
  }
};

export const logIn = async (email: string, password: string): Promise<UserCredential | undefined> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential.user.emailVerified) {
      throw new Error('Please verify your email before logging in.');
    }
    return userCredential;
  } catch (error) {
    handleAuthError(error);
    return undefined;  // Return undefined when an error occurs
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error('Failed to log out. Please try again.');
  }
};
