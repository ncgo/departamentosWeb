<script setup lang="ts">
import { ref } from "@vue/runtime-dom";
import router from "../../router";
const admin = localStorage.getItem("userID");

const towers = ref({
  name: "",
  _id: "",
  address: {
    street_1: "",
    street_2: "",
    number: "",
    city: "",
    country: "",
    postal_code: "",
  },
});

const api = import.meta.env.VITE_HOST + "/api/tower/towers";

async function getTowers() {
  await fetch(`${api}/${admin}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((resObject) => {
      if (resObject.ok) {
        towers.value = resObject.towers;
      } else {
        // alert(resObject.message);
      }
    });
}

function goToApt(id: string) {
  router.push(`/apartments/${id}`);
}

function deleteApt(_id) {}

getTowers();
</script>

<template>
  <div class="all">
    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Towers</h1>
      </div>
    </div>
    <br />

    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <td class="header">Tower</td>
          <td class="header">Street 1</td>
          <td class="header">Street 2</td>
          <td class="header">City</td>
          <td class="header">Postal Code</td>
          <td class="header">Country</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="tower in towers">
          <td @click="goToApt(tower['_id'])">{{ tower["name"] }}</td>
          <td @click="goToApt(tower['_id'])">{{ tower["address"].street_1 }}</td>
          <td @click="goToApt(tower['_id'])">{{ tower["address"].street_2 }}</td>
          <td @click="goToApt(tower['_id'])">{{ tower["address"].city }}</td>
          <td @click="goToApt(tower['_id'])">{{ tower["address"].postal_code }}</td>
          <td @click="goToApt(tower['_id'])">{{ tower["address"].country }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
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
  padding: 2rem;
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
  text-transform: capitalize;
  cursor: pointer;
  width: 12%;
}
.header{
  cursor: text;
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
