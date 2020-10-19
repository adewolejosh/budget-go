<template>
  <div id="profile">
    <div class="text-left" v-bind="user">

      Welcome {{ user.username }}
      <small v-if=" user.username === '' ">{{ user.first_name }}</small>
      <small v-else-if=" user.first_name === '' ">{{ user.email }}</small>
      <small v-else><br/> Please Kindly Refresh to Update Details</small>

    </div>
  </div>  
</template>

<script>
  export default {
    name: 'Profile',

    data() {
      return {
        editing: null,
        user: [],
      }
    },

    mounted(){
      this.getUser(),
      this.putUser()
    },

    methods: {
      async getUser(){
        try {
          const response = await fetch('https://budgito.herokuapp.com/api/accounts/me/', {
            method: 'GET',
            headers:
            { 
              "content-type": "application/json;charset=utf-8" ,
              "Authorization": "Token " + this.getCookie('buddy_token'),
              // "Authorization": "Token ${this.token}",
            },
          })
          // console.log("Token ${this.getCookie('buddy_token')}")
          // console.log("Token " + this.getCookie('buddy_token'))
          const data = await response.json()
          this.user = data
        } catch (error) {
          if(this.getCookie('buddy_token') == null || this.getCookie('buddy_token') == undefined){
            this.authentError = true
            this.networkError = false
          }
          else{
            this.networkError = true
            this.authentError = false
          }
          console.error(error)
        }
      },

      async putUser(){
        try {
          const response = await fetch('https://budgito.herokuapp.com/api/accounts/me/', {
            method: 'PUT',
            headers:
            { 
              "content-type": "application/json;charset=utf-8" ,
              "Authorization": "Token " + this.getCookie('buddy_token'),
              // "Authorization": "Token ${this.token}",
            },
          })
          // console.log("Token ${this.getCookie('buddy_token')}")
          // console.log("Token " + this.getCookie('buddy_token'))
          const data = await response.json()
          this.user = data
        } catch (error) {
          if(this.getCookie('buddy_token') == null || this.getCookie('buddy_token') == undefined){
            this.authentError = true
            this.networkError = false
          }
          else{
            this.networkError = true
            this.authentError = false
          }
          console.error(error)
        }
      },

    }
    
  }
</script>

<style scoped>

</style>