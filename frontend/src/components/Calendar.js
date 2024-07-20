// src/components/Calendar.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      const response = await axios.get('http://localhost:5000/api/reservas');
      const reservas = response.data.map((reserva) => ({
        title: `${reserva.usuarioId.nombre} en ${reserva.alojamientoId.nombre}`,
        start: new Date(reserva.fechaInicio),
        end: new Date(reserva.fechaFin),
      }));
      setEvents(reservas);
    };

    fetchReservas();
  }, []);

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default CalendarComponent;
