import { Flex, chakra, Box, Image } from '@chakra-ui/react';
import tw from 'twin.macro';
import SearchInput from './searchInput';
// import Image from 'next/image';

// Making next/image component work with chakra's responsive syntax
// https://github.com/chakra-ui/chakra-ui/discussions/2475

// function Navbar() {
//   const NextImageWraper = chakra(Image, {
//     shouldForwardProp: (prop) =>
//       [
//         'width',
//         'height',
//         'src',
//         'alt',
//         'quality',
//         'placeholder',
//         'blurDataURL',
//         'loader ',
//       ].includes(prop),
//   });
//   return (
//     <Flex bg="white" height="48px" padding="6px 20px">
//       <Flex justify="center" align="center">
//         <NextImageWraper
//           src="/images/redditFace.svg"
//           alt={''}
//           width={8}
//           height={8}
//         />
//         <NextImageWraper
//           src="/images/redditText.svg"
//           alt={''}
//           width={16}
//           height={12}
//           display={{ base: 'none', md: 'unset' }}
//         />
//       </Flex>
//     </Flex>
//   );
// }

function Navbar() {
  return (
    <Flex bg="white" h="44px" p="6px 20px">
      <Flex align="center">
        <Image src="/images/redditFace.svg" alt="" h="32px" w="32px" />
        <Image
          src="/images/redditText.svg"
          alt=""
          h="46px"
          display={{ base: 'none', md: 'unset' }}
        />
      </Flex>
      <SearchInput />
    </Flex>
  );
}

export default Navbar;
