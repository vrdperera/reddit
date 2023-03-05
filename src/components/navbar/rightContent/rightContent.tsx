import AuthModal from '@/components/modal/auth/authModal';
import { auth } from '@/firebase/clientApp';
import { Button, Flex } from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import AuthBtns from './authBtns';
import ActionIcons from './icons';
import UserMenu from './profileMenu/userMenu';

interface IRightContentProps {
  user: User | null | undefined;
}

function RightContent({ user }: IRightContentProps) {
  return (
    <>
      {/* Auth Modal */}
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <ActionIcons /> : <AuthBtns />}
        <UserMenu />
      </Flex>
    </>
  );
}

export default RightContent;
