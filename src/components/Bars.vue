<template>
    <div id="bars">
        <div class="fixed-top bg-dark">
          <h6 class="text-light">#ENDSARS #ENDSWAT #ENDPOLICEBRUTALITY</h6>
        </div>
        <div v-if="loggedout" class="fixed-top mt-5 modal-dialog" role="document">
          <div class="modal-content">
            <span class="fa-li text-danger"><i class="fas fa-spinner fa-pulse"></i></span>Logging Out
          </div>
        </div>
        <div class="logout-btn mb-4">
            <button class="btn-lg btn-outline-dark rounded-circle" @click="Logout"><i class="fas fas-2x fa-sign-out-alt"></i></button>
        </div>
        <div class="help-btn">
            <!-- pop over the help -->
            <!-- <div v-if="help">
              <button type="button" class="btn btn-lg btn-primary" data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">
                Click to toggle popover
              </button>
              <button type="button" class="btn btn-lg rounded-circle" data-toggle="popover" title="Help" data-content="And here's some amazing content. It's very engaging. Right?">
                ?
              </button>
              
            </div> -->
            <button type="button" 
            class="btn-lg rounded-circle" 
            data-toggle="popover" 
            title="Help"
            data-placement="top" 
            data-content="And here's some amazing content. It's very engaging. Right?">
              ?
            </button>
            <!-- <button class="btn-lg rounded-circle" @click="help == true"> ? </button> -->
        </div>
    </div>
</template>

<script>

    export default {
    name: 'Bars',
    
    data(){
      return {
        help: false,
        loggedout: false
      }
    },

    methods: {
      Logout: function(){
         document.cookie = "buddy_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
         this.loggedout = true
         setTimeout(() => {return this.$router.push('/login')}, 3000)
      },

      // getCookie(name){
      //   let cookieValue = null;
      //   if (document.cookie && document.cookie !== '') {
      //     const cookies = document.cookie.split(';');
      //     for (let i = 0; i < cookies.length; i++) {
      //       const cookie = cookies[i].trim();
      //       // Does this cookie string begin with the name we want?
      //       if (cookie.substring(0, name.length + 1) === (name + '=')) {
      //         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
      //         break;
      //       }
      //     }
      //   }
      //   return cookieValue;
      // },

    }
}
</script>

<style scoped>

    .logout-btn {
       z-index: 3;
        /* background-color: rgb(44, 44, 44);  */
        bottom: 80px; 
        right: 19px; 
        position: fixed; 
        float: right; 
    }

    .help-btn {
        z-index: 3;
        /* background-color: rgb(44, 44, 44);  */
        bottom: 40px; 
        right: 19px; 
        position: fixed; 
        float: right;
    }

</style>