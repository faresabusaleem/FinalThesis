import { useEffect, useState } from 'react';
import { Box, Button, SimpleGrid, Text, VStack } from '@chakra-ui/react';

function generateGrid(size, count) {
  const positions = Array.from({ length: size * size }, (_, i) => i);
  const selected = positions.sort(() => 0.5 - Math.random()).slice(0, count);
  const shuffled = [...selected].sort(() => 0.5 - Math.random());
  return { selected, shuffled };
}

function ChimpTest() {
  const [gridSize] = useState(5);
  const [numberCount] = useState(5);
  const [numbers, setNumbers] = useState([]);
  const [visible, setVisible] = useState(true);
  const [clicked, setClicked] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const { selected } = generateGrid(gridSize, numberCount);
    setNumbers(selected.map((index, i) => ({ index, value: i + 1 })));
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (i) => {
    if (gameOver || visible) return;

    const next = clicked.length + 1;
    const box = numbers.find(n => n.index === i);
    if (!box || box.value !== next) {
      setGameOver(true);
    } else {
      const newClicked = [...clicked, i];
      setClicked(newClicked);
      if (newClicked.length === numberCount) {
        alert('Success! You passed the Chimp Test.');
      }
    }
  };

  const renderBox = (i) => {
    const numObj = numbers.find(n => n.index === i);
    const isClicked = clicked.includes(i);
    return (
      <Box
        key={i}
        w="60px"
        h="60px"
        border="1px solid gray"
        bg={isClicked ? "green.200" : "gray.100"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="lg"
        onClick={() => handleClick(i)}
        cursor="pointer"
        borderRadius="md"
      >
        {visible && numObj ? numObj.value : ''}
      </Box>
    );
  };

  return (
    <VStack p={6} spacing={4}>
      <Text fontSize="2xl" fontWeight="bold">Chimp Test</Text>
      <Text>Remember the numbers and click them in order!</Text>
      <SimpleGrid columns={gridSize} spacing={2}>
        {Array.from({ length: gridSize * gridSize }, (_, i) => renderBox(i))}
      </SimpleGrid>
      {gameOver && <Text color="red.500">Game Over! Try Again.</Text>}
      <Button onClick={() => window.location.reload()} colorScheme="blue">Restart</Button>
    </VStack>
  );
}

export default ChimpTest;
