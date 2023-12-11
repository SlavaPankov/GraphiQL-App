import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { ISignupCredentials } from '@type/interfaces/ISignupCredentials';
import { auth, db } from '../firebase/firebase';

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

    await updateProfile(user, {
      displayName: name,
    });

    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      displayName: name,
      authProvider: 'local',
      email,
    });
  } catch (error) {
    const fireBasesError = error as FirebaseError;
    switch (fireBasesError.code) {
      case 'auth/email-already-exists':
        toast.error(translate('Email exists'));
        break;
      default:
        toast.error(fireBasesError.code);
    }
  }
};
