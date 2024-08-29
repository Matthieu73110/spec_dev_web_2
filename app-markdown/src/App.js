import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Markdown from './pages/Markdown'
import CompanyComponent from './pages/test'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={....} /> */}
        <Route path='/markdown' element={<Markdown />} />
        <Route path='/test' element={<CompanyComponent />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
