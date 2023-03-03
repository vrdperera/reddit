import { Input } from '@chakra-ui/react';
import { memo } from 'react';

interface IInputFieldProps {
  name: string;
  placeholder: string;
  type: string;
  mt?: number;
  mb?: number;
  bg?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

function InputField(props: IInputFieldProps) {
  const {
    name,
    placeholder,
    type,
    mt = 0,
    mb = 0,
    onChange,
    value,
    bg = '',
  } = props;

  return (
    <Input
      required
      name={name}
      placeholder={placeholder}
      type={type}
      mt={mt}
      mb={mb}
      onChange={onChange}
      value={value}
      fontSize="10pt"
      _placeholder={{ color: 'gray.500' }}
      _hover={{
        bg: 'white',
        borderColor: 'blue.500',
        border: '1px solid ',
      }}
      _focus={{
        bg: { bg },
        outline: 'none',
        borderColor: 'blue.500',
        border: '1px solid',
      }}
      bg="gray.50"
    />
  );
}

export default memo(InputField);
