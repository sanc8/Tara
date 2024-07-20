import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const EditReserva = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [usuarios, setUsuarios] = useState([]);
  const [alojamientos, setAlojamientos] = useState([]);
  const [reserva, setReserva] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const reservaResponse = await axios.get(`http://localhost:5000/api/reservas/${id}`);
      setReserva(reservaResponse.data);
      setValue('usuario', reservaResponse.data.usuario._id);
      setValue('alojamiento', reservaResponse.data.alojamiento._id);
      setValue('fechaInicio', reservaResponse.data.fechaInicio.split('T')[0]);
      setValue('fechaFin', reservaResponse.data.fechaFin.split('T')[0]);

      const usuariosResponse = await axios.get('http://localhost:5000/api/usuarios');
      setUsuarios(usuariosResponse.data);
      const alojamientosResponse = await axios.get('http://localhost:5000/api/alojamientos');
      setAlojamientos(alojamientosResponse.data);
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/reservas/${id}`, data);
      console.log(response.data);
      navigate('/reservas');
    } catch (error) {
      console.error('Error updating reserva:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Editar Reserva
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel id="usuario-label">Usuario</InputLabel>
          <Select
            labelId="usuario-label"
            label="Usuario"
            {...register('usuario', { required: 'El usuario es obligatorio' })}
            error={!!errors.usuario}
          >
            {usuarios.map((usuario) => (
              <MenuItem key={usuario._id} value={usuario._id}>
                {usuario.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel id="alojamiento-label">Alojamiento</InputLabel>
          <Select
            labelId="alojamiento-label"
            label="Alojamiento"
            {...register('alojamiento', { required: 'El alojamiento es obligatorio' })}
            error={!!errors.alojamiento}
          >
            {alojamientos.map((alojamiento) => (
              <MenuItem key={alojamiento._id} value={alojamiento._id}>
                {alojamiento.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Fecha Inicio"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...register('fechaInicio', { required: 'La fecha de inicio es obligatoria' })}
          error={!!errors.fechaInicio}
          helperText={errors.fechaInicio ? errors.fechaInicio.message : ''}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Fecha Fin"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...register('fechaFin', { required: 'La fecha de fin es obligatoria' })}
          error={!!errors.fechaFin}
          helperText={errors.fechaFin ? errors.fechaFin.message : ''}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Actualizar
        </Button>
      </form>
    </Container>
  );
}

export default EditReserva;
