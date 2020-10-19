<template>
  <div id="expense-table">
    
    <p v-if="expenses.length < 1 || null || undefined" class="empty-table">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Expense Amount</th>
            <th>Expense Category</th>
            <th>Expense Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            No Expense(s)
            <td></td>
          </tr>
        </tbody>      
      </table>
    </p>
    <table class="table table-bordered" v-else>
      <thead>
        <tr>
          <th>Expense Amount</th>
          <th>Expense Category</th>
          <th>Expense Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="expense in expenses" :key="expense">
          <td>{{ expense.amount }}</td>
          <td>{{ expense.category }}</td>
          <td>{{ expense.description }}</td>
        </tr>
      </tbody>      
    </table>
  </div>
</template>

<script>
  export default {
    name: 'ExpenseTable',

    data() {
      return {
        expenses: [],
      }
    },

    mounted() {
      this.getExpense()
    },

    methods: {
      async getExpense(){
        try {
          const response = await fetch('https://budgito.herokuapp.com/api/budget/expense/', {
            headers:
            { 
              "Authorization": "Token " + this.getCookie('buddy_token'),
            },
          })
          const data = await response.json()
          this.expenses = data
        } catch (error) {
          if(this.getCookie('buddy_token') == null || undefined){
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