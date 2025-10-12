<script setup>
import { ref, onMounted } from 'vue'

const usuarios = ref([]); // Lista de usuarios

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:5000/api/users')
    const data = await res.json()
    usuarios.value = data 
  } catch (error) {
    console.error("Error al conectar con el backend:", error);
  }
})
</script>

<template>
  <div class="proyecto-container">
    <h1>Usuarios desde PostgreSQL:</h1>
    <ul>
      <li v-for="usuario in usuarios" :key="usuario.id">{{ usuario.Jean }}</li>
>
    </ul>
  </div>
</template>


<style scoped>
/* Estilos ajustados para mejor visibilidad */
.proyecto-container {
  text-align: center;
  margin-top: 4em;
  padding: 2em;
  border: 2px solid #42b883;
  border-radius: 12px;
  background-color: #2c3e50; /* Fondo más oscuro */
  color: white;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.proyecto-container h1 {
  color: #42b883;
  font-size: 1.8em;
  margin-bottom: 0.8em;
  border-bottom: 2px dashed #42b88355;
  padding-bottom: 0.5em;
}

.proyecto-container p {
  font-size: 1.6em;
  font-weight: 700;
  color: #f3f4f6;
  padding: 0.5em 0;
}
</style>
