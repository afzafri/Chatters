<template lang="html">
  <div id="view-chatroom">
    <h3>{{chatroom.name}}</h3>

    <form @submit="deleteChatroom">
      <button class="btn waves-effect waves-light red" type="submit">
        Delete <i class="material-icons right">delete</i>
      </button>
    </form>

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
</style>
