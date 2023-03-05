import { Checkbox, Flex, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
interface ICommunityTypeCheckboxProps {
  name: string;
  isChecked: boolean;
  icon: IconType;
  title: string;
  description: string;
  onCommunityTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CommunityTypeCheckbox({
  name,
  isChecked,
  icon,
  title,
  description,
  onCommunityTypeChange,
}: ICommunityTypeCheckboxProps) {
  return (
    <Checkbox
      colorScheme="blue"
      name={name}
      isChecked={isChecked}
      onChange={onCommunityTypeChange}
    >
      <Flex alignItems="center">
        <Icon as={icon} mr={2} color="gray.500" />
        <Text fontSize="10pt" mr={1}>
          {title}
        </Text>
        <Text fontSize="8pt" color="gray.500" pt={1}>
          {description}
        </Text>
      </Flex>
    </Checkbox>
  );
}

export default CommunityTypeCheckbox;
