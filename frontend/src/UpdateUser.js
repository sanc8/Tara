import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/usuarios/${id}`);
        const user = response.data;
        setValue('nombre', user.nombre);
        setValue('email', user.email);
        setValue('rol', user.rol);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUser();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/usuarios/${id}`, data);
      console.log(response.data);
      navigate('/usuarios');
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      alert('Hubo un error al actualizar el usuario');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Actualizar Usuario
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
          label="Email"
          {...register('email', { 
            required: 'El email es obligatorio',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Ingresa un email válido'
            }
          })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Rol"
          {...register('rol', { required: 'El rol es obligatorio' })}
          error={!!errors.rol}
          helperText={errors.rol ? errors.rol.message : ''}
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

export default UpdateUser;
