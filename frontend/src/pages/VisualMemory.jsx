import { useState, useEffect, useRef } from 'react';
import {
  Box, Button, Heading, Text, VStack,
  SimpleGrid, HStack, Icon, Divider
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { playClickTone } from '../utils/sound';
import '../styles/VisualMemory.css';
import axios from 'axios';

ChartJS.register(BarElement, CategoryScale, LinearScale);

function getRandomTiles(count, gridSize) {
  const tiles = new Set();
  while (tiles.size < count) {
    tiles.add(Math.floor(Math.random() * gridSize * gridSize));
  }
  return Array.from(tiles);
}

function playBopSound() {
  const audio = new Audio('/tilesshowing.mp3');
  audio.volume = 0.4;
  audio.play().catch(() => {});
}

function VisualMemory() {
  const [showIntro, setShowIntro] = useState(true);
  const [level, setLevel] = useState(1);
  const [gridSize, setGridSize] = useState(3);
  const [highlighted, setHighlighted] = useState([]);
  const [selected, setSelected] = useState([]);
  const [wrongSelections, setWrongSelections] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [lives, setLives] = useState(3);
  const [phase, setPhase] = useState('idle');
  const [pitch, setPitch] = useState(1);
  const [showFlash, setShowFlash] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [shakingTile, setShakingTile] = useState(null);
  const gameRef = useRef(null);

  const submitScore = async (score) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.post('http://localhost:4000/api/results', {
        testName: 'visual-memory',
        score,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error('Failed to submit score:', err?.response?.data || err.message);
    }
  };

  const startLevel = (newLevel, newGridSize = gridSize) => {
    setPhase('idle');
    setHighlighted([]);
    setSelected([]);
    setWrongSelections([]);
    setMistakes(0);
    setPitch(1);
    setLevel(newLevel);
    setGridSize(newGridSize);

    setTimeout(() => {
      const newTiles = getRandomTiles(newLevel + 2, newGridSize);
      setHighlighted(newTiles);
      setPhase('show');
      playBopSound();

      setTimeout(() => {
        setPhase('play');
      }, 1200);
    }, 800);
  };

  const handleClick = (index) => {
    if (phase !== 'play') return;
    if (selected.includes(index) || wrongSelections.includes(index)) return;

    playClickTone(pitch);
    setPitch(prev => prev + 0.05);

    if (highlighted.includes(index)) {
      setSelected(prev => [...prev, index]);
    } else {
      const newMistakeCount = mistakes + 1;
      setMistakes(newMistakeCount);
      setWrongSelections(prev => [...prev, index]);
      setShakingTile(index);
      setTimeout(() => setShakingTile(null), 500);

      if (newMistakeCount >= 3) {
        const remainingLives = lives - 1;
        if (remainingLives <= 0) {
          submitScore(level);
          triggerFailEffect();
          setTimeout(() => {
            setShowGameOver(true);
            setPhase('gameover');
          }, 600);
        } else {
          setLives(remainingLives);
          flashMiniRed();
          setPhase('retry');
        }
      }
    }
  };

  const triggerFailEffect = () => {
    document.body.classList.add('global-flash-red');
    setTimeout(() => {
      document.body.classList.remove('global-flash-red');
    }, 500);
  };

  const flashMiniRed = () => {
    const el = document.body;
    el.classList.add('mini-flash-red');
    setTimeout(() => {
      el.classList.remove('mini-flash-red');
    }, 250);
  };

  useEffect(() => {
    if (selected.length === highlighted.length && phase === 'play') {
      setShowFlash(true);
      setTimeout(() => {
        setShowFlash(false);
        const nextLevel = level + 1;
        const newGridSize = nextLevel % 3 === 0 ? gridSize + 1 : gridSize;
        startLevel(nextLevel, newGridSize);
      }, 1000);
    }
  }, [selected]);

  useEffect(() => {
    if (phase === 'retry') {
      setTimeout(() => {
        startLevel(level, gridSize);
      }, 1000);
    }
  }, [phase]);

  const restartGame = () => {
    setShowIntro(false);
    setShowGameOver(false);
    setLives(3);
    startLevel(1, 3);
  };

  const chartData = {
    labels: ['3', '4', '5', '6', '7', '8', '9', '10+'],
    datasets: [
      {
        label: 'Players %',
        data: [5, 12, 20, 25, 18, 10, 7, 3],
        backgroundColor: '#a68f6c'
      }
    ]
  };

  const totalTiles = gridSize * gridSize;

  if (showIntro) {
    return (
      <Box p={10} minH="100vh" bg="brand.bg" color="brand.text" textAlign="center">
        <VStack spacing={10} maxW="5xl" mx="auto">
          <Heading fontSize="7xl">Visual Memory</Heading>
          <Text fontSize="xl">
            Memorize the pattern of highlighted tiles. Once they fade, reproduce the pattern by clicking the correct tiles. You can make 3 mistakes per level. Failing a level costs you one heart. Lose all hearts, and the trial ends.
          </Text>
          <Button size="lg" bg="tan" color="white" _hover={{ bg: '#d2b48c' }} onClick={restartGame}>
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
          <Heading fontSize="4xl">Visual Memory</Heading>
          <Text fontSize="8xl">Level {level}</Text>
          <Button size="lg" colorScheme="red" onClick={restartGame}>
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
        <HStack spacing={4} justify="center">
          <Text fontSize="2xl">Level: {level}</Text>
          <HStack>
            {[...Array(3)].map((_, i) => (
              <Icon
                key={i}
                as={FaHeart}
                color={i < lives ? 'red.500' : 'gray.300'}
                boxSize={6}
              />
            ))}
          </HStack>
        </HStack>

        <SimpleGrid columns={gridSize} spacing={3} maxW="100%">
          {Array.from({ length: totalTiles }).map((_, i) => {
            const isHighlighted = highlighted.includes(i);
            const isSelected = selected.includes(i);
            const isWrong = wrongSelections.includes(i);
            const showHighlight =
              (phase === 'show' && isHighlighted) || (phase === 'play' && isSelected);

            return (
              <Box key={i} className="tile">
                <Box
                  className={`inner-tile ${showHighlight ? 'flipped' : ''} ${isWrong ? 'wrong' : ''} ${shakingTile === i ? 'shake' : ''}`}
                  onClick={() => handleClick(i)}
                >
                  <Box className="front" />
                  <Box className="back" />
                </Box>
              </Box>
            );
          })}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}

export default VisualMemory;
