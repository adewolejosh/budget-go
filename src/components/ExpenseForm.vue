<template>
  <div id="expense-form">
    <div>
    <form @submit.prevent="handleExpense" class="container">
        <div class="form-group">
            <div class="card p-2">

                <!-- Amount -->
                <label for="expense-amount">Amount</label>
                <input
                ref="first" 
                class="form-control"
                :class="{'has-error': submitting && invalidAmount}"  
                id="expense-amount" 
                type="number" 
                placeholder="1000.00"
                step="0.01" 
                @focus='clearStatus'
                required
                v-model="expense.amount"
                />

                <!-- Category -->
                <label for="expense-category">Category</label>
                <select 
                class="form-control" 
                :class="{'has-error': submitting && invalidCateg}" 
                @focus='clearStatus' 
                type="text" 
                id="expense-category"
                v-model="expense.category"
                required
                >
                  <option value="Allowance">Entertainment</option>
                  <option value="Salary">Transport</option>
                  <option value="Freelance gig">Network</option>
                  <option value="Gifted">Food</option>
                  <option value="Gifted">Shoes</option>
                  <option value="Others">Others</option>
                </select>

                <!-- Description -->
                <label for="expense-desc">Description</label>
                <input
                ref="first" 
                class="form-control"
                :class="{'has-error': submitting && invalidDesc}"  
                id="expense-desc" 
                type="text" 
                placeholder="e.g Spent some money on Poker at the casino" 
                @focus='clearStatus'
                required
                v-model="expense.description"
                />

                <p v-if="error && submitting" class="error-message">
                ❗Please fill out all required fields
                </p>                    
                <!-- <p v-if="success" class="success-message">✅ Expense Create Successful</p> -->
                <button class="btn btn-success btn-md lighten-1 m-3">Create New Expense</button>
            </div>
        </div>
    </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ExpenseForm',

    data() {
      return {
        submitting: false,
        error: false,
        
        expense: {
          amount: "",
          category: "",
          description: "",
        },
      }
    },

    methods: {
      handleExpense(){
        this.submitting = true
            this.clearStatus()
            
            if(this.invalidAmount || this.invalidCateg || this.invalidDesc) {
              this.error = true
              return
            }

            this.$emit('add:expense', this.expense)
            this.$refs.first.focus()

            this.expense = {
              amount: "",
              category: "",
              description: "",
            }

            this.error = false
            // this.success = true
            this.submitting = false
        },

        clearStatus() {
          // this.success = false
          this.error = false
        },
    },

    computed: {
      invalidAmount() {
        return this.expense.amount === "" || 0 || 0.00 || null || undefined
      },
      invalidCateg() {
        return this.expense.category === ""
      },
      invalidDesc() {
        return this.expense.description === ""
      }
    },
  }
</script>

<style scoped>

</style>