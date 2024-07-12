require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const usuariosRoutes = require('./routes/usuarios');
const alojamientosRoutes = require('./routes/alojamientos');
const eventosRoutes = require('./routes/eventos');
const reservasRoutes = require('./routes/reservas');

app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/alojamientos', alojamientosRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/reservas', reservasRoutes);

app.get('/', (req, res) => {
    res.send('Hola mundo desde el backend!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tuBaseDeDatos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Conectado a MongoDB."))
  .catch(err => console.error("No se pudo conectar a MongoDB.", err));
