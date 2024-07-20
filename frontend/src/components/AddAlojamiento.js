import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const AddAlojamiento = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/alojamientos', data);
      console.log(response.data);
      alert('Alojamiento añadido con éxito');
    } catch (error) {
      console.error('Error al añadir el alojamiento:', error);
      alert('Hubo un error al añadir el alojamiento');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Añadir Alojamiento
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Nombre"
          {...register('nombre', { required: 'El nombre es obligatorio' })}
          error={!!errors.nombre}
          helperText={errors.nombre ? errors.nombre.message : ''}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Dirección"
          {...register('direccion', { required: 'La dirección es obligatoria' })}
          error={!!errors.direccion}
          helperText={errors.direccion ? errors.direccion.message : ''}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Capacidad"
          type="number"
          {...register('capacidad', { required: 'La capacidad es obligatoria' })}
          error={!!errors.capacidad}
          helperText={errors.capacidad ? errors.capacidad.message : ''}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Añadir
        </Button>
      </form>
    </Container>
  );
};

export default AddAlojamiento;



