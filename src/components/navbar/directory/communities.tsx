import CreateCommunityModal from '@/components/modal/createCommunity/createCommunityModal';
import { auth } from '@/firebase/clientApp';
import { MenuItem, Icon, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GrAdd } from 'react-icons/gr';
import { useRecoilValueLoadable } from 'recoil';

function Communities() {
  const [user] = useAuthState(auth);
  const [isOpen, setISOpen] = useState(false);
  // const mySnippets = useRecoilValueLoadable(communityState).mySnippets;

  return (
    <div>
      <CreateCommunityModal
        isOpen={isOpen}
        handleClose={() => setISOpen(false)}
      />
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: 'gray.100' }}
        onClick={() => setISOpen(true)}
      >
        <Flex align="center">
          <Icon fontSize={20} mr={2} as={GrAdd} />
          Home
        </Flex>
      </MenuItem>
    </div>
  );
}

export default Communities;
