import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Markdown from './pages/Markdown'
import CompanyComponent from './pages/test'
import CustomBlock from './pages/CustomBlock'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={....} /> */}
        <Route path='/markdown' element={<Markdown />} />
        <Route path='/test' element={<CompanyComponent />} />
        <Route path='/custom-block' element={<CustomBlock />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
