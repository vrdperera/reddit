import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState, ModalView } from '@/atoms/authModalAtom';

import { auth, fetchSignInMethodsForEmail } from '@/firebase/clientApp';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { FIREBASE_ERRORS } from '@/firebase/erros';

import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import InputField from './inputField';
import ErrorMessage from './errorMessage';

import { BsDot, BsReddit } from 'react-icons/bs';

type ResetPasswordProps = {
  toggleView: (view: ModalView) => void;
};

const EMAIL_NOT_FOUND_ERROR =
  'The email address you entered does not belong to an existing account. Please check the spelling and try again, or create a new account.';

const ResetPassword: React.FC<ResetPasswordProps> = ({ toggleView }) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [success, setSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length > 0) {
      // User exists
      await sendPasswordResetEmail(email);
      setSuccess(true);
    } else {
      // User does not exist
      setEmailErr(EMAIL_NOT_FOUND_ERROR);
    }
  };
  return (
    <Flex direction="column" alignItems="center" width="100%">
      <Icon as={BsReddit} color="brand.100" fontSize={40} mb={2} />
      <Text fontWeight={700} mb={2}>
        Reset your password
      </Text>
      {success ? (
        <Text mb={4} className="font-semibold text-blue-500">
          An email with instructions on how to reset your password has been sent
          to your email address.
        </Text>
      ) : (
        <>
          <Text
            fontSize="sm"
            textAlign="center"
            mb={2}
            className="font-semibold text-red-500"
          >
            Please enter the email address associated with your account. We'll
            send you a password reset link to that email.
          </Text>
          <form onSubmit={onSubmit} style={{ width: '100%' }}>
            <InputField
              value={email}
              name="email"
              placeholder="email"
              type="email"
              mb={2}
              onChange={({ target }) => setEmail(target.value)}
              bg="white"
            />
            {/* <Input
              required
              name="email"
              placeholder="email"
              type="email"
              mb={2}
              onChange={({ target }) => setEmail(target.value)}
              fontSize="10pt"
              _placeholder={{ color: 'gray.500' }}
              _hover={{
                bg: 'white',
                border: '1px solid',
                borderColor: 'blue.500',
              }}
              _focus={{
                outline: 'none',
                bg: 'white',
                border: '1px solid',
                borderColor: 'blue.500',
              }}
              bg="gray.50"
            /> */}
            {/* <Text textAlign="center" fontSize="10pt" color="red">
              {error?.message}
            </Text> */}

            <ErrorMessage
              error={
                emailErr ||
                (error?.message &&
                  FIREBASE_ERRORS[
                    error.message as keyof typeof FIREBASE_ERRORS
                  ])
              }
            />
            <Button
              width="100%"
              height="36px"
              mb={2}
              mt={2}
              type="submit"
              isLoading={sending}
            >
              Reset Password
            </Button>
          </form>
        </>
      )}
      <Flex
        alignItems="center"
        fontSize="9pt"
        color="blue.500"
        fontWeight={700}
        cursor="pointer"
      >
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: 'login',
            }))
          }
        >
          LOGIN
        </Text>
        <Icon as={BsDot} />
        <Text
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
    </Flex>
  );
};
export default ResetPassword;
