// src/components/AlojamientosList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const AlojamientosList = () => {
  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    const fetchAlojamientos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/alojamientos');
        setAlojamientos(response.data);
      } catch (error) {
        console.error('Error al obtener los alojamientos:', error);
      }
    };

    fetchAlojamientos();
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5">
        Lista de Alojamientos
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Precio por Noche</TableCell>
            <TableCell>Capacidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alojamientos.map((alojamiento) => (
            <TableRow key={alojamiento._id}>
              <TableCell>{alojamiento.nombre}</TableCell>
              <TableCell>{alojamiento.direccion}</TableCell>
              <TableCell>{alojamiento.descripcion}</TableCell>
              <TableCell>{alojamiento.precioPorNoche}</TableCell>
              <TableCell>{alojamiento.capacidad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default AlojamientosList;

