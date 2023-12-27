import { auth } from '../firebase/firebase';

export default async function signOutUser() {
  try {
    await auth.signOut();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error signing out: ${error.message}`);
    }
  }
}
