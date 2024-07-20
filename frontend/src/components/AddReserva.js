import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const AddReserva = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [usuarios, setUsuarios] = useState([]);
  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    const fetchAlojamientos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/alojamientos');
        setAlojamientos(response.data);
      } catch (error) {
        console.error('Error al obtener alojamientos:', error);
      }
    };

    fetchUsuarios();
    fetchAlojamientos();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/reservas', data);
      console.log(response.data);
    } catch (error) {
      console.error('Error al añadir la reserva:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Añadir Reserva
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Usuario"
          select
          SelectProps={{
            native: true,
          }}
          {...register('usuarioId', { required: 'El usuario es obligatorio' })}
          error={!!errors.usuarioId}
          helperText={errors.usuarioId ? errors.usuarioId.message : ''}
        >
          <option value=""></option>
          {usuarios.map((usuario) => (
            <option key={usuario._id} value={usuario._id}>
              {usuario.nombre}
            </option>
          ))}
        </TextField>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Alojamiento"
          select
          SelectProps={{
            native: true,
          }}
          {...register('alojamientoId', { required: 'El alojamiento es obligatorio' })}
          error={!!errors.alojamientoId}
          helperText={errors.alojamientoId ? errors.alojamientoId.message : ''}
        >
          <option value=""></option>
          {alojamientos.map((alojamiento) => (
            <option key={alojamiento._id} value={alojamiento._id}>
              {alojamiento.nombre}
            </option>
          ))}
        </TextField>
        <Controller
          name="fechaInicio"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <DatePicker
              {...field}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              startDate={field.value}
              selectsStart
              startDate={field.value}
              endDate={null}
              dateFormat="dd/MM/yyyy"
              placeholderText="Fecha de Inicio"
              className="form-control"
              customInput={<TextField variant="outlined" margin="normal" fullWidth />}
            />
          )}
        />
        <Controller
          name="fechaFin"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <DatePicker
              {...field}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              startDate={null}
              selectsEnd
              endDate={field.value}
              minDate={null}
              dateFormat="dd/MM/yyyy"
              placeholderText="Fecha de Fin"
              className="form-control"
              customInput={<TextField variant="outlined" margin="normal" fullWidth />}
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Añadir Reserva
        </Button>
      </form>
    </Container>
  );
};

export default AddReserva;







