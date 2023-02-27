import { AuthModalState, authModalState } from '@/atoms/authModalAtom';
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
import { useRecoilState } from 'recoil';
import OAuthButtons from './OAuthButtons';
import OauthInput from './oauthInput';

function AuthModal() {
  const [modalState, setModalState] =
    useRecoilState<AuthModalState>(authModalState);
  return (
    <>
      <Modal
        isOpen={modalState.open}
        onClose={() => setModalState((prev) => ({ ...prev, open: false }))}
      >
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
              <OAuthButtons />
              <Text className="font-bold text-gray-400">OR</Text>
              <OauthInput />
              {/* <ResetPassword/> */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AuthModal;
