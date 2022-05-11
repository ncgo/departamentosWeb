<script setup lang="ts"></script>

<template>
  <main>
    <div class="circle"></div>
    <h1>Home</h1>
    <h3>Welcome to uchi</h3>
    <div id="messages">
      <h2>Latest Messages</h2>
      <table>
        <router-link to="/messages/message/1">
          <tr class="msg">
            <td class="image">
              <img
                src="../assets/logo-uchi-encima-morado.png"
                alt=""
                class="imgSender"
              />
            </td>
            <td class="text">
              <p class="sender">[ADMIN]</p>
              <p class="msgSubject">[Message subject]</p>
              <p class="date">[date sent]</p>
            </td>
          </tr>
        </router-link>
      </table>
    </div>
    <div id="amenities">
      <h2>Amenities</h2>
      <div class="amenity"></div>
      <div class="servicio"></div>
    </div>

    <div id="reports">
      <h2>Reportes</h2>
      <table>
        <tr>
          <th>Report #</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>[#XXXXX]</td>
          <td>[Humedad en las paredes del baño]</td>
          <td>[EN PROCESO]</td>
        </tr>
      </table>
    </div>
  </main>
</template>

<style scoped>
  main {
    padding: 1.5rem;
    text-align: center;
    overflow-x: hidden;
  }
  .circle {
    height: 20vh;
    width: 150vw;
    /* width: 100vw; */
    background: rgb(123, 44, 191);
    background: linear-gradient(
      297deg,
      rgba(123, 44, 191, 1) 43%,
      rgba(157, 78, 221, 1) 84%
    );
    border-radius: 50%;
    position: absolute;
    top: -7vh;
    left: -25vw;
    z-index: 0;
  }
  h1 {
    color: white;
    font-weight: bold;
  }

  h3 {
    color: white;
  }

  h2,
  th {
    font-weight: bold;
  }

  #messages {
    margin-top: 2vh;
  }

  #amenities {
    margin-top: 2vh;
  }

  .amenity,
  .servicio {
    height: 18vh;
    background: rgb(123, 44, 191);
    background: linear-gradient(
      297deg,
      rgba(123, 44, 191, 1) 43%,
      rgba(157, 78, 221, 1) 84%
    );
    width: 30%;
    border-radius: 90px;
    -webkit-box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 1);
    box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 1);
    margin: 1vh;
  }

  .amenity::after {
    height: 2vh;
    width: 2vh;
    background-color: red;
    border-radius: 50%;
  }

  table {
    width: 100%;
  }
  .image {
    width: 20%;
    display: flex;
    justify-content: center;
  }

  .text {
    width: 80%;
    padding: 0 1vw;
  }
  .imgSender {
    height: 2.5rem;
    border-radius: 50%;
    -webkit-box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 1);
    box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 1);
  }

  .sender {
    font-weight: bold;
    text-align: left;
  }

  .msgSubject {
    text-align: left;
  }

  .msg {
    display: flex;
    align-items: center;
    border: solid #7b2cbf;
    border-radius: 15px;
    margin-bottom: 1vh;
    width: 100%;
    -webkit-box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.8);
    box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.8);
    padding: 0.3rem;
  }

  .date {
    font-size: 0.7rem;
    text-align: right;
  }

  a {
    text-decoration: none;
    color: #7b2cbf;
  }

  a:visited {
    color: black;
  }
</style>
