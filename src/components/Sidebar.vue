<template lang="html">
  <div class="">
    <ul id="slide-out" class="sidenav sidenav-fixed">
      <li>
        <div class="user-view">
          <div class="background">
            <img src="../assets/banner.jpg" width="300px">
          </div>
          <a href="/">
            <h3 class="white-text center-align">Chatters</h3>
          </a>
          <br>
        </div>
      </li>

      <li :class="{'active':$route.params.chatroom_id === chatroom.id}" v-for="chatroom in chatrooms" v-bind:key="chatroom.id">
        <router-link :to="{ name: 'view-chatroom', params: { chatroom_id: chatroom.id } }" class="waves-effect">
          {{chatroom.name}} <div class="chip">{{chatroom.created_by}}</div>

          <span class="secondary-content" v-if="$route.params.chatroom_id === chatroom.id">
            <i class="fa fa-eye"></i>
          </span>
        </router-link>
      </li>
    </ul>
    <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
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
    db.collection('chatrooms').orderBy("timestamp", "asc").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id': doc.id,
          'name': doc.data().name,
          'about': doc.data().about,
          'created_by': doc.data().created_by,
          'timestamp': doc.data().timestamp,
        }
        this.chatrooms.push(data)
      })
    })
  }
}
</script>

<style lang="css" scoped>
</style>
