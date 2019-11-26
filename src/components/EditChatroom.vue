<template lang="html">
  <div id="edit-chatroom">
    <div class="row" style="margin-bottom: 0px !important;">
     <div class="col s12">
       <div class="card">
         <div class="card-content">
           <span class="card-title">
             <b>Edit Chatroom</b>
             <span @click="$router.go(-1)" class="right" style="cursor: pointer;"><i class="material-icons right">arrow_back</i></span> 
           </span>

           <div class="row" style="margin-bottom: 0px !important;">
             <form class="col s12" @submit="updateChatroom">
               <div class="row">
                 <div class="input-field col s12">
                   <input type="text" class="validate" v-model="name" name="name" placeholder="Enter Chatroom name">
                   <label class="active">Chatroom Name</label>
                 </div>
               </div>
               <div class="row">
                 <div class="input-field col s12">
                   <textarea class="materialize-textarea" v-model="about" name="about" placeholder="Tell people what is this chatroom for?"></textarea>
                   <label class="active">Chatroom About</label>
                 </div>
               </div>
               <div class="row">
                 <div class="input-field col s12">
                   <input type="text" class="validate" v-model="created_by" name="created_by" placeholder="Enter your name" readonly>
                   <label class="active">Created By</label>
                 </div>
               </div>
               <div class="row" style="margin-bottom: 0px !important;">
                 <button class="btn waves-effect waves-light" type="submit">
                   Update <i class="material-icons right">save</i>
                 </button>
               </div>
             </form>
           </div>
         </div>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
import db from './firebaseInit'
import Swal from 'sweetalert2'

export default {
  name: 'edit-chatroom',
  data () {
    return {
      id: '',
      name: '',
      about: '',
      created_by: '',
      timestamp: '',
      username: '',
    }
  },
  created() {
    this.getData();
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getData',
  },
  methods: {
    getData() {
      let current = this;

      // get user name
      if (localStorage.username) {
        this.username = localStorage.username;
      } else {
        Swal.fire(
          'You need to login to edit chatroom!',
          'Click on the Login button on the top right',
          'error'
        );
        current.$router.push({ name: 'home' });
      }

      // get chatroom details
      var chatroom_id = this.$route.params.chatroom_id;
      db.collection("chatrooms").doc(chatroom_id).get().then(function(doc) {
          if (doc.exists) {
              current.id = doc.id;
              current.name = doc.data().name;
              current.about = doc.data().about;
              current.created_by = doc.data().created_by;
              current.timestamp = doc.data().timestamp;
          } else {
              Swal.fire(
                'Chatroom does not exist!',
                'error'
              );
              current.$router.push({ name: 'home' })
          }
      }).catch(function(error) {
          Swal.fire(
            'Failed to get Chatroom!',
            error+'. You can try again later.',
            'error'
          );
          current.$router.push({ name: 'home' })
      });
    },
    updateChatroom(e) {
      e.preventDefault();
      let current = this;

      var updateChatroom = {
        'name': this.name,
        'about': this.about,
        'created_by': this.created_by,
        'timestamp': this.timestamp,
      }

      // update to firestore
      db.collection("chatrooms").doc(this.id).set(updateChatroom)
      .then(function(docRef) {
        Swal.fire({
          title: 'Chatroom updated!',
          icon: 'success',
        });
        current.$router.push({ name: 'view-chatroom', params: { chatroom_id: current.id } })
      })
      .catch(function(error) {
        Swal.fire(
          'Failed to update Chatroom!',
          error+'. You can try again later.',
          'error'
        );
      });
    }
  }
}
</script>

<style lang="css" scoped>
</style>
