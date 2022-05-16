<script setup lang="ts">
import { ref, useAttrs } from "@vue/runtime-core";
import { onMounted } from "vue";
import router from "../../router";
import { useRoute } from "vue-router";


const route = useRoute();
const userID = route.params.id;
const firstName = ref("");
const lastName = ref("");
const birthdate = ref("");
const email = ref("");
const phone = ref("");
const firstNameEmergency = ref("");
const lastNameEmergency = ref("");
const relationship = ref("");
const phoneEmergency = ref("");

const api = import.meta.env.VITE_HOST + "/api/user";

const changeUser = async (e: any) => {
  e.preventDefault();

  const User = {
    firstName: firstName.value,
    lastName: lastName.value,
    birthdate: birthdate.value,
    email: email.value,
    phone: phone.value,
  };
  console.log(User);

  const res = await fetch(`${api}/${userID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(User),
  });

  const resObject = await res.json();

  console.log(resObject);
  console.log(resObject.ok);

  if (resObject.ok) {
  } else {
    alert(resObject.message);
  }
};
</script>

<template>
  <main>
    <div id="circle"></div>
    <h1 v-if="create == true">Create User Profile</h1>
    <img src="../assets/user.png" alt="" class="profileImage" />
    <div class="content">
      <form @submit="changeUser">
        <h2>Personal Information</h2>

        <div class="firstName">
          <label for="firstName" class="title">First Name(s): </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            v-model="firstName"
          />
        </div>
        <div class="lastName">
          <label for="lastName" class="title">Last Name(s): </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            v-model="lastName"
          />
        </div>
        <div class="birthdate">
          <label for="birthdate" class="title">Birthday: </label>
          <input
            type="text"
            id="birthdate"
            name="birthdate"
            required
            v-model="birthdate"
          />
        </div>
        <div class="email">
          <label for="email" class="title">Email: </label>
          <input type="text" id="email" name="email" required v-model="email" />
        </div>
        <div class="phone">
          <label for="phone" class="title">Phone #: </label>
          <input type="text" id="phone" name="phone" required v-model="phone" />
        </div>
        <button type="submit">Edit User</button>
      </form>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  name: "Profile",
  data() {
    return {
      create: true,
    };
  },
  components: {},
  created: function()
  {
    this.fetchUser();
  },
  methods: {
    async createUser() {},
    async fetchUser() {
      const route = useRoute();
      const userID = route.params.id;
      const api = import.meta.env.VITE_HOST + "/api/user";
      const response = await fetch(`${api}/${userID}`);
      const user = await response.json();
      
      this.firstName= user.user.firstName
      this.lastName= user.user.lastName
      this.birthdate= user.user.birthDate
      this.email= user.user.email
      this.role= user.user.role
      this.phone= user.user.phone
      this.tower= user.user.tower
      this.apartment= user.user.apartment
      
    },
  },
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
  width: 80vw;
}

h1 {
  text-align: center;
  font-weight: bold;
  color: white;
}

.profileImage {
  height: 20vh;
  width: 20vh;
  align-self: center;
  margin-bottom: -6vh;
  z-index: 10;
}

.title {
  font-weight: bold;
}

.formGroup {
  display: flex;
  justify-content: space-between;
  margin: 1vh;
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
  border: none;
  margin-top: 1vh;
}

input {
  color: rgb(123, 44, 191);
  border: 2px solid rgb(123, 44, 191);
  border-radius: 5px;
}

@media (orientation: landscape) {
  .content {
    width: 50%;
  }
}
</style>
