import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/usuarios/${id}`);
        const user = response.data;
        setNombre(user.nombre);
        setEmail(user.email);
        setRol(user.rol);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [id]);

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
      await axios.put(`http://localhost:5000/api/usuarios/${id}`, {
        nombre,
        email,
        rol
      });
      alert('Usuario actualizado con éxito');
      navigate('/usuarios');
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      alert('Error actualizando usuario');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>Editar Usuario</Typography>
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
        <Button type="submit" variant="contained" color="primary" fullWidth>Actualizar</Button>
      </form>
    </Container>
  );
};

export default EditUser;



