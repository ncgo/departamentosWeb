<script setup lang="ts"></script>

<template>
  <main>
    <div id="circle"></div>
    <h1 v-if="create == true">Create User Profile</h1>
    <img src="../../assets/user.png" alt="" class="profileImage" />
    <div class="content">
      <form>
        <h2>Personal Information</h2>
        <div class="formGroup">
          <label for="firstName" class="title">First Name(s): </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            v-model="user.firstName"
          />
        </div>
        <div class="formGroup">
          <label for="lastName" class="title">Last Name(s): </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            v-model="user.lastName"
          />
        </div>
        <div class="formGroup">
          <label for="birthdate" class="title">Birthday: </label>
          <input
            type="text"
            id="birthdate"
            name="birthdate"
            required
            v-model="user.birthdate"
          />
        </div>
        <div class="formGroup">
          <label for="email" class="title">Email: </label>
          <input
            type="text"
            id="email"
            name="email"
            required
            v-model="user.email"
          />
        </div>
        <div class="formGroup">
          <label for="phone" class="title">Phone #: </label>
          <input
            type="text"
            id="phone"
            name="phone"
            required
            v-model="user.phone"
          />
        </div>

        <h2>Emergency Contact Information</h2>
        <div class="formGroup">
          <label for="firstNameEmergency" class="title">First Name(s): </label>
          <input
            type="text"
            id="firstNameEmergency"
            name="firstNameEmergency"
            required
            v-model="user.emergencyContact.firstName"
          />
        </div>
        <div class="formGroup">
          <label for="lastNameEmergency" class="title">Last Name(s): </label>
          <input
            type="text"
            id="lastNameEmergency"
            name="lastNameEmergency"
            required
            v-model="user.emergencyContact.lastName"
          />
        </div>
        <div class="formGroup">
          <label for="relationship" class="title">Relationship: </label>
          <input
            type="text"
            id="relationship"
            name="relationship"
            required
            v-model="user.emergencyContact.relationship"
          />
        </div>
        <div class="formGroup">
          <label for="phoneEmergency" class="title">Phone #: </label>
          <input
            type="text"
            id="phoneEmergency"
            name="phoneEmergency"
            required
            v-model="user.emergencyContact.phone"
          />
        </div>
        <button class="button" @click="createUser" v-if="create == true">
          Create
        </button>
      </form>
    </div>
  </main>
</template>

<script lang="ts">
  export default {
    name: 'Profile',
    data() {
      return {
        create: true,
        user: {
          firstName: '',
          lastName: '',
          birthdate: '',
          email: '',
          role: '',
          phone: '',
          tower: '',
          apartment: '',
          emergencyContact: {
            firstName: '',
            lastName: '',
            relationship: '',
            phone: '',
          },
        },
      }
    },
    components: {},
    methods: {
      async createUser() {},
    },
  }
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
</style>
