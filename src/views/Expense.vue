<template>
  <div id="expense">
    <div class="m-5">
      <div id="nav">
        <router-link to="/home">Home</router-link> |
        <router-link to="/income">Income</router-link> |
        <router-link to="/expense">Expense</router-link>
      </div>
    </div>
    <div v-if="created" class="fixed-top modal-dialog" role="document">
      <h4>Expense has been successfully created</h4>
      {{ response }}
    </div>
    <!-- <div v-if="error != '' ">
      {{ error }}
    </div> -->
    <div class="row row-cols-1 row-cols-md-3 m-5">
        <div class="col mb-4">

          <div v-if="networkError" class="fixed-top modal-dialog" role="document">
            <div class="modal-content">
                Please Check your Internet Connection and try again
            </div>
          </div>
          <div v-if="authentError" class="modal-dialog" role="document">
            <div class="modal-content">
              <h4>
              Please <router-link to="/login"><button class="btn btn-sm btn-outline-success waves-effect">Login</button></router-link> to get started!
              </h4>
            </div>
          </div>
          <h4>Create Expense</h4>
          <div class="spinner-border text-success" role="status" v-if="submitLoading">
            <span class="sr-only">Loading...</span>
          </div>
          <expense-form @add:expense="expenseCreate"/>
        </div>
        <div class="col mb-4">
        </div>
        <div class="col mb-4">
        </div>
    </div>
    <expense-table />
  </div>
</template>

<script>
import ExpenseTable from "@/components/ExpenseTable.vue";
import ExpenseForm from "@/components/ExpenseForm.vue";

  export default {
    name: 'Expense',
    components: {
      ExpenseForm,
      ExpenseTable,
    },

    data() {
      return {
        created: false,

        // error: '',
        networkError: false,
        authentError: false,
        submitLoading: false,

        response: [],
      }
    },

    methods: {
      async expenseCreate(expense){
        this.submitLoading = true

        try{
          const response = await fetch('https://budgito.herokuapp.com/api/budget/expense/', {
            method: 'POST',
            headers: 
            {
              "content-type": "application/json;charset=utf-8",
              "Authorization": "Token " + this.getCookie('buddy_token'),
            },
            body: JSON.stringify(expense)
          })
          const newExpense = await response.json()
          this.response = newExpense
          this.created = true
        }catch(error){
          this.submitLoading = false
          if(this.getCookie('buddy_token') == null || this.getCookie('buddy_token') == undefined){
            this.authentError = true
            this.networkError = false
          }
          else{
            this.networkError = true
            this.authentError = false
          }
          console.log(error)
          // this.error = console.log(error)
          // setTimeout(() => {this.error = console.log(error);}, 2000);
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
    },
  }
</script>

<style scoped>

</style>