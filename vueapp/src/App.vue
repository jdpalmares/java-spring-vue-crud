<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <items :items="products" v-slot="{ item }"> intro code
      <input size="l" type="text" v-model="item.data.id">
      <input type="text" v-model="item.data.title">
    </items> -->
    {{ apiLog }} <br>
    <div>
      <header-bar></header-bar>
        <b-row>
            <data-table></data-table>
        </b-row>
    </div>
    <items ref="myUsers" :items="users" v-slot="{ item }">
      <input placeholder="id" size="1" type="text" v-model="item.data.id">
      <input placeholder="firstname" size="5" type="text" v-model="item.data.firstName">
      <input placeholder="last name" size="5" type="text" v-model="item.data.lastName">
      <input placeholder="email" size="5" type="text" v-model="item.data.email">
      <input placeholder="phone number" size="5" type="text" v-model="item.data.phoneNumber">
      <button @click="save(item)">save</button>
      <button @click="savePut(item)">save(PUT)</button>
      <button @click="del(item)">delete</button>
    </items>
    <button @click="$refs.myUsers.addNew({})">+Add New</button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import items from '@benixal/vue-items';
import axios from 'axios';
import DataTable from "./components/DataTable.vue";
import HeaderBar from "./components/HeaderBar.vue";
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    HeaderBar,
    DataTable,
    items
  },
  mounted() {
    axios.get("http://127.0.0.1:8080/users")
      .then(response => (this.users = response.data))
  },
  methods: {
    save(item) {
      axios.post("http://127.0.0.1:8080/users", item.data)
        .then((response) => {
          item.data.id = response.data.id;
          this.apiLog = response.data;
        })
    },
    savePut(item) {
      axios.put("http://127.0.0.1:8080/users/" + item.data.id,
        item.data)
        .then((response) => {
          this.apiLog = response.data;
        })
    }
    ,del(item) {
      axios.delete("http://127.0.0.1:8080/users/" + item.data.id)
        .then((response) => {
          item.destroy();
          this.apiLog = response.data;
        })
    }
  },
  data() {
    return {
      apilog: null,
      // products:[ //intro code
      //   { id: 1, title: "prod#1"},
      //   { id: 2, title: "prod#2"},
      //   { id: 3, title: "prod#3"},
      // ]
      users: []
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
