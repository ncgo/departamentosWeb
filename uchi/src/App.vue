<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Header from './components/Layout/Header.vue'
  import Tabs from './components/Layout/Tabs.vue'


  // if not token, go to /login 

    const token = localStorage.getItem("token");
    if(window.location.pathname !== "/login" && !token) {
      window.location.href = "/login";
    }
</script>

<template>
  <div id="app">
    <Header v-if="$route.path !== '/login'" />
    <div id="content">
      <RouterView />
    </div>
    <Tabs v-if="$route.path !== '/login'"/>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'App',
    data() {
      return {}
    },
    components: {
      Header,
      Tabs,
    },
  }
</script>

<style>
  @import './assets/base.css';
  Header {
    height: 10vh;
  }

  #content {
    height: 82vh;
  }

  Tabs {
    height: 10vh;
  }
</style>
