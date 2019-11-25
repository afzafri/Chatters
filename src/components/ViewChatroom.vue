<template lang="html">
  <div id="view-chatroom">
    <div class="row">
     <div class="col s12">
       <div class="card">
         <div class="card-content">
           <span class="card-title">
             <b>{{chatroom.name}}</b>
             {{username}}
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

           <div class="message-wrapper messages" v-chat-scroll>
             <div class="row" v-for="i in 100" :key="i" style="margin-bottom: 0px !important;">

               <img class="profile-pic" src="https://ui-avatars.com/api/?name=John+Doe" :class="[i%2 === 0 ? 'left' : 'right']"/>

               <div class="chat-bubble" :class="[i%2 === 0 ? 'left' : 'right']">

                   <div class="message">
                     Hello
                   </div>

                   <div class="message-detail">
                       <span>User A</span>,
                       <span>3:03 pm</span>
                   </div>

               </div>

             </div>
           </div>

           <div class="row" style="margin-bottom: 0px !important;">
                <form class="col s12">
                    <div class="row" style="margin-bottom: 0px !important;">
                        <div class="input-field input-group col s12">
                            <input type="text" class="validate" placeholder="Enter your message...">
                            <span class="suffix">
                                <a class="btn waves-effect waves-light btn-floating green"><i class="material-icons">send</i></a>
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
      chatroom: '',
      username: ''
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
          'You need to login to start chatting!',
          'Click on the Login button on the top right',
          'error'
        );
        current.$router.push({ name: 'home' });
      }

      // get chatroom details
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

  /* CHATTING STYLES */
  img.profile-pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    margin-top: 30px;
  }

  img.profile-pic.left {
    left: 10px;
  }

  img.profile-pic.right {
    right: 10px;
  }

  .message {
    font-size: 14px;
  }

  .message-detail {
    white-space: nowrap;
    font-size: 12px;
    font-style: italic;
  }

  .message-wrapper {
    position: relative;
  }

  .message-wrapper:last-child {
    margin-bottom: 10px;
  }

  .chat-bubble {
    border-radius: 5px;
    display: inline-block;
    padding: 10px 18px;
    position: relative;
    margin: 10px;
    max-width: 80%;
  }

  .chat-bubble:before {
    content: "\00a0";
    display: block;
    height: 16px;
    width: 9px;
    position: absolute;
    bottom: -7.5px;
  }

  .chat-bubble.left {
    background-color: #e6e5eb;
    float: left;
    margin-left: 55px;
  }

  .chat-bubble.left:before {
    background-color: #e6e5eb;
    left: 10px;
    -webkit-transform: rotate(70deg) skew(5deg);
  }

  .chat-bubble.right {
    background-color: #4caf50;
    color: #fff;
    float: right;
    margin-right: 55px;
  }

  .chat-bubble.right:before {
    background-color: #4caf50;
    right: 10px;
    -webkit-transform: rotate(118deg) skew(-5deg);
  }
</style>
