<template lang="html">
  <div id="view-chatroom">
    <div class="row">
     <div class="col s12">
       <div class="card">
         <div class="card-content">
           <span class="card-title">
             {{chatroom.name}}

             <div class="dropdown-custom right">
                 <i class="material-icons">settings</i>
                 <div class="dropdown-content-custom">
                   <router-link :to="{ name: 'edit-chatroom' }">Edit <i class="material-icons right">edit</i></router-link>
                   <span>Clear <i class="material-icons right">clear_all</i></span>
                   <span class="red-text" v-on:click="deleteChatroom">Delete <i class="material-icons right">delete</i></span>
                 </div>
             </div>
           </span>

           <p><i>{{chatroom.about}}</i></p>
           <br>

           <ul class="messages" v-chat-scroll>
             <li v-for="i in 100" :key="i">{{i}}</li>
           </ul>

           <div class="row" style="margin-bottom: 0px !important;">
                <form class="col s12">
                    <div class="row" style="margin-bottom: 0px !important;">
                        <div class="input-field input-group col s12">
                            <input type="text" class="validate" placeholder="Enter your message...">
                            <span class="suffix">
                                <a class="btn waves-effect waves-light btn-floating"><i class="material-icons">send</i></a>
                            </span>
                        </div>
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
  name: 'view-chatroom',
  data () {
    return {
      chatroom: ''
    }
  },
  created() {
    this.getData();
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getData'
  },
  methods: {
    getData() {
      let current = this;
      var chatroom_id = this.$route.params.chatroom_id;
      db.collection("chatrooms").doc(chatroom_id).get().then(function(doc) {
          if (doc.exists) {
              var data = {
                'id': doc.id,
                'name': doc.data().name,
                'about': doc.data().about,
                'created_by': doc.data().created_by,
                'timestamp': doc.data().timestamp,
              }

              current.chatroom = data;
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
    deleteChatroom(e) {
      e.preventDefault();
      let current = this;

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {

          db.collection("chatrooms").doc(current.chatroom.id).delete().then(function() {
            Swal.fire(
              'Deleted!',
              'Your chatroom has been deleted.',
              'success'
            )
            current.$router.push({ name: 'home' })
          }).catch(function(error) {
            Swal.fire(
              'Failed to delete Chatroom!',
              error+'. You can try again later.',
              'error'
            );
          });

        }
      })
    }
  },
}
</script>

<style lang="css" scoped>
  .input-group {
      display: table;
  }

  .input-group input, .suffix {
      display: table-cell;
  }

  .suffix {
      width:1%;
  }
</style>
