import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Divider,
} from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { playClickTone } from '../utils/sound';
import '../styles/VisualMemory.css';
import axios from 'axios';

ChartJS.register(BarElement, CategoryScale, LinearScale);

function SequenceMemoryTest() {
  const [showIntro, setShowIntro] = useState(true);
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [phase, setPhase] = useState('idle');
  const [activeTile, setActiveTile] = useState(null);
  const [clickedTile, setClickedTile] = useState(null);
  const [showFlash, setShowFlash] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const gameRef = useRef(null);
  const inputReadyRef = useRef(false);

  const generateNextTile = () => Math.floor(Math.random() * 9);

  const submitScore = async (score) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.post('http://localhost:4000/api/results', {
        testName: 'sequence-memory',
        score,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error('Failed to submit score:', err);
    }
  };

  const startGame = () => {
    const firstTile = generateNextTile();
    setSequence([firstTile]);
    setUserInput([]);
    setLevel(1);
    setShowIntro(false);
    setShowGameOver(false);
    setPhase('show');
  };

  useEffect(() => {
    if (phase === 'show') {
      inputReadyRef.current = false;
      setUserInput([]);
      const delay = 800;
      sequence.forEach((tile, index) => {
        setTimeout(() => {
          setActiveTile(tile);
          playClickTone(1);
        }, delay * index);

        setTimeout(() => {
          setActiveTile(null);
          if (index === sequence.length - 1) {
            setTimeout(() => {
              inputReadyRef.current = true;
              setPhase('input');
            }, 50);
          }
        }, delay * index + 600);
      });
    }
  }, [phase, sequence]);

  const handleClick = (index) => {
    if (phase !== 'input' || !inputReadyRef.current) return;

    playClickTone(1);
    setClickedTile(index);
    setTimeout(() => setClickedTile(null), 300);

    const updatedInput = [...userInput, index];
    setUserInput(updatedInput);

    const currentStep = updatedInput.length - 1;
    if (sequence[currentStep] !== index) {
      submitScore(level);
      setPhase('gameover');
      setShowGameOver(true);
      return;
    }

    if (updatedInput.length === sequence.length) {
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 400);

      const newTile = generateNextTile();
      const newSequence = [...sequence, newTile];

      setTimeout(() => {
        setSequence(newSequence);
        setLevel((prev) => prev + 1);
        setPhase('show');
      }, 600);
    }
  };

  const totalTiles = 9;

  const chartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8+'],
    datasets: [
      {
        label: 'Players %',
        data: [6, 13, 21, 20, 15, 11, 8, 6],
        backgroundColor: '#a68f6c',
      },
    ],
  };

  if (showIntro) {
    return (
      <Box p={10} minH="100vh" bg="brand.bg" color="brand.text" textAlign="center">
        <VStack spacing={10} maxW="5xl" mx="auto">
          <Heading fontSize="7xl">Sequence Memory</Heading>
          <Text fontSize="xl">
            Repeat the sequence in the correct order. One mistake and you're out.
          </Text>
          <Button size="lg" bg="tan" color="white" _hover={{ bg: '#d2b48c' }} onClick={startGame}>
            Start
          </Button>

          <Divider borderColor="gray.500" my={6} />
          <Box w="100%">
            <Heading fontSize="2xl" mb={2}>Global Score Distribution</Heading>
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </Box>
        </VStack>
      </Box>
    );
  }

  if (showGameOver) {
    return (
      <Box p={10} minH="100vh" bg="brand.bg" color="brand.text" textAlign="center">
        <VStack spacing={8}>
          <Heading fontSize="4xl">Sequence Memory</Heading>
          <Text fontSize="8xl">Level {level}</Text>
          <Button size="lg" bg="red.500" color="white" _hover={{ bg: 'red.600' }} onClick={startGame}>
            Try Again
          </Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box ref={gameRef} p={8} minH="100vh" bg="brand.bg" color="brand.text" maxW="90vw" mx="auto">
      {showFlash && <Box className="flash-overlay smooth-flash" />}
      <VStack spacing={8} textAlign="center">
        <Text fontSize="2xl">Level: {level}</Text>

        <SimpleGrid columns={3} spacing={4} maxW="360px" mx="auto">
          {Array.from({ length: totalTiles }).map((_, i) => {
            const isActive = i === activeTile || i === clickedTile;
            return (
              <Box key={i} className="tile">
                <Box
                  className={`inner-tile ${isActive ? 'bop' : ''}`}
                  onClick={() => handleClick(i)}
                >
                  <Box
                    className="front"
                    style={{ backgroundColor: isActive ? 'tan' : '#e2e8f0' }}
                  />
                </Box>
              </Box>
            );
          })}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}

export default SequenceMemoryTest;
