import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UsersList from './UsersList';
import AddUser from './AddUser';
import EditUser from './EditUser';
import './App.css';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <h1>Hola Mundo</h1>
          <nav>
            <Link to="/usuarios">Lista de Usuarios</Link>
            <Link to="/add-user">Añadir Usuario</Link>
          </nav>
          <Routes>
            <Route path="/usuarios" element={<UsersList />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/" element={<h2>Bienvenido a la aplicación de alojamientos turísticos</h2>} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;






