
<template>
  <div>

    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Users</h1>
        
      </div>
    </div><br />

    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <td>First Name</td>
          <td>Last Name</td>
          <td>Tower</td>
          <td>Email</td>
          <td>Phone</td>
          <td>Apartment</td>
          <td>Role</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.tower }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.apartment }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button class="btn blue" v-on:click="editUser(user._id)">
              Edit
            </button>

            <button class="btn btn-danger" v-on:click="deleteUser(user._id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "vue";
import router from "../router";

async function fetchUserss(users_ref){
  const api = import.meta.env.VITE_HOST + "/api/user";
  const response = await fetch(api);
  const jj = await response.json();
  console.log(jj.users, users_ref);
  users_ref = jj.users;
  console.log(users_ref)
  return jj.users
}

export default {
  data(){
    return{
      users: ["hola"]
    }
  },
  created: function()
  {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers()
    {
      this.users = await fetchUserss(this.users.target)
      console.log(this.users)
    },
    editUser(userID)
    {
      const api = import.meta.env.VITE_HOST + "/api/user";
      const response = confirm('are you sure you want to delete this user?');
      if (response) {
        this.users.splice(this.get_pos_user(userID), 1);
        fetch(api).then(function(data) {});
      }
    },
    deleteUser(userID)
    {
      const api = import.meta.env.VITE_HOST + "/api/user";
      const response = confirm('are you sure you want to delete this user?');
      if (response) {
        this.users.splice(this.get_pos_user(userID), 1);
        fetch(api).then(function(data) {});
      }
    },
    get_pos_user(userID)
    {
      for (var i = 0; i < this.users.length; i++)
      {
        if (this.users[i]._id == userID)
        {
          return i;
        }
      }
      return -1;
    }
  }
}
</script>

<style scoped>
main {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    160deg,
    rgb(123, 44, 191) 0%,
    rgb(110, 57, 157) 35%,
    rgb(58, 41, 97) 100%
  );
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2rem;
  color: #fff;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

form {
  min-width: 50vw;
  text-align: center;
}

label {
  display: block;
  font-size: 1.2rem;
}

input {
  padding: 1rem 1rem;
  width: 100%;
  max-width: 15rem;
  background-color: rgba(255, 254, 254, 0.586);
  border: none;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  color: rgb(62, 57, 57);
}

input:active,
input:focus {
  outline: none;
}

button {
  padding: 0.7rem 6rem;
  border: none;
  border-radius: 0.6rem;
  background-color: rgb(147, 105, 184);
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
}

button:hover {
  cursor: pointer;
  background-color: rgb(191, 141, 235);
}
</style>
