import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState, AuthModalState } from '@/atoms/authModalAtom';

import { auth } from '@/firebase/clientApp';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { Button, Flex, Input, Text } from '@chakra-ui/react';
import InputField from './inputField';
import ErrorMessage from './errorMessage';
import { FIREBASE_ERRORS } from '@/firebase/erros';

interface ILoginFromValues {
  email: string;
  password: string;
}

function Login() {
  const setAuthModalState = useSetRecoilState<AuthModalState>(authModalState);
  const [loginFromValues, setLoginFromValues] = useState<ILoginFromValues>({
    email: '',
    password: '',
  });
  const [signInWithEmailAndPassword, user, loading, authError] =
    useSignInWithEmailAndPassword(auth);

  // console.log(user);

  //handle form submission with Firebase
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(loginFromValues.email, loginFromValues.password);
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setLoginFromValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* email */}
      <InputField
        name="email"
        placeholder="email"
        type="email"
        onChange={handleChange}
        value={loginFromValues.email}
      />
      {/* <Input
        required
        name="email"
        placeholder="email"
        type="email"
        onChange={handleChange}
        value={loginFromValues.email}
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
        value={loginFromValues.password}
        mt={2}
      />
      {/* <Input
        required
        name="password"
        placeholder="password"
        type="password"
        mt={2}
        onChange={handleChange}
        value={loginFromValues.password}
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
        error={
          authError?.message &&
          FIREBASE_ERRORS[authError.message as keyof typeof FIREBASE_ERRORS]
        }
      />

      <Button w="100%" mt={4} mb={2} h="36px" type="submit" isLoading={loading}>
        Login
      </Button>

      <Flex justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot your password?
        </Text>
        <Text
          className="cursor-pointer font-bold uppercase text-blue-500"
          fontSize="9pt"
          color="blue.500"
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: 'resetPassword',
            }))
          }
        >
          Reset
        </Text>
      </Flex>
      <Flex fontSize="9pt" justify="center" gap={2}>
        <Text className="cursor-pointer">New to Reddit?</Text>
        <Text
          className="cursor-pointer font-bold uppercase text-blue-500"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: 'signup',
            }))
          }
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
}

export default Login;
