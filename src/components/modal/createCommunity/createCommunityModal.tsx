import { auth, firestore } from '@/firebase/clientApp';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Divider,
  Text,
  Input,
  Flex,
  Checkbox,
  Icon,
  Stack,
} from '@chakra-ui/react';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsFillPersonFill, BsFillEyeFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';
import CharCountInput from './charCountInput';
import CommunityTypeCheckbox from './CommunityTypeCheckbox';

import ErrorMessage from '../auth/errorMessage';

interface ICreateCommunityModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

function CreateCommunityModal({
  isOpen,
  handleClose,
}: ICreateCommunityModalProps) {
  const MAX_CHARS = 21;
  const [name, setName] = useState('');
  console.log(name);
  const [charsRemaining, setCharsRemaining] = useState(MAX_CHARS);
  const [communityNameError, setCommunityNameError] = useState('');
  const [communityType, setCommunityType] = useState('public');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [user] = useAuthState(auth);

  const clearFields = () => {
    setName('');
    setCommunityNameError('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > MAX_CHARS) return;
    setName(event.target.value);
    setCharsRemaining(MAX_CHARS - event.target.value.length);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { name },
    } = event;
    if (name === communityType) return;
    setCommunityType(name);
  };

  // contacting the firestore and create the community objects
  const handleCreateCommunity = async () => {
    if (communityNameError) setCommunityNameError('');

    // check community name is valid and create the community
    const nameRegex = /^\w{3,21}$/.test(name);
    if (!nameRegex) {
      return setCommunityNameError(
        'Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores.'
      );
    }
    setLoading(true);
    try {
      // create the community document object on the firestore
      // check that name is not already in the firestore that means not taken by someone else
      // if it is not, then create a new community and return the community object on the firestore

      // create a reference to the community document with the specified ID
      const communityDocReference = doc(firestore, 'communities', name);
      console.log(communityDocReference);
      const documentSnap = await getDoc(communityDocReference);
      console.log(documentSnap);

      if (documentSnap.exists()) {
        throw new Error(
          `Sorry, r/${name} is already taken, Please try another`
        );
      }

      await setDoc(communityDocReference, {
        creatorID: user?.uid,
        createdAt: serverTimestamp(),
        numberOfMembers: 1,
        privacyType: communityType,
      });
    } catch (error: any) {
      console.log('handleCreateCommunity Error', error);
      setCommunityNameError(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          handleClose(), clearFields();
        }}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" flexDir="column" fontSize="10pt">
            Create a Community
          </ModalHeader>

          <Box px={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              {/* <CharCountInput
                label="Name"
                value={name}
                onChange={handleChange}
              /> */}
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500">
                Community names including capitalization cannot be changed
              </Text>
              <Text
                color="gray.400"
                position="relative"
                top="28px"
                left="10px"
                width="20px"
              >
                r/
              </Text>
              <Input
                position="relative"
                name="name"
                value={name}
                onChange={handleChange}
                pl="22px"
                type={''}
                size="sm"
              />
              <Text
                fontSize="9pt"
                color={charsRemaining === 0 ? 'red' : 'gray.500'}
                pt={2}
              >
                {charsRemaining} Characters remaining
              </Text>

              <ErrorMessage error={communityNameError} />

              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15}>
                  Community Type
                </Text>
                <Stack spacing={2} pt={1}>
                  <CommunityTypeCheckbox
                    name="public"
                    isChecked={communityType === 'public'}
                    onCommunityTypeChange={onCommunityTypeChange}
                    icon={BsFillPersonFill}
                    title="public"
                    description="Anyone can view, post, and comment to this community"
                  />

                  <CommunityTypeCheckbox
                    name="restricted"
                    isChecked={communityType === 'restricted'}
                    onCommunityTypeChange={onCommunityTypeChange}
                    icon={BsFillPersonFill}
                    title="restricted"
                    description=" Anyone can view this community, but only approved users can post"
                  />

                  <CommunityTypeCheckbox
                    name="private"
                    isChecked={communityType === 'private'}
                    onCommunityTypeChange={onCommunityTypeChange}
                    icon={BsFillPersonFill}
                    title="private"
                    description="Only approved users can view and submit to this community"
                  />
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={2}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              height="30px"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateCommunityModal;

{
  /* <Checkbox
                    colorScheme="blue"
                    name="public"
                    isChecked={communityType === 'public'}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex alignItems="center">
                      <Icon as={BsFillPersonFill} mr={2} color="gray.500" />
                      <Text fontSize="10pt" mr={1}>
                        Public
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox> */
}

{
  /* <Checkbox
                    colorScheme="blue"
                    name="private"
                    isChecked={communityType === 'private'}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex alignItems="center">
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Private
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Only approved users can view and submit to this
                        community
                      </Text>
                    </Flex>
                  </Checkbox> */
}

{
  /* <Checkbox
                    colorScheme="blue"
                    name="restricted"
                    isChecked={communityType === 'restricted'}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex alignItems="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view this community, but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Checkbox> */
}
