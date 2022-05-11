<script setup lang="ts"></script>

<template>
  <section>
    <div class="msgHeader">
      <img
        src="../../assets/logo-uchi-encima-morado.png"
        alt=""
        class="imgSender"
      />
      <h2 class="sender">[ADMIN] {{ $route.params.id }}</h2>
      <p class="date">[date sent]</p>
    </div>

    <div class="content">
      <h1>[Message subject]</h1>
      ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum."]
    </div>
  </section>
</template>

<script lang="ts">
  export default {
    name: 'Profile',
    data() {
      return {}
    },
    components: {},
  }
</script>
<style scoped>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    -webkit-box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 1);
    box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 1);
    border-radius: 15px;
  }

  .msgHeader {
    padding: 1.5rem;
    background: rgb(123, 44, 191);
    background: linear-gradient(
      297deg,
      rgba(123, 44, 191, 1) 43%,
      rgba(157, 78, 221, 1) 84%
    );
    width: 100%;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    color: white;
  }

  h1 {
    text-align: center;
    font-weight: bold;
  }

  h2 {
    text-align: center;
    font-weight: bold;
  }

  .imgSender {
    height: 20%;
    width: 20%;
    align-self: center;
    z-index: 10;
  }

  table {
    margin: 1vh 0;
    margin-left: auto;
    margin-right: auto;
  }

  .role {
    color: #777;
  }

  .content {
    padding: 1.5rem;
  }
</style>
