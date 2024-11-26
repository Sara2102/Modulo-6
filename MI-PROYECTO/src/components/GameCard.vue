<template>
  <div class="game-card">
    <!-- Mostrar la imagen del juego -->
    <img :src="game.background_image" :alt="game.name" />
    
    <!-- Mostrar el nombre del juego -->
    <h2>{{ game.name }}</h2>
    
    <!-- Otras informaciones del juego si lo deseas -->
    <button @click="goToOpinion">Ver Opiniones</button>
  </div>
</template>

<script>
export default {
  props: {
    game: Object, // Recibe el objeto del juego
  },
  methods: {
    goToOpinion() {
      this.$emit('opinion', this.game.name); // Emite el nombre del juego cuando se hace clic
    },
  },
};
</script>

<style scoped>
.game-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
}

.game-card img {
  width: 100%;
  height: 200px; /* Puedes ajustar el tamaño de la imagen */
  object-fit: cover;
  border-radius: 8px;
}

.game-card h2 {
  margin-top: 10px;
  font-size: 1.2em;
}

.game-card button {
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.game-card button:hover {
  background-color: #0056b3;
}
</style>
