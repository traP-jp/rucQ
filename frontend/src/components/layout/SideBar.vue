<script setup lang="ts"></script>

<template>
  <v-navigation-drawer color="blue" width="300">
    <img src="@/assets/rucQ_icon.svg" alt="rucQ Icon" class="logo"/>
    <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
    <v-divider></v-divider>
    <v-list-item link title="List Item 1"></v-list-item>
    <v-list-item link title="List Item 2"></v-list-item>
    <v-list-item link title="List Item 3"></v-list-item>
  </v-navigation-drawer>
</template>

<style scoped>
.v-navigation-drawer {
  height: 100vh;
  background-color:  var(--color-white);
  width: 15% !important;
}
.logo {
  width: 100px;
  margin: 16px auto;
}
</style>