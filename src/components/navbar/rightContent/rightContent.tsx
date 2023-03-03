import AuthModal from '@/components/modal/auth/authModal';
import { auth } from '@/firebase/clientApp';
import { Button, Flex } from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import AuthBtns from './authBtns';

interface IRightContentProps {
  user: User | null | undefined;
}

function RightContent({ user }: IRightContentProps) {
  return (
    <>
      {/* Auth Modal */}
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? (
          <Button onClick={() => signOut(auth)}>SignOut</Button>
        ) : (
          <AuthBtns />
        )}
      </Flex>
    </>
  );
}

export default RightContent;
