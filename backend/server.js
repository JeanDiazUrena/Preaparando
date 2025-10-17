const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 🧠 Ruta raíz para verificar el servidor
app.get('/', (req, res) => {
  res.send('✅ Servidor funcionando correctamente. Visita /api para probar la conexión.');
});

// 🚀 Ruta de prueba /api
app.get('/api', (req, res) => {
  const horaActual = new Date().toLocaleTimeString('es-ES');
  res.json({
    mensaje: `¡Conexión exitosa! Hora del servidor: ${horaActual}`,
  });
});

// 📦 Ruta para obtener productos
app.get('/api/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener datos:', err.message);
    res.status(500).send('Error al obtener datos de la base de datos');
  }
});

// 🏭 Servir frontend compilado en producción (si existe)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
}

// 🔹 Catch-all para SPA o rutas no encontradas
app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    // En producción, devolver index.html de SPA
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  } else {
    // En desarrollo, devolver 404 simple
    res.status(404).send('Ruta no encontrada');
  }
});

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  console.log(`👉 URL local: http://localhost:${PORT}/api`);
});
