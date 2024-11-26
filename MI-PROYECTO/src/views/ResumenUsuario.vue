<template>
  <div class="summary-container">
    <h1 class="summary-title">Resumen de Opiniones</h1>

    <div v-if="userOpinions.length > 0" class="opinions-summary">
      <div v-for="(opinion, index) in userOpinions" :key="index" class="opinion-item">
        <p><strong>Nombre Usuario:</strong> {{ name }} {{ surname }}</p>
        <p><strong>Juego:</strong> {{ opinion.gameName }}</p>
        <p><strong>Le Gusta el Juego?:</strong> {{ opinion.rating }}</p>

        <!-- Agregar coins para el juego -->
        <div class="coins-container">
          <p>¿Deseas comprar coins para este juego?</p>
          <button @click="addCoins(opinion.gameName)" class="add-coins-btn">Agregar coins</button>

          <div class="coins-progress-container">
            <p>Cantidad de coins comprados: {{ coins[opinion.gameName] || 0 }}</p>
            <div :style="progressBarStyle(opinion.gameName)" class="progress-bar"></div>
            <p v-if="coins[opinion.gameName] == 50">¡Llegaste al máximo de tu crédito!</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No hay opiniones para este usuario.</p>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'; // Asegúrate de importar `computed` y `ref`
import { useOpinionsStore } from '../store/opinionsStore'; // Ruta al archivo del store

export default {
  props: {
    name: String, // Nombre del usuario
    surname: String, // Apellido del usuario
  },
  setup(props) {
    const opinionsStore = useOpinionsStore(); // Instancia del store
    const coins = ref({}); // Almacenará la cantidad de coins por juego de manera independiente

    // Filtrar opiniones por nombre y apellido
    const userOpinions = computed(() =>
      opinionsStore.opinions.filter(
        (opinion) =>
          opinion.author === props.name && opinion.surname === props.surname
      )
    );

    // Función para agregar coins
    const addCoins = (gameName) => {
      let currentCoins = coins.value[gameName] || 0;
      currentCoins = Math.min(currentCoins + 10, 50); // Asegurarse que no sobrepasen los 50 coins
      coins.value[gameName] = currentCoins;
    };

    // Estilo de la barra de progreso basado en la cantidad de coins
    const progressBarStyle = (gameName) => {
      const currentCoins = coins.value[gameName] || 0;
      let color = 'green'; // Color por defecto

      if (currentCoins > 30) {
        color = 'red'; // Rojo si supera los 30 coins
      } else if (currentCoins >= 20) {
        color = 'yellow'; // Amarillo si está entre 20 y 30 coins
      }

      const width = Math.min(currentCoins * 2, 100); // Ancho de la barra (máximo 100%)
      return {
        width: `${width}%`,
        backgroundColor: color,
        height: '10px',
        borderRadius: '5px',
      };
    };

    return { userOpinions, addCoins, coins, progressBarStyle };
  },
};
</script>

<style scoped>
/* Estilos del resumen de opiniones */
.summary-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f4f7fb;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.summary-title {
  text-align: center;
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 20px;
}

.opinions-summary .opinion-item {
  padding: 20px;
  background-color: #ffffff;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.opinions-summary .opinion-item p {
  margin: 0;
  font-size: 1.1rem;
  color: #444;
}

/* Estilos de la barra de progreso */
.coins-container {
  margin-top: 20px;
}

.add-coins-btn {
  background-color: #f39c12;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
}

.add-coins-btn:hover {
  background-color: #e67e22;
}

.coins-progress-container {
  margin-top: 10px;
}

.progress-bar {
  margin-top: 10px;
}

.progress-bar p {
  font-size: 0.9rem;
  color: #444;
}
</style>
