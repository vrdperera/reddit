import { authModalState, AuthModalState } from '@/atoms/authModalAtom';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

interface UseStateProps {
  email: string;
  password: string;
}

function Login() {
  const setAuthModalState = useSetRecoilState<AuthModalState>(authModalState);

  const [loginFrom, setLoginFrom] = useState<UseStateProps>({
    email: '',
    password: '',
  });

  // With Firebase
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle form submission
  };
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setLoginFrom((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        onChange={handleChange}
        value={loginFrom.email}
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
      />
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        mt={2}
        onChange={handleChange}
        value={loginFrom.password}
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
      />
      <Button w="100%" mt={4} mb={2} h="36px" type="submit">
        Login
      </Button>
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
