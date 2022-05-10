<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderVue from "./components/Layout/Header.vue";
</script>

<template>
  <HeaderVue />
  <RouterView />
</template>

<style>
@import "./assets/base.css";
</style>
