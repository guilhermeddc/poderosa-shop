import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  inMemoryPersistence,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut as FSignOut,
  User,
} from 'firebase/auth';
import {auth} from '../firebase';
import {IUser, userService} from './user';

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const signIn = async (type: string): Promise<IUser | null> => {
  try {
    const provider = type === 'google' ? googleProvider : facebookProvider;

    const resUser = await signInWithPopup(auth, provider);
    const authUser: User = resUser.user;
    const user = await userService.getUser(authUser.uid);

    if (user === undefined) {
      await userService.createUserByLogin({
        id: authUser.uid,
        name: authUser.displayName || '',
        email: authUser.email || '',
        imageUrl: authUser.photoURL || '',
        phone: '',
        cpf: '',
        type: [],
        updated: false,
      });

      const newUser = await userService.getUser(authUser.uid);

      return newUser;
    }

    return user;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode} ${errorMessage}`);
  }
};

const signOut = async () => {
  try {
    const response = await FSignOut(auth);

    return response;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode} ${errorMessage}`);
  }
};

const signPersist = async () => {
  try {
    await setPersistence(auth, inMemoryPersistence);

    const provider = new GoogleAuthProvider();

    return signInWithRedirect(auth, provider);
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode} ${errorMessage}`);
  }
};

export const authService = {signIn, signOut, signPersist};
