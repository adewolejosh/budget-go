<template>
  <div id="income-table">
    
    <p v-if="incomes.length < 1 || null || undefined" class="empty-table">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Income Amount</th>
            <th>Income Category</th>
            <th>Income Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            No Income(s)
            <td></td>
          </tr>
        </tbody>      
      </table>
    </p>
    <table class="table table-bordered" v-else>
      <thead>
        <tr>
          <th>Income Amount</th>
          <th>Income Category</th>
          <th>Income Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="income in incomes" :key="income">
            <td>₦ {{ income.amount }}</td>
            <td>{{ income.category }}</td>
            <td>{{ income.description }}</td>       
        </tr>
      </tbody>      
    </table>
  </div>
</template>

<script>
  export default {
    name: 'IncomeTable',

    data() {
      return {
        incomes: [],
        latestIncome: [],
        verify: true,
      }
    },

    mounted() {
      this.getIncome()
    },

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
          this.incomes = data.results
          this.latestIncome = data.results[0]
        } catch (error) {
          if (this.getCookie('buddy_token') == null || undefined) {
            this.authentError = true
            this.networkError = false
          }
          else {
            this.networkError = true
            this.authentError = false
          }
          console.error(error)
        }
      },
    },
  }
</script>

<style scoped>

</style>