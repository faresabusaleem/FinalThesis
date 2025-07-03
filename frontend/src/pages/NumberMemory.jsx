import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Progress,
  Input,
  Divider
} from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import '../styles/VisualMemory.css';
import axios from 'axios';

ChartJS.register(BarElement, CategoryScale, LinearScale);

function NumberMemory() {
  const [showIntro, setShowIntro] = useState(true);
  const [level, setLevel] = useState(1);
  const [number, setNumber] = useState('');
  const [userInput, setUserInput] = useState('');
  const [phase, setPhase] = useState('idle');
  const [showFlash, setShowFlash] = useState(false);
  const [showRedFlash, setShowRedFlash] = useState(false);
  const [progress, setProgress] = useState(100);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const timerRef = useRef(null);

  const generateNumber = (length) => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10).toString();
    }
    return result;
  };

  const submitScore = async (score) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await axios.post('http://localhost:4000/api/results', {
        testName: 'number-memory',
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

  const startGame = (startingLevel = level) => {
    const newNumber = generateNumber(startingLevel);
    setNumber(newNumber);
    setUserInput('');
    setShowIntro(false);
    setShowResult(false);
    setPhase('show');
    setProgress(100);

    let counter = 100;
    timerRef.current = setInterval(() => {
      counter -= 2;
      setProgress(counter);
      if (counter <= 0) {
        clearInterval(timerRef.current);
        setPhase('input');
      }
    }, 40);
  };

  const handleSubmit = () => {
    setPhase('result');
    setShowResult(true);
    const correct = userInput === number;
    setIsCorrect(correct);
    if (correct) {
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 400);
    } else {
      submitScore(level);
      setShowRedFlash(true);
      setTimeout(() => setShowRedFlash(false), 400);
    }
  };

  const handleNext = () => {
    const nextLevel = level + 1;
    setLevel(nextLevel);
    startGame(nextLevel);
  };

  const handleRestart = () => {
    setLevel(1);
    setShowIntro(true);
  };

  const chartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8+'],
    datasets: [
      {
        label: 'Players %',
        data: [6, 15, 22, 20, 14, 10, 8, 5],
        backgroundColor: '#a68f6c'
      }
    ]
  };

  if (showIntro) {
    return (
      <Box p={10} minH="100vh" bg="brand.bg" color="brand.text" textAlign="center">
        <VStack spacing={10} maxW="5xl" mx="auto">
          <Heading fontSize="7xl">Number Memory</Heading>
          <Text fontSize="xl">
            A number will appear for a brief moment. Memorize it and type it back. One mistake ends the game.
          </Text>
          <Button size="lg" bg="tan" color="white" _hover={{ bg: '#d2b48c' }} onClick={() => startGame(1)}>
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

  return (
    <Box p={10} minH="100vh" bg="brand.bg" color="brand.text" textAlign="center">
      {showFlash && <Box className="flash-overlay smooth-flash" />}
      {showRedFlash && <Box className="flash-overlay" style={{ backgroundColor: 'rgba(255,0,0,0.4)' }} />}

      <VStack spacing={8}>
        {phase === 'show' && (
          <>
            <Heading fontSize="8xl" fontFamily="'Open Sans', sans-serif">{number}</Heading>
            <Progress value={progress} size="sm" colorScheme="yellow" w="200px" mx="auto" mt={2} />
          </>
        )}

        {phase === 'input' && (
          <>
            <Heading fontSize="4xl">What was the number?</Heading>
            <Input
              placeholder="Enter number"
              size="lg"
              maxW="300px"
              mx="auto"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              textAlign="center"
              fontSize="2xl"
            />
            <Button mt={4} bg="tan" color="white" _hover={{ bg: '#d2b48c' }} size="lg" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )}

        {showResult && (
          <>
            <Divider my={4} />
            <Text fontSize="2xl">Correct Number: <strong>{number}</strong></Text>
            <Text fontSize="2xl">Your Answer: <strong>{userInput}</strong></Text>
            <Text fontSize="xl" mt={2}>Level {level}</Text>
            <Button mt={4} bg={isCorrect ? "tan" : "red.500"} color="white" _hover={{ bg: isCorrect ? '#d2b48c' : 'red.600' }} size="lg" onClick={isCorrect ? handleNext : handleRestart}>
              {isCorrect ? 'Next' : 'Try Again'}
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
}

export default NumberMemory;
