import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import NewChatroom from '@/components/NewChatroom'
import ViewChatroom from '@/components/ViewChatroom'
import EditChatroom from '@/components/EditChatroom'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/chatroom/new',
    name: 'new-chatroom',
    component: NewChatroom
  },
  {
    path: '/chatroom/:chatroom_id/edit',
    name: 'edit-chatroom',
    component: EditChatroom
  },
  {
    path: '/chatroom/:chatroom_id',
    name: 'view-chatroom',
    component: ViewChatroom
  },
]

const router = new VueRouter({
  routes
})

export default router
