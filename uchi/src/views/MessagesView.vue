<script setup lang="ts"></script>

<template>
  <main>
    <!--h1>Messages</h1>
    <div class="content">
      <table>
        <router-link
          v-for="index in 5"
          :key="index"
          :to="`/messages/message/${index}`"
        >
          <tr class="msg">
            <td class="image">
              <img
                src="../assets/logo-uchi-encima-morado.png"
                alt=""
                class="imgSender"
              />
            </td>
            <td class="text">
              <p class="sender">[ADMIN] {{ index }}</p>
              <p class="msgSubject">[Message subject]</p>
              <p class="date">[date sent]</p>
            </td>
          </tr>
        </router-link>
      </table>
      <div class="message"><router-view></router-view></div>
    </div-->
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Kodoti Chat</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css">
        <link rel="stylesheet" href="./style.css">
    </head>

    <body>
        <section id="messages" class="hero is-fullheight">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Mensajes</h1>
                    <h2 class="subtitle">Creado por Equipo 5</h2>

                    <template v-if="step === 'nick'">
                        <div class="columns">
                            <div class="column is-6">
                                <div class="field has-addons">
                                    <div class="control is-expanded">
                                        <input v-model="nick" class="input is-medium" type="text"
                                            placeholder="Ingrese su nick">
                                    </div>
                                    <div class="control">
                                        <a @click="signIn" class="button is-info is-medium">
                                            Ingresar
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div v-if="messages.length" class="chat-container">
                            <div v-for="item in messages" :class="{ 'has-text-right': nick === item.nick }">
                                <div class="box chat-message" :class="{ 'me': nick === item.nick }">
                                    <span class="has-text-weight-bold">{{ item.nick }}</span> - {{ item.message }}
                                    <span
                                        class="is-italic has-text-grey-light is-size-7">{{ new Date(item.date).toLocaleDateString() }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="field has-addons">
                            <div class="control is-expanded">
                                <input v-model="message" class="input is-medium" type="text"
                                    placeholder="Ingrese el mensaje">
                            </div>
                            <div class="control">
                                <a @click="send" class="button is-info is-medium">
                                    Enviar
                                </a>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <footer v-if="step === 'chat'" class="hero-foot">
                <div class="container section has-text-centered">
                    <p>Conectado como <b>{{ nick }}</b></p>
                </div>
            </footer>
        </section>

        <script src="/socket.io/socket.io.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vue"></script>
        <script src="./chat.js"></script>
    </body>
  </main>
</template>

<style scoped>
  main {
    padding: 1.5rem;
  }

  .content {
    display: flex;
    justify-content: space-between;
  }

  .message {
    width: 45vw;
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
  }

  .msg {
    display: flex;
    align-items: center;
    border: solid #7b2cbf;
    border-radius: 15px;
    margin-bottom: 1vh;
    width: 40vw;

    -webkit-box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.8);
    box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.8);
  }

  .date {
    font-size: 0.7rem;
    text-align: right;
  }

  table {
    height: 70vh;
    overflow-y: scroll;
  }
  a {
    text-decoration: none;
    color: #7b2cbf;
  }

  a:visited {
    color: black;
  }

  @media (orientation: portrait) {
    .content {
      display: flex;
      flex-direction: column-reverse;
    }
    table {
      width: 100%;
      height: 50vh;

      overflow-y: scroll;
    }

    .msg {
      margin-left: auto;
      margin-right: auto;
      width: 100%;
    }
    .message {
      width: 100%;
      margin-bottom: 2.5vh;
    }
  }
</style>
