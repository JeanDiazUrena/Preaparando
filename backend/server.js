const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db'); // Importamos la conexión

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba con hora dinámica
app.get('/api', (req, res) => {
  const horaActual = new Date().toLocaleTimeString('es-ES');
  const mensaje = `¡Conexión Exitosa! Última Hora recibida del servidor: ${horaActual}`;
  res.json({ mensaje });
});




if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en ${PORT}`));
 // Ruta para obtener datos de PostgreSQL
app.get('/api/users', async (req, res) => {
 

  try {
    const result = await pool.query('SELECT * FROM estudiantes'); // Cambia 'users' por tu tabla
    res.json(result.rows);
    console.log(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error al obtener datos de la base de datos');
  }
});
