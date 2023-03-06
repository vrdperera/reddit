import { Text } from '@chakra-ui/react';

interface IErrorMessageProps {
  error: string | undefined;
}

function ErrorMessage({ error }: IErrorMessageProps) {
  if (!error) return null;

  return (
    <Text
      textAlign="left"
      fontSize="10pt"
      mt={4}
      className="font-semibold text-red-500"
    >
      {error}
    </Text>
  );
}

export default ErrorMessage;
