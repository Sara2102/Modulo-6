import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import OpinionsView from "../views/OpinionsView.vue";
import AdminView from "../views/AdminView.vue";
import ResumenUsuario from "../views/ResumenUsuario.vue"; // Componente resumen
import NotFound from "../views/NotFound.vue";

// Supongamos que tienes una fuente de datos donde almacenas las opiniones reales
// Esto podría ser un arreglo de opiniones que tienes en algún estado global o API
const getOpinionsForUser = (name, surname) => {
  // Aquí debería accederse a tus datos reales de opiniones.
  // Este es un ejemplo de cómo se filtrarían las opiniones reales por nombre y apellido.
  // Este arreglo es solo un ejemplo para demostrar cómo podrías hacerlo.

  // Asegúrate de reemplazar esto con la fuente real de tus opiniones.
  const opinions = [
    { author: "Juan", surname: "Lagos", gameName: "Juego 1", rating: "me gusta" },
    { author: "Juan", surname: "Lagos", gameName: "Juego 2", rating: "no me gusta" },
    // ... más opiniones reales
  ];

  // Filtrar opiniones por nombre y apellido
  return opinions.filter(
    (opinion) => opinion.author.toLowerCase() === name.toLowerCase() && opinion.surname.toLowerCase() === surname.toLowerCase()
  );
};

const routes = [
  { path: "/", name: "home", component: HomeView },
  {
    path: "/opinions/:gameName",
    name: "opinions",
    component: OpinionsView,
    props: true,
  },
  { path: "/admin", name: "admin", component: AdminView },
  {
    path: "/resumen/:name/:surname",
    name: "resumen",
    component: ResumenUsuario,
    props: (route) => {
      const { name, surname } = route.params;
      // Obtener las opiniones del usuario basado en el nombre y apellido
      const opinions = getOpinionsForUser(name, surname);
      return { name, surname, opinions };
    },
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
