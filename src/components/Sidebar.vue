<template lang="html">
  <div class="">
    <ul id="slide-out" class="sidenav sidenav-fixed" style="width: 400px">
      <li>
        <div class="user-view">
          <div class="background">
            <img src="../assets/banner.png" width="400px">
          </div>
          <router-link :to="{ name: 'home' }">
            <h3 class="white-text center-align">Chatters</h3>
          </router-link>
          <br>
        </div>
      </li>

      <li :class="{'active':$route.name === 'new-chatroom'}">
        <router-link :to="{ name: 'new-chatroom' }">
          <i class="material-icons left">add</i> New Chatroom
        </router-link>
      </li>

      <li><div class="divider"></div></li>

      <li :class="{'active':$route.params.chatroom_id === chatroom.id}" v-for="chatroom in chatrooms" v-bind:key="chatroom.id">
        <router-link :to="{ name: 'view-chatroom', params: { chatroom_id: chatroom.id } }" class="waves-effect">
          {{chatroom.name}} <div class="chip">{{chatroom.created_by}}</div>

          <span class="secondary-content" v-if="$route.params.chatroom_id === chatroom.id">
            <i class="fa fa-eye"></i>
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'sidebar',
  data () {
    return {
      chatrooms: []
    }
  },
  created () {
    // fetch chatrooms
    db.collection("chatrooms").orderBy("timestamp", "asc")
      .onSnapshot(querySnapshot => {
        var chatroomsNew = []
        querySnapshot.forEach(doc => {
          var data = {
            'id': doc.id,
            'name': doc.data().name,
            'about': doc.data().about,
            'created_by': doc.data().created_by,
            'timestamp': doc.data().timestamp.toDate(),
          }

          chatroomsNew.push(data);

          // // only store data that does not exist yet
          // var exists = this.chatrooms.some(function(chatroom) {
          //   return data.id === chatroom.id
          // });
          //
          // if (!exists) {
          //   this.chatrooms.push(data)
          // }

        })

        // replace with new list
        this.chatrooms = chatroomsNew;
      }, function(error) {
          console.log(error);
      });
  }
}
</script>

<style lang="css" scoped>
</style>
