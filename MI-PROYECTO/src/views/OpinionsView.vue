<template>
  <div class="opinions-container">
    <h1 class="page-title">Escribe tu opinión sobre el juego: "{{ $route.params.gameName }}"</h1>

    <!-- Formulario para añadir/editar opinión -->
    <div class="opinion-form-container">
      <form @submit.prevent="handleOpinion">
        <div class="form-group">
          <label for="username">Tu nombre</label>
          <input
            v-model="currentAuthor"
            type="text"
            id="username"
            placeholder="Ingresa tu nombre"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="surname">Tu apellido</label>
          <input
            v-model="currentSurname"
            type="text"
            id="surname"
            placeholder="Ingresa tu apellido"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="opinion">Tu opinión</label>
          <textarea
            v-model="currentOpinion"
            id="opinion"
            placeholder="Escribe tu opinión sobre el juego"
            required
            class="form-control"
            rows="5"
          ></textarea>
        </div>
        <div class="form-group">
          <label>¿Te gusta el juego?</label>
          <div class="rating-buttons">
            <button
              :class="{ active: currentRating === 'si' }"
              type="button"
              @click="currentRating = 'si'"
            >
              Sí
            </button>
            <button
              :class="{ active: currentRating === 'no' }"
              type="button"
              @click="currentRating = 'no'"
            >
              No
            </button>
          </div>
        </div>
        <button type="submit" class="submit-button">
          {{ isEditing ? 'Actualizar Opinión' : 'Enviar Opinión' }}
        </button>
      </form>
    </div>

    <!-- Lista de opiniones -->
    <div v-if="filteredOpinions.length" class="opinions-list">
      <div v-for="(opinion, index) in filteredOpinions" :key="opinion.id" class="opinion-item">
        <p class="opinion-text">"{{ opinion.text }}"</p>
        <p class="author">{{ opinion.author }} {{ opinion.surname }}</p>
        <div class="buttons-container">
          <button class="edit-button" @click="startEditing(index)">Editar</button>
          <button class="delete-button" @click="deleteOpinion(opinion.id)">Eliminar</button>
        </div>
      </div>
    </div>
    <div v-else class="no-opinions">No hay opiniones aún. Sé el primero en compartir la tuya.</div>
  </div>
</template>



  <script>
  import { useOpinionsStore } from "../store/opinionsStore";

  export default {
    data() {
      return {
        isEditing: false,
        currentOpinion: "",
        currentAuthor: "",
        currentSurname: "",
        currentRating: "",
        editingIndex: null,
      };
    },
    computed: {
      opinions() {
        return this.opinionsStore.opinions;
      },
      filteredOpinions() {
        const gameName = this.$route.params.gameName;
        return this.opinions.filter((opinion) => opinion.gameName === gameName);
      },
    },
    methods: {
      handleOpinion() {
        const opinionData = {
          id: this.isEditing
            ? this.opinions[this.editingIndex].id
            : new Date().getTime(),
          gameName: this.$route.params.gameName,
          text: this.currentOpinion,
          author: this.currentAuthor,
          surname: this.currentSurname,
          rating: this.currentRating,
        };

        if (this.isEditing) {
          this.opinionsStore.editOpinion(this.opinions[this.editingIndex].id, opinionData);
          this.isEditing = false;
        } else {
          this.opinionsStore.addOpinion(opinionData);
        }

        this.resetForm();
      },
      startEditing(index) {
        this.editingIndex = index;
        const opinion = this.filteredOpinions[index];
        this.currentOpinion = opinion.text;
        this.currentAuthor = opinion.author;
        this.currentSurname = opinion.surname;
        this.currentRating = opinion.rating;
        this.isEditing = true;
      },
      deleteOpinion(opinionId) {
        this.opinionsStore.deleteOpinion(opinionId);
      },
      resetForm() {
        this.currentOpinion = "";
        this.currentAuthor = "";
        this.currentSurname = "";
        this.currentRating = "";
      },
    },
    setup() {
      const opinionsStore = useOpinionsStore();
      return { opinionsStore };
    },
  };
  </script>
<style scoped>
/* Contenedor general */
.opinions-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}

/* Título */
.page-title {
  font-size: 1.8rem;
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

/* Formulario */
.opinion-form-container {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #555;
}

input,
textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  outline: none;
  transition: all 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

.rating-buttons {
  display: flex;
  gap: 10px;
}

.rating-buttons button {
  padding: 0.6rem 1.2rem;
  border: 1px solid #ccc;
  background: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.rating-buttons button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.rating-buttons button:hover {
  background: #e0e0e0;
}

.submit-button {
  display: block;
  width: 100%;
  background: #007bff;
  color: white;
  padding: 0.8rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-button:hover {
  background: #0056b3;
}

/* Opiniones */
.opinions-list {
  margin-top: 2rem;
}

.opinion-item {
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.opinion-text {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
}

.author {
  font-size: 1rem;
  color: #777;
}

/* Botones de edición/eliminación */
.buttons-container {
  display: flex;
  gap: 10px;
}

.edit-button,
.delete-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.edit-button {
  background: #4caf50;
  color: white;
}

.edit-button:hover {
  background: #388e3c;
}

.delete-button {
  background: #f44336;
  color: white;
}

.delete-button:hover {
  background: #d32f2f;
}

/* No opiniones */
.no-opinions {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
}
</style>
