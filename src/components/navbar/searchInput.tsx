import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

interface IsearcInputProps {
  user: string;
}

function SearchInput({ user }: IsearcInputProps) {
  return (
    <Flex>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input type="tel" placeholder="Phone number" />
      </InputGroup>
    </Flex>
  );
}

export default SearchInput;
