import { defineStore } from 'pinia';

export const useOpinionsStore = defineStore('opinions', {
  state: () => ({
    opinions: [], // Lista de opiniones
  }),
  actions: {
    addOpinion(opinion) {
      const newOpinion = {
        id: Date.now(), // Generar ID único
        ...opinion,
      };
      console.log('Agregando opinión:', newOpinion);
      this.opinions.push(newOpinion);
    },
    editOpinion(id, updatedOpinion) {
      const index = this.opinions.findIndex(op => op.id === id);
      if (index !== -1) {
        console.log('Editando opinión:', this.opinions[index]);
        this.opinions[index] = { ...this.opinions[index], ...updatedOpinion };
        console.log('Opinión actualizada:', this.opinions[index]);
      } else {
        console.warn(`Opinión con ID ${id} no encontrada para editar.`);
      }
    },
    deleteOpinion(id) {
      console.log('Intentando eliminar opinión con ID:', id);
      this.opinions = this.opinions.filter(op => op.id !== id);
      console.log('Opiniones después de eliminar:', this.opinions);
    },
    getOpinionById(id) {
      return this.opinions.find(op => op.id === id);
    },
  },
});
