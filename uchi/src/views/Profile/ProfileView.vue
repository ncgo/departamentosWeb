<script setup lang="ts">
import { ref } from "vue";
import router from "../../router";

const userID = localStorage.getItem("userID");

const userRef = ref({});
//!---------------------------------------------------------------------------------------------------------------------
const api = "http://localhost:3001/api/user";

async function fetchUser() {
  const response = await fetch(`${api}/${userID}`);
  const user = await response.json();
  return user;
}

fetchUser().then((user) => {
  console.log(user.user);
  userRef.value = user.user;
  console.log(userRef.value);
});

const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userID");
  localStorage.removeItem("userFName");
  localStorage.removeItem("userLName");
  localStorage.removeItem("role");
  router.push("/login");
};
</script>

<template>
  <main>
    <div id="circle"></div>
    <h1>User Profile</h1>
    <img src="../../assets/user.png" alt="" class="profileImage" />
    <div class="content">
      <h2>{{ userRef.firstName }} {{ userRef.lastName }}</h2>
      <h3>{{ userRef.tower }} {{ userRef.apartment }}</h3>
      <table>
        <tr>
          <td class="title">Email</td>
          <td>{{ userRef.email }}</td>
        </tr>
        <tr>
          <td class="title">Phone</td>
          <td>{{ userRef.phone }}</td>
        </tr>
      </table>
      <p class="title">Emergency contact</p>
      <p>[FirstName] [LastName]</p>
      <p class="relationship">[Relationship]</p>
      <p>[+52 XXX XXX XXXXX]</p>
    </div>

    <p class="role"><span class="title">Role: </span> User</p>
    <router-link class="button" to="/profile/edit">Edit</router-link>
    <button class="button" @click="signOut">Sign Out</button>
  </main>
</template>

<script lang="ts">
export default {
  name: "Profile",
  data() {
    return {};
  },
  components: {},
};
</script>
<style scoped>
main {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
}

#circle {
  height: 30vh;
  width: 150vw;
  background: rgb(123, 44, 191);
  background: linear-gradient(
    297deg,
    rgba(123, 44, 191, 1) 43%,
    rgba(157, 78, 221, 1) 84%
  );
  border-radius: 50%;
  position: fixed;
  top: 0;
  left: -25vw;
  z-index: 0;
}
.content {
  border-radius: 25px;
  padding: 3vh 2vw;
  padding-top: 6vh;
  color: white;
  width: 80vw;
  background: rgb(123, 44, 191);
  background: linear-gradient(
    297deg,
    rgba(123, 44, 191, 1) 43%,
    rgba(157, 78, 221, 1) 84%
  );
  -webkit-box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 1);
  box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 1);
}

h1,
h2 {
  text-align: center;
  font-weight: bold;
  color: white;
}

.profileImage {
  height: 30vh;
  width: 30vh;
  align-self: center;
  margin-bottom: -8vh;
  z-index: 10;
}

.title {
  font-weight: bold;
}

table {
  margin: 1vh 0;
  margin-left: auto;
  margin-right: auto;
}

.role {
  color: #777;
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
  margin-top: 5vh;
  border: 0;
}

.button:hover {
  cursor: pointer;
}

@media (orientation: landscape) {
  .content {
    width: 50%;
  }
}
</style>
