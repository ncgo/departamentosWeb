<script setup lang="ts">

  import { ref, useAttrs } from "@vue/runtime-core";
  const tower = localStorage.getItem("tower");
  const api = import.meta.env.VITE_HOST + "/api/message";
  const messages = ref([{
    _id: "",
    adminName: "",
    subject: "",
    date: "",
    
  }]);

  const getMessages = async () => {
    const res = await fetch(`${api}/${tower}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json());
    messages.value = res.messages;
    console.log(res);
  };

  getMessages();


</script>

<template>
    <h1>Messages</h1>
    <div class="content">
      <table>
        <router-link
          v-for="(message, index) in messages"
          :key="index"
          :to="`/messages/message/${message._id}`"
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
              <p class="sender">[ADMIN] {{ message.adminName }}</p>
              <p class="msgSubject">[Message subject] {{message.subject}} </p>
              <p class="date">[date sent] {{message.date}}</p>
            </td>
          </tr>
        </router-link>
      </table>
      <div class="message"><router-view></router-view></div>
    </div>
       
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
