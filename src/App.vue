<template>
  <div id="app">
    <!-- <div id="nav"> -->
      <!-- <router-link to="/">Sign Up</router-link> |
      <router-link to="/login">Login</router-link> -->
    <!-- </div> -->
    <router-view/>
  </div>
</template>

<script>
  export default {
    

    methods: {
      getCookie(name){
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
      },
    }
  }
</script>


<style>

/* @import "./assets/mdb.css"; */
/* @import "./assets/bootstrap.css"; */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
