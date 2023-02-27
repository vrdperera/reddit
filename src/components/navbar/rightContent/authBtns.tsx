import { Button } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { AuthModalState, authModalState } from '@/atoms/authModalAtom';

function AuthBtns() {
  const setAuthModalState = useSetRecoilState<AuthModalState>(authModalState);
  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: 'none', sm: 'unset' }}
        width={{ base: '70px', md: '110px' }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: 'login' })}
      >
        Log In
      </Button>
      <Button
        height="28px"
        display={{ base: 'none', sm: 'unset' }}
        width={{ base: '70px', md: '110px' }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: 'signup' })}
      >
        Sign Up
      </Button>
    </>
  );
}

export default AuthBtns;
