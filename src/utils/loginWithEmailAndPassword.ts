import { signInWithEmailAndPassword } from 'firebase/auth';
import { ISignupCredentials } from '@type/interfaces/ISignupCredentials';
import { FirebaseError } from 'firebase/app';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase';

export async function loginWithEmailAndPassword(
  { email, password }: Pick<ISignupCredentials, 'email' | 'password'>,
  translate: (key: string) => string
) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    switch ((error as FirebaseError).code) {
      case 'auth/wrong-password':
        toast.error(translate('Wrong password'));
        break;
      case 'auth/user-not-found':
        toast.error(translate("User don't exist"));
        break;
      case 'auth/invalid-credential':
        toast.error(translate('Invalid credential'));
        break;
      default:
        toast.error((error as FirebaseError).code);
    }
  }
}
