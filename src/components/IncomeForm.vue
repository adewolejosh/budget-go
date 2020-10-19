<template>
  <div id="income-form">
    <div>
    <form @submit.prevent="handleIncome" class="container">
        <div class="form-group">
            <div class="card p-2">

                <!-- Amount -->
                <label for="income-amount">Amount</label>
                <input
                ref="first" 
                class="form-control"
                :class="{'has-error': submitting && invalidAmount}"  
                id="income-amount" 
                type="number" 
                placeholder="1000.00"
                step="0.01" 
                @focus='clearStatus'
                required
                v-model="income.amount"
                />

                <!-- Category -->
                <label for="income-category">Category</label>
                <select 
                class="form-control" 
                :class="{'has-error': submitting && invalidCateg}" 
                @focus='clearStatus' 
                type="text" 
                id="income-category"
                v-model="income.category"
                required
                >
                  <option value="Allowance">Allowance</option>
                  <option value="Salary">Salary</option>
                  <option value="Freelance gig">Freelance gig</option>
                  <option value="Gifted">Gifted</option>
                  <option value="Others">Others</option>
                </select>

                <!-- Description -->
                <label for="income-desc">Description</label>
                <input
                ref="first" 
                class="form-control"
                :class="{'has-error': submitting && invalidDesc}"  
                id="income-desc" 
                type="text" 
                placeholder="e.g A gift from Nana for my Birthday" 
                @focus='clearStatus'
                required
                v-model="income.description"
                />

                <p v-if="error && submitting" class="error-message">
                ❗Please fill out all required fields
                </p>                    
                <!-- <p v-if="success" class="success-message">✅ Income Create Successful</p> -->
                <button class="btn btn-success btn-md lighten-1 m-3">Create New Income</button>
            </div>
        </div>
    </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'IncomeForm',

    data() {
      return {
        submitting: false,
        error: false,

        income: {
          amount: "",
          category: "",
          description: "",
        },
      }
    },

    methods: {
      handleIncome(){
        this.submitting = true
            this.clearStatus()
            
            if(this.invalidAmount || this.invalidCateg || this.invalidDesc) {
              this.error = true
              return
            }

            this.$emit('add:income', this.income)
            this.$refs.first.focus()

            this.income = {
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
        }
      },

    computed: {
      invalidAmount() {
        return this.income.amount === "" || 0 || 0.00 || null || undefined
      },
      invalidCateg() {
        return this.income.category === ""
      },
      invalidDesc() {
        return this.income.description === ""
      }
    },
  }
</script>

<style scoped>

</style>