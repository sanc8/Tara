import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';

const AddUser = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Email no válido');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/usuarios', {
        nombre,
        email,
        rol
      });
      alert('Usuario añadido con éxito');
      setNombre('');
      setEmail('');
      setRol('');
      setError('');
    } catch (error) {
      console.error('Error añadiendo usuario:', error);
      alert('Error añadiendo usuario');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>Añadir Usuario</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Rol"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" color="primary" fullWidth>Añadir</Button>
      </form>
    </Container>
  );
};

export default AddUser;



