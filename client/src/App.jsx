import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ResumeForm from './pages/ResumeForm';
import ResumeView from './pages/ResumeView';

function App() {
  return (
    <BrowserRouter>
      {/* 1. We completely removed the old <nav> bar. 
        2. We removed the 800px wrapper so your pages can use the full screen! 
      */}
      <Routes>
        {/* THIS is the magic! The Dashboard is now the root ("/") page */}
        <Route path="/" element={<Dashboard />} />
        
        {/* We leave this here just in case any old links still point to /dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-resume" element={<ResumeForm />} />
        <Route path="/resume/:id" element={<ResumeView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;