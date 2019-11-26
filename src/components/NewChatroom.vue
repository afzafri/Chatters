<template lang="html">
  <div id="new-chatroom">

    <div class="row" style="margin-bottom: 0px !important;">
     <div class="col s12">
       <div class="card">
         <div class="card-content">
           <span class="card-title">
             <b>New Chatroom</b>
           </span>

           <div class="row" style="margin-bottom: 0px !important;">
             <form class="col s12" @submit="createChatroom">
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
                   <input type="text" class="validate" v-model="created_by" name="created_by" placeholder="Enter your name">
                   <label class="active">Created By</label>
                 </div>
               </div>
               <div class="row" style="margin-bottom: 0px !important;">
                 <button class="btn waves-effect waves-light" type="submit">
                   Create <i class="material-icons right">save</i>
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
import firebase from 'firebase'

export default {
  name: 'new-chatroom',
  data () {
    return {
      name: '',
      about: '',
      created_by: '',
    }
  },
  methods: {
    createChatroom(e) {
        e.preventDefault();
        let current = this;

        var newChatroom = {
          'name': this.name,
          'about': this.about,
          'created_by': this.created_by,
          'timestamp': firebase.firestore.Timestamp.fromDate(new Date()),
        }

        // insert to firestore
        db.collection("chatrooms").add(newChatroom)
        .then(function(docRef) {
          // clear input
          current.name = '';
          current.about = '';
          current.created_by = '';

          Swal.fire({
            title: 'Chatroom created!',
            text: "You can now start chatting!",
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Enter Chatroom'
          }).then((result) => {
            if (result.value) {
              current.$router.push({ name: 'view-chatroom', params: { chatroom_id: docRef.id } })
            }
          });
        })
        .catch(function(error) {
          Swal.fire(
            'Failed to create Chatroom!',
            error+'. You can try again later.',
            'error'
          );
        });

      }
    },
    mounted() {
      if (localStorage.username) {
        this.created_by = localStorage.username;
      }
    },
  }
</script>

<style lang="css" scoped>
</style>
