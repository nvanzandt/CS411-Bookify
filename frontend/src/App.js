import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Input from './components/input-page/Input';
import Login from './components/login-page/Login'; 
import Results from './components/results-page/Results'; 
import Error from './components/error-page/Error';

function App() {
  return (
    <div className='app-div'>
     <BrowserRouter basename=''>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Login />} />
        <Route path="/book" element={<Input />} />
        <Route path="/playlist" element={<Results />} />
        <Route path="*" element={<Error />} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
