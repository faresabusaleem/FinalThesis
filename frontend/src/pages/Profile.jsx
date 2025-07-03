import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Textarea,
  Text,
  Stack,
  VStack,
  Divider,
  useToast,
  SimpleGrid
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [scores, setScores] = useState({});
  const [bio, setBio] = useState('');
  const [editingBio, setEditingBio] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/login');

    const fetchProfile = async () => {
      try {
        const resUser = await axios.get('http://localhost:4000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(resUser.data);
        setBio(resUser.data.bio || '');

        const resScores = await axios.get('http://localhost:4000/api/scores/mine', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setScores(resScores.data);

        const resPosts = await axios.get('http://localhost:4000/api/blogs/mine', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(resPosts.data);

      } catch (err) {
        toast({ title: 'Failed to load profile', status: 'error', duration: 3000 });
      }
    };

    fetchProfile();
  }, [token, navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSaveBio = async () => {
    try {
      await axios.put('http://localhost:4000/api/users/bio', { bio }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingBio(false);
      toast({ title: 'Bio updated.', status: 'success', duration: 2000 });
    } catch (err) {
      toast({ title: 'Failed to update bio.', status: 'error', duration: 3000 });
    }
  };

  return (
    <Box
      bgGradient="linear(to-b, #f8f5f0, #d4cfc3)"
      minH="100vh"
      px={6}
      py={24}
      fontFamily="'Open Sans', sans-serif"
    >
      <Box bg="whiteAlpha.800" p={8} borderRadius="xl" boxShadow="2xl">
        <VStack spacing={10} maxW="5xl" mx="auto" align="stretch">
          <Box textAlign="center">
            <Heading fontFamily="Cormorant Garamond" fontSize="5xl" color="gray.800">
              Welcome, {user?.username || 'User'}
            </Heading>
            {editingBio ? (
              <Box mt={3}>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                />
                <Stack direction="row" mt={2} justify="center">
                  <Button size="sm" colorScheme="green" onClick={handleSaveBio}>Save</Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingBio(false)}>Cancel</Button>
                </Stack>
              </Box>
            ) : (
              <Text mt={2} color="gray.600" fontSize="md" fontStyle="italic">
                {bio || 'No bio set. Click below to write one.'}
              </Text>
            )}
            {!editingBio && (
              <Button mt={2} size="sm" variant="ghost" onClick={() => setEditingBio(true)}>
                {bio ? 'Edit Bio' : 'Add Bio'}
              </Button>
            )}
            <Button mt={4} colorScheme="red" onClick={handleLogout}>Log Out</Button>
          </Box>

          <Box>
            <Heading size="lg" mb={4} fontFamily="Cormorant Garamond" color="gray.700">Your Highest Scores</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {Object.entries(scores).map(([test, score]) => (
                <Box key={test} p={4} bg="white" borderRadius="lg" boxShadow="md">
                  <Text fontSize="lg" fontWeight="bold" fontFamily="Cormorant Garamond">{test}</Text>
                  <Text fontSize="2xl" color="gray.800">{score}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          <Divider />

          <Box>
            <Heading size="lg" mb={4} fontFamily="Cormorant Garamond" color="gray.700">Your Blog Posts</Heading>
            {posts.length === 0 ? (
              <Text>No blog posts yet.</Text>
            ) : (
              <VStack spacing={4} align="stretch">
                {posts.map((post) => (
                  <Box
                    key={post._id}
                    p={4}
                    bg="white"
                    borderRadius="lg"
                    boxShadow="md"
                    onClick={() => navigate(`/blogs/${post._id}`)}
                    cursor="pointer"
                  >
                    <Text fontSize="xl" fontWeight="bold" fontFamily="Cormorant Garamond">{post.title}</Text>
                    <Text noOfLines={2} color="gray.600">{post.content}</Text>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}

export default ProfilePage;
