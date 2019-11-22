<template lang="html">
  <div id="new-chatroom">
    <h3>New Chatroom</h3>

    <div class="row">
      <form class="col s12" @submit="createChatroom">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" class="validate" v-model="name" name="name">
            <label>Chatroom Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea class="materialize-textarea" v-model="about" name="about"></textarea>
            <label>Chatroom About</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" class="validate" v-model="created_by" name="created_by">
            <label>Created By</label>
          </div>
        </div>
        <div class="row">
          <button class="btn waves-effect waves-light" type="submit">
            Create <i class="material-icons right">save</i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
import Swal from 'sweetalert2'
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
          'timestamp': new Date().getTime(),
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
    }
  }
</script>

<style lang="css" scoped>
</style>
