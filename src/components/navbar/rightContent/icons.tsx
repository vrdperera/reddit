import React from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { BsArrowUpRightCircle, BsChatDots } from 'react-icons/bs';
import { GrAdd } from 'react-icons/gr';
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from 'react-icons/io5';
// import useDirectory from '../../../hooks/useDirectory';

interface IIconButtonProps {
  icon: React.ReactElement;
  onClick?: () => void;
  bgColor?: string;
  hoverBgColor?: string;
  fontSize?: number;
}

function IconButton({
  icon,
  onClick,
  bgColor,
  hoverBgColor,
  fontSize,
}: IIconButtonProps) {
  return (
    <Flex
      mr={1.5}
      ml={1.5}
      padding={1}
      cursor="pointer"
      borderRadius={4}
      bgColor={bgColor}
      _hover={{ bgColor: hoverBgColor }}
      onClick={onClick}
    >
      <Icon fontSize={fontSize}>{icon}</Icon>
    </Flex>
  );
}

function ActionIcons() {
  //   const { toggleMenuOpen } = useDirectory();
  return (
    <Flex alignItems="center" flexGrow={1}>
      <Box
        display={{ base: 'none', md: 'flex' }}
        alignItems="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <IconButton fontSize={22} icon={<BsArrowUpRightCircle />} />
        <IconButton fontSize={22} icon={<IoFilterCircleOutline />} />
        <IconButton fontSize={22} icon={<IoVideocamOutline />} />
      </Box>
      <>
        <IconButton fontSize={22} icon={<BsChatDots />} />
        <IconButton fontSize={22} icon={<IoNotificationsOutline />} />
        <Box display={{ base: 'none', md: 'flex' }}>
          <IconButton
            fontSize={22}
            icon={<GrAdd />}
            // onClick={toggleMenuOpen}
          />
        </Box>
      </>
    </Flex>
  );
}

export default ActionIcons;
