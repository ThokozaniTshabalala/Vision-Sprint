import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DiscussProject from './pages/DiscussProject';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discuss-project" element={<DiscussProject />} />
        <Route path="/contact" element={<DiscussProject />} />
      </Routes>
    </Router>
  );
}

export default App;
