import { AuthModalState, authModalState } from '@/atoms/authModalAtom';
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';

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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Here is the modal body</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AuthModal;
