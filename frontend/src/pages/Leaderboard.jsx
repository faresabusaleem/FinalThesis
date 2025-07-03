import { Box, Heading, Select, Stack, Table, Tbody, Td, Th, Thead, Tr, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [testName, setTestName] = useState("visual-memory");
  const [scores, setScores] = useState([]);

  const testOptions = [
    { label: "Reaction Time", value: "reaction-time" },
    { label: "Visual Memory", value: "visual-memory" },
    { label: "Number Memory", value: "number-memory" },
    { label: "Sequence Memory", value: "sequence-memory" },
    { label: "Chimp Test", value: "chimp-test" },
  ];

  useEffect(() => {
    fetchScores(testName);
  }, [testName]);

  const fetchScores = async (name) => {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/results/${encodeURIComponent(name)}`);
      setScores(data);
    } catch (err) {
      console.error("Error fetching scores:", err);
    }
  };

  return (
    <Box p={10} textAlign="center" minH="100vh" bg="brand.bg" color="brand.text">
      <Stack spacing={5} align="center">
        <Heading fontSize="5xl">Leaderboard</Heading>

        <Select
          width="250px"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          bg="white"
          fontWeight="bold"
        >
          {testOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>

        {scores.length === 0 ? (
          <Text fontSize="lg">No scores yet for <strong>{testOptions.find(t => t.value === testName)?.label}</strong></Text>
        ) : (
          <Table variant="simple" maxW="800px" bg="white" borderRadius="lg" overflow="hidden">
            <Thead bg="gray.200">
              <Tr>
                <Th>#</Th>
                <Th>User</Th>
                <Th>Score</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {scores.map((score, index) => (
                <Tr key={score._id}>
                  <Td>{index + 1}</Td>
                  <Td>{score.user?.username || 'Anonymous'}</Td>
                  <Td>{score.score}</Td>
                  <Td>{new Date(score.createdAt).toLocaleDateString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Stack>
    </Box>
  );
}

export default Leaderboard;
