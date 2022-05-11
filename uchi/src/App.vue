<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Header from './components/Layout/Header.vue'
  import Tabs from './components/Layout/Tabs.vue'
</script>

<template>
  <div id="app">
    <Header />
    <div id="content">
      <RouterView />
    </div>
    <Tabs />
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
    overflow-y: scroll;
  }

  Tabs {
    height: 10vh;
  }
</style>
