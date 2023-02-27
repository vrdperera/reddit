import { authModalState, AuthModalState } from '@/atoms/authModalAtom';
import { Flex } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import Login from './login';
import SignUp from './signUp';

function OauthInput() {
  const modalState = useRecoilValue<AuthModalState>(authModalState);

  return (
    <Flex direction="column" align="center" justify="center" w="100%" mt={4}>
      {modalState.view === 'login' && <Login />}
      {modalState.view === 'signup' && <SignUp />}
    </Flex>
  );
}

export default OauthInput;
