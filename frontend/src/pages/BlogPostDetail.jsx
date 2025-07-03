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
  useToast
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BlogPostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const token = localStorage.getItem('token');

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/blogposts/${id}`);
      setPost(res.data);
      setNewTitle(res.data.title);
      setNewContent(res.data.content);
    } catch (err) {
      toast({ title: 'Failed to load blog post', status: 'error', duration: 3000 });
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleComment = async () => {
    await axios.post(
      `http://localhost:4000/api/blogposts/${id}/comments`,
      { text: comment },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setComment('');
    fetchPost();
  };

  const handleDeleteComment = async (commentId) => {
    await axios.delete(`http://localhost:4000/api/blogposts/${id}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchPost();
  };

  const handlePostDelete = async () => {
    await axios.delete(`http://localhost:4000/api/blogposts/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate('/blogs');
  };

  const handlePostEdit = async () => {
    await axios.put(
      `http://localhost:4000/api/blogposts/${id}`,
      { title: newTitle, content: newContent },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setEditing(false);
    fetchPost();
  };

  if (!post) return <Text fontFamily="'Open Sans', sans-serif">Loading...</Text>;

  const isAuthor = token && post.author && post.author._id === JSON.parse(atob(token.split('.')[1])).id;

  return (
    <Box
      bgGradient="linear(to-b, #f8f5f0, #d4cfc3)"
      minH="100vh"
      px={6}
      py={16}
      fontFamily="'Open Sans', sans-serif"
      maxW="4xl"
      mx="auto"
    >
      <VStack spacing={8} align="stretch">
        {editing ? (
          <>
            <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} mb={3} />
            <Textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} mb={3} rows={8} />
            <Stack direction="row">
              <Button bg="#a68f6c" color="white" _hover={{ bg: '#927c5c' }} onClick={handlePostEdit}>Save</Button>
              <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
            </Stack>
          </>
        ) : (
          <>
            <Heading fontFamily="Cormorant Garamond" color="gray.800">{post.title}</Heading>
            <Text fontSize="lg" color="gray.700" fontWeight="medium">{post.content}</Text>
            <Text fontSize="sm" color="gray.500">By {post.author.name}</Text>
          </>
        )}

        {isAuthor && !editing && (
          <Stack direction="row">
            <Button colorScheme="yellow" onClick={() => setEditing(true)}>Edit</Button>
            <Button colorScheme="red" onClick={handlePostDelete}>Delete</Button>
          </Stack>
        )}

        <Divider my={6} />

        <Box>
          <Heading size="md" mb={4} fontFamily="Cormorant Garamond">Comments</Heading>
          <Stack spacing={4}>
            {post.comments.map((c) => (
              <Box key={c._id} p={4} bg="white" borderRadius="lg" boxShadow="md">
                <Text>{c.text}</Text>
                <Text fontSize="xs" color="gray.500">— {c.author.name}</Text>
                {c.author._id === JSON.parse(atob(token.split('.')[1])).id && (
                  <Button mt={2} size="xs" colorScheme="red" onClick={() => handleDeleteComment(c._id)}>
                    Delete
                  </Button>
                )}
              </Box>
            ))}
          </Stack>

          <Textarea
            placeholder="Add a comment"
            mt={6}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button mt={2} bg="#a68f6c" color="white" _hover={{ bg: '#927c5c' }} onClick={handleComment}>
            Submit
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}

export default BlogPostDetail;
