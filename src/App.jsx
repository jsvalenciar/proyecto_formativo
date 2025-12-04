import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Monitor from './pages/Monitor';
import Pulsoximetro from './pages/Pulsoximetro';
import Aspirador from './pages/Aspirador';
import Electrocardiografo from './pages/Electrocardiografo';
import Tensiometro from './pages/Tensiometro';
import Fonendoscopio from './pages/Fonendoscopio';
import Termometro from './pages/Termometro';
import Termohigrometro from './pages/termohigrometro';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/Home" element={<Home/>} />
      <Route path="/clientes" element={<Clientes/>} />
      <Route path="/monitordesignos" element={<Monitor/>} />
      <Route path="/pulsoximetro" element={<Pulsoximetro/>} />
      <Route path="/aspirador" element={<Aspirador />} />
      <Route path="/electrocardiografo" element={<Electrocardiografo/>} />
      <Route path="/tensiometro" element={<Tensiometro/>} />
      <Route path="/fonendoscopio" element={<Fonendoscopio/>} />
      <Route path="/termometro" element={<Termometro/>} />
      <Route path="/termohigrometro" element={<Termohigrometro/>} />
    </Routes>
  );
}

export default App;
