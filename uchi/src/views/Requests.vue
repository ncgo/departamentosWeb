<template>
   <div class="all">
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Users</h1>
      </div>
    </div>
    <br />

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
          <td>Accept</td>
          <td>Decline</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users">
          <td>{{ user["firstName"] }}</td>
          <td>{{ user["lastName"] }}</td>
          <td>{{ user["towerName"] }}</td>
          <td>{{ user["email"] }}</td>
          <td>{{ user["phone"] }}</td>
          <td>{{ user["apartmentName"] }}</td>
          <td>{{ user["role"] }}</td>
          <td>
             <button class="button" v-on:click="AcceptUser(user['_id'])">
              Accept
            </button>

            </td>
            <td>
            <button class="button" v-on:click="DeclineUser(user['_id'])">
              Decline
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import router from "../router";

export default {
  data() {
    return {
      users: [],
    };
  },
  created: function () {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      const api = import.meta.env.VITE_HOST + "/api/user/requests/getdeactivated";
      const response = await fetch(api);
      const data = await response.json();
      this.users = data.users;
    },
    AcceptUser(userID) {
      const api = import.meta.env.VITE_HOST + "/api/user/activate";
      const response = confirm("are you sure you want to accept this user?");
      if (response) {
        this.users.splice(this.get_pos_user(userID), 1);
        fetch(`${api}/${userID}`, { method: "PUT" }).then(function (
          data
        ) {});
      }
    },
    DeclineUser(userID) {
      const api = import.meta.env.VITE_HOST + "/api/user";
      const response = confirm("are you sure you want to decline this user?");
      if (response) {
        this.users.splice(this.get_pos_user(userID), 1);
        fetch(`${api}/${userID}`, { method: "DELETE" }).then(function (
          data
        ) {});
      }
    },
    get_pos_user(userID) {
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i]["_id"] == userID) {
          return i;
        }
      }
      return -1;
    },
  },
};
</script>

<style scoped>
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
.all {
  padding: 2rem
}

.button {
  padding: 0.7rem 6rem;
  border: none;
  border-radius: 0.6rem;
  background-color: rgb(147, 105, 184);
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  width: 10rem;
  float: left;
  text-align: center;
}

router-link {
  padding: 0.7rem 6rem;
  border: none;
  border-radius: 0.6rem;
  background-color: rgb(147, 105, 184);
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  width: 10rem;
}

.button:hover {
  cursor: pointer;
  background-color: rgb(191, 141, 235);

}
table {
  background-color: #f9f4f5;
  padding: 2rem;
  border-radius: 25px;
  -webkit-box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.27);
  box-shadow: 0px 5px 15px -9px rgba(0, 0, 0, 0.27);
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}
thead {
  border-bottom: solid 2px green;
}
tr td {
  border-left: solid 2px grey;
  padding: 8px;
}
th {
  border-bottom: #7b2cbf solid;
  border-collapse: collapse;
  color: #7b2cbf;
  font-weight: bold;
  text-align: center;
  border-left: solid 2px red;
}
.tableRow {
  text-align: center;
}
.tableRow:hover {
  background-color: #c8b8db;
  color: white;
}
</style>
