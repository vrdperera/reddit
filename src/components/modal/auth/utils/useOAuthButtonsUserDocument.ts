import { useEffect } from 'react';
import { doc, setDoc, collection } from 'firebase/firestore';
import { User, UserCredential } from 'firebase/auth';
import { firestore } from '@/firebase/clientApp';

type TUserCredential = UserCredential | undefined;

const useOAuthButtonsUserDocument = (userCred: TUserCredential) => {
  useEffect(() => {
    const createUserDocument = async (user: User) => {
      const userObj = JSON.parse(JSON.stringify(user));
      const userDocRef = doc(collection(firestore, 'users'), userObj.uid);

      await setDoc(userDocRef, {
        ...userObj,
      });
    };

    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return null;
};

export default useOAuthButtonsUserDocument;
