import { Button, Image } from '@chakra-ui/react';

function OAuthButtons() {
  return (
    <div className="mb-4 flex w-full flex-col gap-2">
      <Button variant="oauth">
        <Image src="/images/googlelogo.png " alt="Google Logo" w={5} mr={4} />
        Continue with Google
      </Button>
      <Button variant="oauth">Continue with Others</Button>
    </div>
  );
}

export default OAuthButtons;
