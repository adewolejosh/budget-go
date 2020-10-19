<template>
  <div id="login" class="mt-4 container">
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
          <small class="danger" v-if="passwordVal">
            Incorrect username and password
          </small>
            <form @submit.prevent="handleLogin" class="container">
                <div class="form-group">
                    <div class="card p-2">
                        <label for="login-username">Username</label>
                        <input
                        ref="first" 
                        class="form-control"  
                        id="login-username" 
                        type="text"
                        @focus='clearStatus'
                        required
                        v-model="loggedUser.username"
                        />

                        <label for="login-password">Password</label>
                        <input 
                        class="form-control"  
                        id="login-password" 
                        @focus='clearStatus'
                        type="password"
                        required
                        v-model="loggedUser.password"
                        />

                        <p v-if="error && submitting" class="text-danger error-message">
                        ❗Please fill all required fields
                        </p>                    
                        <!-- <p v-if="success" class="success-message">✅Login Successful</p> -->
                        <button class="btn btn-success btn-md lighten-1 m-3">Login</button>
                    </div>
                </div>
            </form>
          <small class="ml-4">If you do not have an account yet <router-link to="/"><a>Sign Up</a></router-link></small>
        </div>
        <div class="col">
        </div>
      </div>
  </div>
</template>

<script>
    
  export default {
    name: 'login',
    components: {
    },

    data() {
      return {
        token: [],
        userDetails: [],

        nError: false,

        submitting: false,
        error: false,

        submitLoading: false,
        passwordVal: false,
        
        loggedUser: {
            username: null,
            password: null,
        },
      }
    },

    methods: {
      handleLogin: function() {
        this.submitting = true
        this.clearStatus()
        
        if(this.validField(this.loggedUser.username)){
          this.error = true
          return
        }
        
        if (this.validField(this.loggedUser.password) ){
          this.error = true
          return
        }
        
        else{
          this.$refs.first.focus()

          if(this.error == false && this.submitting)
            this.userLogin(this.loggedUser)
        }

        this.error = false
        this.submitting = false
      },

      clearStatus() {
        this.error = false
        this.nError = false
        this.passwordVal = false
      },

      validField: function(field){
        var re = /^ (\s)+ $/;
        return re.test(field);
      },
        
      
      async userLogin(loggedUser){
        this.submitLoading = true
        this.nError = false
        this.passwordVal = false

        // setTimeout(() => {return this.passwordVal == true}, 20000);
        // set timer, if after 10secs, no request. Return Newtork error
        try {
          const response = await fetch('https://budgito.herokuapp.com/api/accounts/api-token-auth/', { 
            method: 'POST',
            headers: 
            { 
              "content-type": "application/json;charset=utf-8" 
            },
            body: JSON.stringify(loggedUser),
            
          })

          const token = await response.json()

          if(response.status=='200' && token.token != undefined || null){
          // console.log(token)
            this.token = token.token

          if(token.token != null || undefined || []){  
            var d = new Date();
            d.setTime(d.getTime() + (24 * 60 * 60 * 3000));
            var expires = "expires="+d.toUTCString();
            document.cookie= 'buddy_token=' + token.token + ";expires=" + expires + ";domain;path=/"
          }
          }

          // setTimeout(() => {return this.passwordVal == true}, 15000);
          if(response.status=='200' && token.token != undefined || null) {this.$router.push('/home')}
          if(response.status=='400') {
            this.submitLoading = false
            this.passwordVal = true
            this.nError = false
            throw new Error("Username and Password Don't match")
          }
          // else{this.nError = true}

        } catch(error) {
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

  small a {
    color: #42b983;
  }

  small a:hover {
    color: #42b983;
  }

</style>