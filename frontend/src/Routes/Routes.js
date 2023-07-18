import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../design/App.css';
import Inicio from '../pages/Inicio';
import Formulario from '../pages/Formulario';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Inicio/>} />
          <Route path='/Formulario' element={<Formulario/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
