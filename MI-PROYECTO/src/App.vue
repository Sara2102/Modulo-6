<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav {
  background-color: #333;
  padding: 1rem;
}
nav a {
  color: #fff;
  margin-right: 1rem;
  text-decoration: none;
}
</style>
