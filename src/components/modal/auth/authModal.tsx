import { useEffect } from 'react';

import { useRecoilState } from 'recoil';
import { AuthModalState, authModalState } from '@/atoms/authModalAtom';

import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
} from '@chakra-ui/react';

import OAuthButtons from './OAuthButtons';
import OauthInput from './oauthInput';
import ResetPassword from './resetPassword';

function AuthModal() {
  const [modalState, setModalState] =
    useRecoilState<AuthModalState>(authModalState);

  const [user, loading, error] = useAuthState(auth);

  const hanldeClose = () => setModalState((prev) => ({ ...prev, open: false }));

  useEffect(() => {
    user && hanldeClose();
  }, [user]);

  return (
    <>
      <Modal isOpen={modalState.open} onClose={hanldeClose}>
        <ModalOverlay className="!bg-black/60" />
        <ModalContent px={2}>
          <ModalHeader textAlign="center">
            {modalState.view === 'login' && 'Login'}
            {modalState.view === 'signup' && 'Sign Up'}
            {modalState.view === 'resetPassword' && 'Reset Password'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={6}
          >
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              w="70%"
            >
              {modalState.view === 'login' || modalState.view === 'signup' ? (
                <>
                  <OAuthButtons />
                  <Text className="font-bold text-gray-400">OR</Text>
                  <OauthInput />
                </>
              ) : (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AuthModal;
