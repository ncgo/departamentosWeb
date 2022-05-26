<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Header from './components/Layout/Header.vue'
  import Tabs from './components/Layout/Tabs.vue'


  // if not token, go to /login 

    const token = localStorage.getItem("token");
  
    //validate token expiration
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp;
      const now = Math.floor(Date.now() / 1000);
      if (now > exp) {
        localStorage.clear();
        window.location.href = "/login";
      }
    } else {
      if(window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
    }

    
</script>

<template>
  <div id="app" v-if="$route.path !== '/login'">
    <Header v-if="$route.path !== '/login' && $route.path !== '/profile/add' "  />
    <div id="content">
      <RouterView />
    </div>
    <Tabs v-if="$route.path !== '/login' && $route.path !== '/profile/add'"/>
  </div>
      <RouterView v-if="$route.path === '/login'"/>
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
