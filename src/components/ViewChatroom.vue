<template lang="html">
  <div id="view-chatroom">
    <h3>Chatroom Name</h3>

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
      chatroom_id: this.$route.params.chatroom_id
    }
  },
  methods: {
    deleteChatroom(e) {
      e.preventDefault();
      let current = this

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

          db.collection("chatrooms").doc(current.chatroom_id).delete().then(function() {
            Swal.fire(
              'Deleted!',
              'Your chatroom has been deleted.',
              'success'
            )
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
  }
}
</script>

<style lang="css" scoped>
</style>
