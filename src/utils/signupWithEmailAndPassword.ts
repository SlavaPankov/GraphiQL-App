import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase/firebase';

interface ISignupCredentials {
  name: string;
  email: string;
  password: string;
}

export const signupWithEmailAndPassword = async (
  { name, email, password }: ISignupCredentials,
  translate: (key: string) => string
) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = response;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (error) {
    const fireBasesError = error as FirebaseError;
    switch (fireBasesError.code) {
      case 'auth/email-already-in-use':
        toast.error(translate('Email exists'));
        break;
      default:
        toast.error(fireBasesError.code);
    }
  }
};
