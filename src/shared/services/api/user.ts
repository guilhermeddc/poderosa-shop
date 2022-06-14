import {collection, doc, getDoc, setDoc} from 'firebase/firestore';
import {IRequestResult} from 'shared/interfaces';
import {db} from '../firebase';

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  imageUrl?: string;
  admin?: boolean;
  seller?: boolean;
  type: string[];
  updated?: boolean;
}

export const userDB = collection(db, 'users');

const getUser = async (uid: string): Promise<IUser> => {
  try {
    const user = await getDoc(doc(userDB, uid));

    return user.data() as IUser;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode} ${errorMessage}`);
  }
};

const createUserByLogin = async (payload: IUser): Promise<IRequestResult> => {
  try {
    await setDoc(doc(userDB, payload.id), payload);

    return {success: true};
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode} ${errorMessage}`);
  }
};

const updateUser = async (
  id: string,
  payload: IUser,
): Promise<IRequestResult> => {
  try {
    await setDoc(doc(userDB, id), payload);

    return {success: true};
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`${errorCode} ${errorMessage}`);
  }
};

export const userService = {createUserByLogin, getUser, updateUser};
