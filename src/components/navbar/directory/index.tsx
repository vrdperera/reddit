import { useRecoilState } from 'recoil';
import { AuthModalState, authModalState } from '@/atoms/authModalAtom';

import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Menu, MenuButton, MenuList, Icon, Text } from '@chakra-ui/react';

import { TiHome } from 'react-icons/ti';
import Communities from './communities';

function Directory() {
  const [authModal, setModalState] =
    useRecoilState<AuthModalState>(authModalState);
  const [user] = useAuthState(auth);

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius="4px"
        mr={2}
        ml={{ base: 0, md: 2 }}
        _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
        // to test used the tailwind css outline class
        // className="!outline hover:!outline-gray-200"
      >
        <Flex
          alignItems="center"
          justify="space-between"
          width={{ base: 'auto', lg: '200px' }}
        >
          <Flex alignItems="center">
            <Icon as={TiHome} fontSize={24} mr={{ base: 1, md: 2 }} />
            <Flex display={{ base: 'none', lg: 'flex' }}>
              <Text fontWeight={600} fontSize="10pt">
                Home
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon color="gray.500" />
        </Flex>
      </MenuButton>
      <MenuList mt={2}>
        <Communities />
      </MenuList>
    </Menu>
  );
}

export default Directory;
