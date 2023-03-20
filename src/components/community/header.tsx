import { Community } from '@/atoms/communitiesAtom';
import useCommunityData from '@/hooks/useCommunityData';
import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { FaReddit } from 'react-icons/fa';

interface IHeaderProps {
  communityData: Community;
}

function Header({ communityData }: IHeaderProps) {
  const { loading, communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const { imageUrl, id: communityName } = communityData;
  // read form the communtiy snippets
  const isJoined = communityStateValue.mySnippet.some((snippet) => snippet.communityID === communityData.id);

  return (
    <Flex direction="column" w="100%" h="146px">
      <Box h="50%" bg="blue.400"></Box>
      <Flex justify="center" bg="white" flexGrow={1}>
        <Flex w="95%" maxW="860px">
          {imageUrl ? (
            <Image src={imageUrl} alt="" />
          ) : (
            <Icon as={FaReddit} fontSize={64} mt={-3} color="blue.500" borderRadius="50%" border="4px solid white" />
          )}

          <Flex p="10px 16px">
            <Flex mr={2} direction="column">
              <Text fontSize="16pt" fontWeight={800}>
                {communityName}
              </Text>
              <Text fontSize="10pt" fontWeight={600} color="gray.400">
                r/{communityName}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? 'outline' : 'solid'}
              h="30px"
              px={6}
              isLoading={loading}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
            >
              {isJoined ? 'Joined' : 'Join'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
