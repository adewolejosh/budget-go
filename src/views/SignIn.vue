<template>
  <div id="signup" class="mt-4 mb-4 container">
      <div id="nav">
        <router-link to="/">Sign Up</router-link> |
        <router-link to="/login">Login</router-link>
      </div>
      <div class="row row-cols-1 row-cols-md-3">
        <div class="col">
        </div>
        <div class="col">
          <div class="spinner-border text-success" role="status" v-if="submitLoading">
            <span class="sr-only">Loading...</span>
          </div>
          <small class="danger" v-if="nError">
            An Error occured, Please Check your Internet and try again.
          </small>
          <form @submit.prevent="verifySubmit" class="container" method="post">
            <p class="text-danger" v-if="errors.length">
              <b>Please Correct the following error(s);</b>
              <ul>
                <li v-for="error in errors" :key="error">
                  {{ error }}
                </li>
              </ul>
            </p>
            <div class="form-group">
              <div class="card p-2">
                <label for="firstName">First Name</label>
                <input 
                class="form-control" 
                id="firstName" 
                type="text"
                @focus='clearStatus'
                required
                v-model="user.first_name"
                />

                <label for="lastName">Last Name</label>
                <input 
                class="form-control"  
                id="lastName" 
                type="text"
                @focus='clearStatus'
                required
                v-model="user.last_name"
                />

                <label for="username">Username</label>
                <input 
                class="form-control"  
                id="username" 
                type="text"
                @focus='clearStatus'
                required
                v-model="user.username"
                />

                <label for="email">Email</label>
                <input 
                class="form-control"  
                id="email" 
                type="email"
                @focus='clearStatus'
                required
                v-model="user.email"
                />

                <label for="password">Password</label>
                <input 
                class="form-control"  
                id="password" 
                @focus='clearStatus'
                type="password"
                required
                v-model="user.password"
                />

                <label for="confirmPassword">Password Confirmation</label>
                <input 
                class="form-control" 
                id="confirmPassword" 
                @focus='clearStatus'
                type="password"
                required
                v-model="user.confirm_password"
                />

                <p v-if="error && submitting" class="error-message">
                ❗Please fill out all required fields correctly
                </p>                    
                <p v-if="successMessage !== ''" class="alert">
                  <small>
                    ✅ successfully registered, please check your mail and activate your account
                  </small>
                </p>
                <!-- <p v-if="success" class="success-message">✅ successfully registered</p> -->
                <button class="btn btn-success btn-md lighten-1 m-3">Register</button>
              </div>
            </div>
          </form>
          <small class="ml-4">if you already have an account <router-link to="/login">Login</router-link></small>
        </div>
        <div class="col">
        </div>
      </div>
  </div>
</template>

<script>
    
  export default {
    name: 'signup',
    components: {
    },

    data() {
      return {
        submitting: false,
        error: false,
        errors: [],

        nError: false,
        submitLoading: false,

        user: {
            first_name: null,
            last_name: null,
            username: null,
            email: null,
            password: null,
            confirm_password: null,
        },

        successMessage: '',
      }
    },

    methods: {
        verifySubmit: function(){
          this.errors = [];
          this.submitting = true
          this.clearStatus()

          if(this.validNameField(this.user.first_name)){
            this.errors.push('Please input a valid first name');
          }
          if(this.validNameField(this.user.last_name)){
          // if(this.user.last_name === ""){
            this.errors.push('Please input a valid last name');
          }
          if(this.validField(this.user.username)){
            this.errors.push('Please input a valid username');
          }
          if(this.validField(this.email)){
            this.errors.push('Please input a valid email');
          }
          if(this.validField(this.user.password)){
            this.errors.push('Please input a valid password');
          }
          if(this.validField(this.user.confirm_password)){
            this.errors.push('Please input a valid password confirmation');
          }
          if(this.user.confirm_password != this.user.password){
            this.errors.push('Please check and ensure the passwords match');
          }
          if(this.user.password.length < 5){
            this.errors.push('Password too short')
          }
          else{
            if(this.errors.length <= 0){
              this.userSignUp(this.user)
            }
          }
        },

        clearStatus() {
            // this.success = false
          this.error = false
          this.nError = false
          this.passwordVal = false
          this.errors = []
        },

        validNameField: function(field){
          var re = /^(\s+)|(\d+) $/;
          return re.test(field);
        },
        validField: function(field){
          var re = /^ (\s)+ $/;
          return re.test(field);
        },
        

        async userSignUp(user){
          this.submitLoading = true
          this.nError = false
          this.passwordVal = false

          try {
            const response = await fetch('https://budgito.herokuapp.com/api/accounts/', {
              method: 'POST',
              headers: 
              { 
              "content-type": "application/json;charset=utf-8" 
              },
              body: JSON.stringify(user),

            })

            const data = await response.json()
            

            if(response.status == '201' || response.status == '200'){
              this.success = true
              this.submitLoading = false
              this.successMessage = data.detail
              setTimeout(() => {return this.$router.push('/login')}, 10000);
            }
            if(response.status != '201' || response.status != '200'){
              this.submitLoading = false
              if(data.username){this.errors.push(data.username)}
              if(data.email){this.errors.push(data.email)}              
              else{
                this.errors.push(data)
                // this.errors.push(["Something Definitely went wrong, we're sorry! Try again!"])
                }
            }

          } catch(error){
            if(error){
              this.submitLoading = false
              console.log("An Error Occured, Please Try Again", error)
              if(error=="TypeError: Failed to fetch" || error=="TypeError: NetworkError when attempting to fetch resource."){
                this.nError = true
              }
            }
          }
        },         
    },
}
</script>

<style>

  .small-container {
    max-width: 680px;
  }


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