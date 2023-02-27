import AuthModal from '@/components/modal/auth/authModal';
import { Flex } from '@chakra-ui/react';
import AuthBtns from './authBtns';

interface IRightContentProps {}

function RightContent(): IRightContentProps {
  return (
    <>
      {/* Auth Modal */}

      <AuthModal />

      <Flex justify="center" align="center">
        <AuthBtns />
      </Flex>
    </>
  );
}

export default RightContent;
