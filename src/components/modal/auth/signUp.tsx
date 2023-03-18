import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { auth, firestore } from '@/firebase/clientApp';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { authModalState, AuthModalState } from '@/atoms/authModalAtom';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import InputField from './inputField';
import ErrorMessage from './errorMessage';
import { FIREBASE_ERRORS } from '@/firebase/erros';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import useOAuthButtonsUserDocument from './utils/useOAuthButtonsUserDocument';

interface ISignUpFromValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialSignUpFromValues: ISignUpFromValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUp() {
  // destructure the sign-up state of form values -> { email, password, confirmPassword } = SignUpFromValues
  const [{ email, password, confirmPassword }, setSignUpFromValues] =
    useState<ISignUpFromValues>(initialSignUpFromValues);

  const [error, setError] = useState('');
  const [createUserWithEmailAndPassword, userCred, loading, authError] = useCreateUserWithEmailAndPassword(auth);

  const setAuthModalState = useSetRecoilState<AuthModalState>(authModalState);

  //handle form submission with firebase auth
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (error) setError('');
    //check if password matches
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please make sure your passwords match and try again.');
      return;
    }

    createUserWithEmailAndPassword(email, password);
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setSignUpFromValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Store authenticated user data in Firestore "users" collection without cloud functions using Firebase 9 and React Firebase Hooks - Auth.
  // const createUserDocument = async (user: User) => {
  //   const userOBJ = JSON.parse(JSON.stringify(user));
  //   const userDocReference = doc(collection(firestore, 'users'), userOBJ.uid);
  //   console.log(userDocReference);

  //   await setDoc(userDocReference, {
  //     ...userOBJ,
  //   });
  // };

  // useEffect(() => {
  //   if (userCred) {
  //     createUserDocument(userCred.user);
  //   }
  // }, [userCred]);
  useOAuthButtonsUserDocument(userCred);

  return (
    <form onSubmit={handleSubmit}>
      {/* email */}
      <InputField name="email" placeholder="email" type="email" onChange={handleChange} value={email} />
      {/* <Input
        required
        name="email"
        placeholder="email"
        type="email"
        onChange={handleChange}
        value={email}
        fontSize="10pt"
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          borderColor: 'blue.500',
          border: '1px solid ',
        }}
        _focus={{
          outline: 'none',
          borderColor: 'blue.500',
          border: '1px solid',
        }}
        bg="gray.50"
      /> */}

      {/* password */}
      <InputField
        name="password"
        placeholder="password"
        type="password"
        onChange={handleChange}
        value={password}
        mt={2}
      />
      {/* <Input
        required
        name="password"
        placeholder="password"
        type="password"
        mt={2}
        onChange={handleChange}
        value={password}
        fontSize="10pt"
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          borderColor: 'blue.500',
          border: '1px solid ',
        }}
        _focus={{
          outline: 'none',
          borderColor: 'blue.500',
          border: '1px solid',
        }}
        bg="gray.50"
      /> */}

      {/* confirmPassword */}
      <InputField
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        onChange={handleChange}
        value={confirmPassword}
        mt={2}
      />
      {/* <Input
        required
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        mt={2}
        onChange={handleChange}
        value={confirmPassword}
        fontSize="10pt"
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          borderColor: 'blue.500',
          border: '1px solid ',
        }}
        _focus={{
          outline: 'none',
          borderColor: 'blue.500',
          border: '1px solid',
        }}
        bg="gray.50"
      /> */}

      <ErrorMessage
        error={error || (authError?.message && FIREBASE_ERRORS[authError.message as keyof typeof FIREBASE_ERRORS])}
      />

      <Button w="100%" mt={4} mb={2} h="36px" type="submit" isLoading={loading}>
        Sign Up
      </Button>

      <Flex fontSize="9pt" justify="center" gap={2}>
        <Text className="cursor-pointer">Already a redditor? </Text>
        <Text
          className="cursor-pointer font-bold uppercase text-blue-500"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: 'login',
            }))
          }
        >
          Log in
        </Text>
      </Flex>
    </form>
  );
}

export default SignUp;
