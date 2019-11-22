<template>
  <div id="app">
    <Sidebar />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Sidebar from '@/components/Sidebar'

  export default {
    components: {
      Sidebar
    }
  }
</script>
