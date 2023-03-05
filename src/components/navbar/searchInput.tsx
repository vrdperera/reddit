import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { User } from 'firebase/auth';

interface IRightContentProps {
  user: User | null | undefined;
}

function SearchInput({ user }: IRightContentProps) {
  return (
    <Flex flexGrow={1} align="center" mr={2} maxWidth={user ? 'auto' : '600px'}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" mb={1} />
        </InputLeftElement>
        <Input
          type="tel"
          placeholder="Search Reddit"
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
          h="34px"
          bg="gray.50"
        />
      </InputGroup>
    </Flex>
  );
}

export default SearchInput;
