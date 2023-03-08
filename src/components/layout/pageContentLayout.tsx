import { Flex } from '@chakra-ui/react';
import { Children, ReactNode } from 'react';

interface IPageContentLayout {
  children: ReactNode;
}

function PageContentLayout({ children }: IPageContentLayout) {
  const [leftChild, rightChild] = Children.toArray(children);
  //   const [leftChild, rightChild] = children as ReactNode[];
  return (
    <Flex justify="center" py="16px" border="2px solid red">
      <Flex justify="center" w="95%" maxW="860px" border="2px solid green">
        {/* left side */}
        <Flex
          direction="column"
          width={{ base: '100%', md: '65%' }}
          mr={{ base: '0', md: '6px' }}
          border="2px solid"
        >
          {children && leftChild}
        </Flex>
        {/* right side */}
        <Flex
          direction="column"
          display={{ base: 'none', md: 'unset' }}
          flexGrow={1}
          border="2px solid blue "
        >
          {children && rightChild}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default PageContentLayout;
