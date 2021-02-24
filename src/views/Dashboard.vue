<template>
  <div class="home">
    <!-- Add an automatic avatar -->
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <div v-if="networkError" class="fixed-top modal-dialog" role="document"> -->
    <div v-if="networkError" class="fixed-top modal-dialog" role="document">
      <div class="modal-content">
        <small>
          Please Check your network Connection and
          <button class="btn waves-effect btn-sm btn-outline-danger" @click="reload()">
            Refresh
          </button>
        </small>
      </div>
    </div>
    <div v-if="authentError" class="modal-dialog" role="document">
      <div class="modal-content">
        <h4>
        Please <router-link to="/login"><button class="btn btn-sm btn-outline-success waves-effect">Login</button></router-link> to get started!
        </h4>
      </div>
    </div>
    <div class="m-5" v-else>
      <bars>

      </bars>
      <div id="nav">
        <router-link to="/home">Home</router-link> |
        <router-link to="/income">Income</router-link> |
        <router-link to="/expense">Expense</router-link>
        <!-- <router-link to="/login">Login</router-link> -->
      </div>
      <h4> Your Dashboard</h4>
      <div class="row row-cols-1 row-cols-md-2 m-lg-5">
        <div class="col mb-4">
          <div class="card p-2">
            <div class="text-left" v-bind="user">

            Welcome {{ user.username }}
            <small v-if=" user.username === '' ">{{ user.first_name }}</small>
            <small v-else-if=" user.first_name === '' ">{{ user.email }}</small>
            
            </div>
          </div>
        </div>
        <div class="col mb-4">
          <div class="card p-2">
            <div class="text-left">Income: <small class="text-success" v-if="income">₦ {{ income }}</small><small v-else>₦ 0</small></div>
            <div class="text-left">Expense: <small class="text-danger" v-if="expense">₦ {{ expense }}</small><small v-else>₦ 0</small></div>
            <div class="text-left">Budget: 
              <small v-if="budget">
                <small class="text-success" v-if="budget > 0">
                  ₦ {{ budget }}
                </small>
                <small class="text-danger" v-if="budget < 0">
                  ₦ {{ budget }}
                </small>
              </small>
            <small v-else>₦ 0</small></div>
          </div>
        </div>
        <div class="col mb-4">
          <div class="card p-2">
            Latest Income
            <div class="text-left" v-if="latestIncome">
              <p>Amount: {{ latestIncome.amount }}</p>
              <p>Category: {{ latestIncome.category }}</p>
              <p>Description: {{ latestIncome.description }}</p>
            </div>
            <div v-else>
              No Income was created Recently
            </div>
            <router-link to="/income"><button class="btn btn-sm btn-primary">more on Income</button></router-link>
          </div>
        </div>
        <div class="col mb-4">
          <div class="card p-2">
            Latest Expense
            <div class="text-left" v-if="latestExpense">
              <p>Amount: {{ latestExpense.amount }}</p>
              <p>Category: {{ latestExpense.category }}</p>
              <p>Description: {{ latestExpense.description }}</p>
            </div>
            <div v-else>
              No Expense was created Recently
            </div>
            <router-link to="/expense"><button class="btn btn-sm btn-danger">more on Expense</button></router-link>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Bars from '@/components/Bars.vue';

export default {
  name: 'Home',
  components: {
    Bars,
  },

  data(){
    return{
      networkError: false,
      authentError: false,

      user: [],
      token: [],

      budget: [],
      income: [],
      expense: [],

      latestIncome: [],
      latestExpense: [],
    }
  },

  mounted() {
    this.getUser(),
    this.getBudgetSum(),
    this.getIncomeSum(),
    this.getIncome(),
    this.getExpense(),
    this.getExpenseSum()
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
        if (this.getCookie('buddy_token') == null || this.getCookie('buddy_token') == undefined) {
          this.authentError = true
          this.networkError = false
        }
        if (error=="TypeError: Failed to fetch") {
          this.networkError = true
          this.authentError = false
        }
        console.error(error)
      }
    },

    async getBudgetSum(){
      try {
        const response = await fetch('https://budgito.herokuapp.com/api/budget/month-budget/', {
          method: 'GET',
          headers:
          { 
            "content-type": "application/json;charset=utf-8" ,
            "Authorization": "Token " + this.getCookie('buddy_token'),
            // "Authorization": "Token ${this.token}",
          },
        })
        const data = await response.json()
        this.budget = data
      } catch (error) {
        if (this.getCookie('buddy_token') == null || undefined) {
          this.authentError = true
          this.networkError = false
        }
        if (error=="TypeError: Failed to fetch") {
          this.networkError = true
          this.authentError = false
        }
        console.error(error)
      }
    },

    async getIncomeSum(){
      try {
        const response = await fetch('https://budgito.herokuapp.com/api/budget/income/sum-of-the-month/', {
          method: 'GET',
          headers:
          { 
            "content-type": "application/json;charset=utf-8" ,
            "Authorization": "Token " + this.getCookie('buddy_token'),
            // "Authorization": "Token ${this.token}",
          },
        })
        const data = await response.json()
        this.income = data
      } catch (error) {
        if (this.getCookie('buddy_token') == null || undefined) {
          this.authentError = true
          this.networkError = false
        }
        if (error=="TypeError: Failed to fetch") {
          this.networkError = true
          this.authentError = false
        }
        console.error(error)
      }
    },

    async getExpenseSum(){
      try {
        const response = await fetch('https://budgito.herokuapp.com/api/budget/expense/sum-of-the-month/', {
          method: 'GET',
          headers:
          { 
            "content-type": "application/json;charset=utf-8" ,
            "Authorization": "Token " + this.getCookie('buddy_token'),
            // "Authorization": "Token ${this.token}",
          },
        })
        const data = await response.json()
        this.expense = data
      } catch (error) {
        if (this.getCookie('buddy_token') == null || undefined) {
          this.authentError = true
          this.networkError = false
        }
        if (error=="TypeError: Failed to fetch") {
          this.networkError = true
          this.authentError = false
        }
        console.error(error)
      }
    },

    async getIncome(){
      try {
        const response = await fetch('https://budgito.herokuapp.com/api/budget/income/', {
          headers:
          { 
            "Authorization": "Token " + this.getCookie('buddy_token'),
          },
        })
        const data = await response.json()
        // this.incomes = data
        this.latestIncome = data.results[0]
      } catch (error) {
        if (this.getCookie('buddy_token') == null || undefined) {
          this.authentError = true
          this.networkError = false
        }
        if (error=="TypeError: Failed to fetch") {
          this.networkError = true
          this.authentError = false
        }
        console.error(error)
      }
    },

    async getExpense(){
      try {
        const response = await fetch('https://budgito.herokuapp.com/api/budget/expense/', {
          headers:
          { 
            "Authorization": "Token " + this.getCookie('buddy_token'),
          },
        })
        const data = await response.json()
        this.latestExpense = data.results[0]
      } catch (error) {
        if (this.getCookie('buddy_token') == null || undefined) {
          this.authentError = true
          this.networkError = false
        }
        if (error == "TypeError: Failed to fetch" || error === "TypeError: NetworkError when attempting to fetch resource.") {
          this.networkError = true
          this.authentError = false
        }
        console.error(error)
      }
    },

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

    // getCookie: function(){
    //   function getCookie(a) {
    //     var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    //     return b ? b.pop() : '';
    //   }
    //   this.token = getCookie('buddy_token')
    //   // console.log(this.token)
    // },

    reload: function(){
      return location.reload()
    }

  },
}
</script>

<style scoped>

  .small-container {
    max-width: 680px;
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