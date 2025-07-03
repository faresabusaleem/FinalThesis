import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import './index.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';

import Homepage from './pages/Homepage';
import ReactionTest from './pages/ReactionTest';
import SequenceMemoryTest from './pages/SequenceTest'; 
import NumberMemory from './pages/NumberMemory';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import VisualMemory from './pages/VisualMemory';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import IQTests from './pages/IQTests';
import CognitivePractice from './pages/CognitivePractice';
import Blogs from './pages/Blogs';
import CreateBlog from './pages/CreateBlog';
import BlogPostDetail from './pages/BlogPostDetail';
import BlogsLanding from './pages/BlogsLanding';
import IQTestsLanding from './pages/IQTestsLanding';
import CognitivePracticeLanding from './pages/CognitivePracticeLanding';
import ChimpTest from './pages/ChimpTest';

function App() {
  const { user } = useContext(UserContext);

  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/reaction" element={<ReactionTest />} />
        <Route path="/memory" element={<SequenceMemoryTest />} />
        <Route path="/number" element={<NumberMemory />} />
        <Route path="/visual" element={<VisualMemory />} />
        <Route path="/chimp" element={<ChimpTest />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/iq" element={<IQTests />} />
        <Route path="/practice" element={<CognitivePractice />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blogs/:id" element={<BlogPostDetail />} />
        <Route path="/blogintro" element={<BlogsLanding />} />
        <Route path="/iqintro" element={<IQTestsLanding />} />
        <Route path="/practiceintro" element={<CognitivePracticeLanding />} />
        <Route path="/reaction-test" element={<ReactionTest />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
