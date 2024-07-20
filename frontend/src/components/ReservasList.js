// src/components/ReservasList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const ReservasList = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      const response = await axios.get('http://localhost:5000/api/reservas');
      setReservas(response.data);
    };

    fetchReservas();
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5">
        Lista de Reservas
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Alojamiento</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Fecha de Inicio</TableCell>
            <TableCell>Fecha de Fin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservas.map((reserva) => (
            <TableRow key={reserva._id}>
              <TableCell>{reserva.alojamientoId.nombre}</TableCell>
              <TableCell>{reserva.usuarioId.nombre}</TableCell>
              <TableCell>{new Date(reserva.fechaInicio).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(reserva.fechaFin).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default ReservasList;

