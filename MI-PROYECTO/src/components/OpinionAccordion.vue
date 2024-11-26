<template>
  <div>
    <div v-for="(opinion, index) in opinions" :key="index">
      <h3>{{ opinion.author }}</h3>
      <p>{{ opinion.text }}</p>
      <button @click="$emit('edit', index)">Editar</button>
      <button @click="$emit('delete', index)">Eliminar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    opinions: Array,
  },
};
</script>
