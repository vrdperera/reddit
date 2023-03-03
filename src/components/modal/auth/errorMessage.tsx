import { Text } from '@chakra-ui/react';

interface IErrorMessageProps {
  error: string | undefined;
}

function ErrorMessage({ error }: IErrorMessageProps) {
  if (!error) return null;

  return (
    <Text textAlign="center" fontSize="10pt" color="red" mt={4}>
      {error}
    </Text>
  );
}

export default ErrorMessage;
