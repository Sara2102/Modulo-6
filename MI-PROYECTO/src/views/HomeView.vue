<template>
  <div class="home-container">
    <h1 class="page-title">Lista de Juegos Disponibles</h1>

    <!-- Contenedor de los juegos -->
    <div class="games-grid">
      <!-- Recorremos la lista de juegos -->
      <div
        v-for="game in games"
        :key="game.id"
        class="game-card"
      >
        <!-- Imagen del juego -->
        <img :src="game.background_image" alt="Game Image" class="game-image" />
        <div class="game-details">
          <h2 class="game-title">{{ game.name }}</h2>
          <p class="game-rating">Clasificación: {{ game.rating.toFixed(2) }}</p>
          <p class="game-release">Lanzamiento: {{ game.released }}</p>
          <p class="game-update">Actualización: {{ game.updated }}</p>
          <!-- Botones de acción -->
          <div class="game-actions">
            <button @click="goToOpinion(game.name)" class="opinion-btn">Opinar</button>
            <!-- Botón "Me gusta" -->
            <button @click="goToAdminView" class="like-btn">
              <span role="img" aria-label="heart">❤️</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      games: [], // Lista de juegos
    };
  },
  mounted() {
    // Llamada a la API de juegos con tu clave de API
    fetch('https://api.rawg.io/api/games?key=604f30dc7e894c58bdf2ae4ab6905b73')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.results) {
          this.games = data.results;
        } else {
          console.error("No se encontraron juegos en la respuesta.");
        }
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  },
  methods: {
    // Método para navegar a la página de opiniones de un juego
    goToOpinion(gameName) {
      this.$router.push(`/opinions/${gameName}`);
    },

    // Método para redirigir a la vista de administración cuando se da "Me gusta"
    goToAdminView() {
      this.$router.push('/admin');
    }
  },
};
</script>

<style scoped>
/* Estilos para la vista de la página de inicio */
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.page-title {
  font-size: 36px;
  margin-bottom: 20px;
  color: #333;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-items: center;
}

.game-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
}

.game-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 2px solid #eee;
}

.game-details {
  padding: 15px;
}

.game-title {
  font-size: 24px;
  color: #333;
  margin: 10px 0;
}

.game-rating,
.game-release,
.game-update {
  font-size: 16px;
  color: #666;
  margin: 5px 0;
}

.game-actions {
  margin-top: 20px;
}

.opinion-btn,
.like-btn {
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
}

.opinion-btn {
  background-color: #007bff;
  color: white;
}

.opinion-btn:hover {
  background-color: #0056b3;
}

.like-btn {
  background-color: #f8d7da;
  color: #721c24;
}

.like-btn:hover {
  background-color: #f1b0b7;
}
</style>
