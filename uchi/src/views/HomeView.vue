<script setup lang="ts">
  import { ref } from '@vue/runtime-dom'
  import ServicesAvailable from '../components/Reserve/ServicesAvailable.vue'
  import router from '../router'
  const role = localStorage.getItem('role')
  const tower = localStorage.getItem('tower')
  const subject = ref('')
  const message = ref('')

  const lastMessage = ref({
    subject: '',
    adminName: '',
    date: '',
    _id: '',
  })

  const activeReports = ref([
    {
      _id: '',
      subject: '',
      description: '',
      status: '',
      updatedAt: '',
    },
  ])

  const api = import.meta.env.VITE_HOST + '/api/message'

  async function sendMessage() {
    const admin = localStorage.getItem('userID')
    const tower = localStorage.getItem('tower')

    const data = {
      admin: admin,
      tower: tower,
      message: message.value,
      subject: subject.value,
    }

    await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resObject) => {
        if (resObject.ok) {
          message.value = ''
          subject.value = ''
        } else {
          alert(resObject.message)
        }
      })
  }

  async function getMessages() {
    const data = {
      tower: tower,
    }

    await fetch(`${api}/first/${tower}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resObject) => {
        if (resObject.ok) {
          lastMessage.value = resObject.messages
        } else {
          // alert(resObject.message);
        }
      })
  }

  async function getReports() {
    const userID = localStorage.getItem('userID')
    const api = import.meta.env.VITE_HOST + '/api/report'

    if (role == 'user') {
      await fetch(`${api}/user/${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Allow-Control-Allow-Origin': '*',
        },
      })
        .then((res) => res.json())
        .then((resObject) => {
          if (resObject.ok) {
            activeReports.value = resObject.reports
          } else {
            alert(resObject.message)
          }
        })
    } else {
      await fetch(`${api}/tower/${tower}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Allow-Control-Allow-Origin': '*',
        },
      })
        .then((res) => res.json())
        .then((resObject) => {
          if (resObject.ok) {
            activeReports.value = resObject.reports
          } else {
            alert(resObject.message)
          }
        })
    }
  }

  function toReport(id) {
    router.push('/reports/' + id)
  }

  getMessages()
  getReports()
</script>

<template>
  <main>
    <div class="circle"></div>
    <div id="greeting">
      <h1>Home</h1>
      <h3>Welcome to uchi</h3>
    </div>
    <div v-if="role === 'tenant'" id="messages">
      <h2>Latest Messages</h2>
      <table>
        <router-link :to="`/messages/message/${lastMessage._id}`">
          <tr class="msg">
            <td class="image">
              <img
                src="../assets/logo-uchi-encima-morado.png"
                alt=""
                class="imgSender"
              />
            </td>
            <td class="text">
              <p class="sender">{{ lastMessage.adminName }}</p>
              <p class="msgSubject">{{ lastMessage.subject }}</p>
              <p class="date">{{ lastMessage.date }}</p>
            </td>
          </tr>
        </router-link>
      </table>
    </div>

    <div v-else id="messages-admin">
      <h2>New Message</h2>
      <form @submit.prevent="sendMessage">
        <div class="form-group">
          <label for="subject">Subject</label>
          <input
            type="text"
            class="form-control"
            id="subject"
            v-model="subject"
            placeholder="Enter subject"
          />
          <textarea
            class="form-control"
            id="message"
            rows="3"
            placeholder="Enter message"
            v-model="message"
          ></textarea>
          <button type="submit" class="btn btn-primary">Send</button>
        </div>
      </form>
    </div>

    <div id="amenities">
      <h2>Amenities</h2>
      <!-- Services Available lavanderia  -->

      <ServicesAvailable :type="'lavanderia'" />
      <ServicesAvailable :type="'sala'" />
      <ServicesAvailable :type="'cine'" />
      <ServicesAvailable :type="'alberca'" />

      <router-link to="/reserve" class="button" style="color: white"
        >See more</router-link
      >
      <div v-if="role === 'admin'" id="messages">
        <router-link :to="{ name: 'Users View' }" class="button"
          >Edit users</router-link
        >
      </div>
    </div>

    <div id="reportsSection">
      <div id="reports">
        <h2>Active Reports</h2>
        <table>
          <tr>
            <th>Report #</th>
            <th>Updated At</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
          <tr
            @click="toReport(report._id)"
            class="tableRow"
            v-for="report in activeReports"
            :key="report['_id']"
            :report="report"
          >
            <td># {{ report._id.substring(17) }}</td>
            <td>{{ report.updatedAt.substring(0, 10) }}</td>
            <td>{{ report.subject }}</td>
            <td>{{ report.status }}</td>
          </tr>
        </table>
      </div>
    </div>
  </main>
</template>

<style scoped>
  main {
    padding: 1vh 4vw;
    text-align: center;
    overflow-x: hidden;
  }
  #greeting {
    height: 13vh;
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
    margin: 2vh 0;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .amenity img {
    width: 100%;
    object-fit: contain;
  }

  .false {
    color: #f42c04;
  }

  .true {
    color: #5aff15;
  }

  table {
    width: 100%;
  }

  #messages-admin {
    margin-top: 2vh;
  }
  .text {
    padding: 0 1vw;
    width: 80%;
  }
  .imgSender {
    height: 3rem;
    border-radius: 50%;
    -webkit-box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 1);
    box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 1);
  }

  form {
    display: block;
    width: 100%;
    margin: 0 auto;
    border: solid #7b2cbf;
    border-radius: 10px;
    padding: 1rem;
  }

  @media (min-width: 991px) {
    form {
      width: 50%;
    }
    .msg {
      display: flex;
      align-items: center;
      border: solid #7b2cbf;
      border-radius: 15px;
      margin-bottom: 1vh;
      -webkit-box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.8);
      box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.8);
      padding: 0.3rem;
    }
  }

  .form-group textarea {
    width: 100%;
    resize: none;
    margin-bottom: 2vh;
    border: #7b2cbf solid 2px;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }

  .form-group textarea:active,
  .form-group textarea:focus {
    outline: none;
  }

  .form-group button {
    padding: 0.5rem;
    width: 10rem;
    border: none;
    background-color: #7b2cbf;
    color: white;
    border-radius: 0.5rem;
  }

  .form-group button:hover {
    cursor: pointer;
    background-color: #8f48cd;
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

  .button {
    background: rgb(123, 44, 191);
    background: linear-gradient(
      297deg,
      rgba(123, 44, 191, 1) 43%,
      rgba(157, 78, 221, 1) 84%
    );
    border-radius: 10px;
    color: white;
    padding: 0.5rem 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin-top: 2.5vh;
    border: 0;
    font-weight: bold;
  }

  .button a {
    color: white;
  }

  #reports {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f9f4f5;
    padding: 1.5rem;
    border-radius: 25px;
    -webkit-box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.27);
    box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.27);
    width: 50vw;
    margin: 0;
    text-align: center;
  }

  #reports table {
    width: 100%;
  }

  #reportsSection {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  th {
    border-bottom: #7b2cbf solid;
    border-collapse: collapse;
    color: #7b2cbf;
    font-weight: bold;
  }
  @media (orientation: landscape) {
    table {
      width: 40%;
      text-align: center;
    }

    #messages {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .imgSender {
      height: 3.5rem;
    }

    .amenity,
    .servicio {
      height: 40vh;
      width: 15%;
      min-width: 200px;
    }

    .pills {
      display: flex;
      justify-content: space-around;
    }
  }
</style>
