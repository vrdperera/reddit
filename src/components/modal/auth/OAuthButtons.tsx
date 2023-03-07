import { auth, firestore } from '@/firebase/clientApp';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FIREBASE_ERRORS } from '@/firebase/erros';
import ErrorMessage from './errorMessage';

import { Button, Image } from '@chakra-ui/react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { useEffect } from 'react';

function OAuthButtons() {
  const [signInWithGoogle, userCred, loading, authError] =
    useSignInWithGoogle(auth);

  //Store authenticated user data in Firestore "users" collection without cloud functions using Firebase 9 and React Firebase Hooks - Auth.
  const createUserDocument = async (user: User) => {
    const userOBJ = JSON.parse(JSON.stringify(user));
    const userDocReference = doc(collection(firestore, 'users'), userOBJ.uid);

    await setDoc(userDocReference, {
      ...userOBJ,
    });
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return (
    <div className="mb-4 flex w-full flex-col gap-2">
      <ErrorMessage
        error={
          authError?.message &&
          FIREBASE_ERRORS[authError.message as keyof typeof FIREBASE_ERRORS]
        }
      />
      <Button
        variant="oauth"
        isLoading={loading}
        onClick={() => {
          signInWithGoogle();
        }}
        mt={2}
      >
        <Image src="/images/googlelogo.png " alt="Google Logo" w={5} mr={4} />
        Continue with Google
      </Button>
      <Button variant="oauth">Continue with Others</Button>
    </div>
  );
}

export default OAuthButtons;
