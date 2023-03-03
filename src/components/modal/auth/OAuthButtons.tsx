import { auth } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/erros';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import ErrorMessage from './errorMessage';

import { Button, Image } from '@chakra-ui/react';

function OAuthButtons() {
  const [signInWithGoogle, user, loading, authError] =
    useSignInWithGoogle(auth);

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
