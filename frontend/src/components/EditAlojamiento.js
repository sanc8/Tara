import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

const EditAlojamiento = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [alojamiento, setAlojamiento] = useState(null);

  useEffect(() => {
    const fetchAlojamiento = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/alojamientos/${id}`);
        setAlojamiento(response.data);
        setValue('nombre', response.data.nombre);
        setValue('direccion', response.data.direccion);
        setValue('descripcion', response.data.descripcion);
        setValue('capacidad', response.data.capacidad);
      } catch (error) {
        console.error('Error fetching alojamiento:', error);
      }
    };

    fetchAlojamiento();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/alojamientos/${id}`, data);
      console.log(response.data);
      navigate('/alojamientos');
    } catch (error) {
      console.error('Error updating alojamiento:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Editar Alojamiento
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
          label="Descripción"
          {...register('descripcion', { required: 'La descripción es obligatoria' })}
          error={!!errors.descripcion}
          helperText={errors.descripcion ? errors.descripcion.message : ''}
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
          Actualizar
        </Button>
      </form>
    </Container>
  );
}

export default EditAlojamiento;
