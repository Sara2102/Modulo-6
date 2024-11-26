<template>
  <div class="admin-container">
    <h1 class="admin-title">Accede a tu resumen de cuenta</h1>

    <!-- Formulario de validación de nombre y apellido -->
    <form @submit.prevent="validateUser" class="validation-form">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input
          v-model="name"
          type="text"
          id="name"
          placeholder="Ingresa tu nombre"
          required
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="surname">Apellido</label>
        <input
          v-model="surname"
          type="text"
          id="surname"
          placeholder="Ingresa tu apellido"
          required
          class="form-control"
        />
      </div>
      <button type="submit" class="submit-button">Verificar Usuario</button>
    </form>

    <!-- Mostrar el botón para redirigir a Resumen si es un usuario válido -->
    <div v-if="isValidUser" class="summary-button-container">
      <router-link
        :to="{ name: 'resumen', params: { name: name, surname: surname, opinions: userOpinions } }"
        class="show-summary-button"
      >
        Ver Resumen
      </router-link>
    </div>
  </div>
</template>

<script>
import { useOpinionsStore } from "../store/opinionsStore";

export default {
  data() {
    return {
      name: "",
      surname: "",
      isValidUser: false,
      userOpinions: [],
    };
  },
  methods: {
    validateUser() {
      const matchedOpinions = this.opinionsStore.opinions.filter(
        (opinion) =>
          opinion.author.toLowerCase() === this.name.toLowerCase() &&
          opinion.surname.toLowerCase() === this.surname.toLowerCase()
      );

      if (matchedOpinions.length > 0) {
        this.isValidUser = true;
        this.userOpinions = matchedOpinions;
      } else {
        alert("No se encontró una opinión con ese nombre y apellido.");
        this.isValidUser = false;
      }
    },
  },
  computed: {
    opinions() {
      return this.opinionsStore.opinions;
    },
  },
  setup() {
    const opinionsStore = useOpinionsStore();
    return { opinionsStore };
  },
};
</script>


<style scoped>
/* Copia los estilos de tu diseño anterior */
</style>


<style scoped>
/* Estilos generales para el contenedor de administración */
.admin-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.admin-title {
  text-align: center;
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 30px;
  font-weight: bold;
}

/* Estilos del formulario */
.validation-form {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.validation-form .form-group {
  margin-bottom: 20px;
}

.validation-form .form-group label {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 8px;
  display: block;
}

.validation-form .form-group input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.validation-form .form-group input:focus {
  border-color: #008cba;
  outline: none;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #008cba;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
}

.submit-button:hover {
  background-color: #006f8a;
}

/* Estilos del contenedor del botón de resumen */
.summary-button-container {
  margin-top: 20px;
}

.show-summary-button {
  display: block;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  font-size: 1.2rem;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  width: 100%;
}

.show-summary-button:hover {
  background-color: #45a049;
}
</style>