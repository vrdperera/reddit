import React, { useState } from 'react';
import { Input, Text } from '@chakra-ui/react';

interface ICharCountInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  validationFn?: (value: string) => string;
}

function CharCountInput({
  label,
  value,
  onChange,
  maxLength = 21,
  validationFn = (): string => '',
}: ICharCountInputProps) {
  const [charsRemaining, setCharsRemaining] = useState(
    maxLength - value.length
  );
  const [errorMessage, setErrorMessage] = useState(validationFn(value));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = event.target;
    const newCharsRemaining = maxLength - newValue.length;
    setCharsRemaining(newCharsRemaining);
    setErrorMessage(validationFn(newValue));
    onChange(event);
  };

  return (
    <>
      <Text fontWeight={600} fontSize={15}>
        {label}
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
        value={value}
        onChange={handleInputChange}
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
      <Text fontSize="9pt" color="red" pt={1}>
        {errorMessage}
      </Text>
    </>
  );
}

export default CharCountInput;
