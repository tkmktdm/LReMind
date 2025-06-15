import { Box, Button } from "@chakra-ui/react";

type Props = {
  word: string;
};

export const ItemButton = ({ word }: Props) => {
  return (
    <Box zIndex={1}>
      <Button
        paddingX="5rem"
        h="80%"
        bg="red.500"
        color="white"
        type={"submit"}
      >
        {word}
      </Button>
    </Box>
  );
};
