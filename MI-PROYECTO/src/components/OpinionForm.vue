<template>
  <div>
    <input v-model="author" placeholder="Tu nombre" />
    <input v-model="surname" placeholder="Tu apellido" />
    
    <!-- Combobox para la calificación -->
    <label for="gameRating">¿Te gusta el juego?</label>
    <select v-model="rating" id="gameRating">
      <option value="yes">Sí</option>
      <option value="no">No</option>
    </select>

    <!-- Campo de opinión -->
    <textarea v-model="opinion" placeholder="Escribe tu opinión sobre el juego"></textarea>

    <!-- Nombre del juego (opcional) -->
    <input v-model="gameName" placeholder="Nombre del juego" />

    <button @click="submitOpinion">{{ isEdit ? 'Actualizar' : 'Agregar' }}</button>
  </div>
</template>

<script>
export default {
  props: {
    isEdit: Boolean,
    currentOpinion: String,
    currentGameName: String,
    currentRating: String,
    currentAuthor: String,
    currentSurname: String,
  },
  data() {
    return {
      opinion: this.currentOpinion || '',
      gameName: this.currentGameName || '',
      rating: this.currentRating || '', // Rating: 'yes' or 'no'
      author: this.currentAuthor || '',
      surname: this.currentSurname || '',
    };
  },
  methods: {
    submitOpinion() {
      // Validar que todos los campos necesarios estén completos
      if (!this.author || !this.surname || !this.gameName || !this.rating) {
        alert('Por favor, llena todos los campos.');
        return;
      }

      // Emitir los datos al componente padre
      this.$emit('submit', {
        opinion: this.opinion,
        gameName: this.gameName,
        rating: this.rating, // Guardamos si le gusta o no el juego
        author: this.author,
        surname: this.surname,
      });
    },
  },
};
</script>
