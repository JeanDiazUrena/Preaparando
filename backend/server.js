const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Ruta raíz para probar
app.get('/', (req, res) => {
  res.send('Servidor funcionando ✅ — Visita /api para probar la conexión.');
});

// ✅ Ruta de prueba /api (esta es la importante)
app.get('/api', (req, res) => {
  const horaActual = new Date().toLocaleTimeString('es-ES');
  const mensaje = `¡Conexión Exitosa! Última Hora recibida del servidor: ${horaActual}`;
  res.json({ mensaje });
});

// Ruta para obtener productos
app.get('/api/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener datos:', err.message);
    res.status(500).send('Error al obtener datos de la base de datos');
  }
});

// Configuración de producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  // 🟢 CORRECCIÓN: Usar :*ruta (el : es para el parámetro, el * es el comodín)
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`👉 URL: http://localhost:${PORT}/api`);
});
