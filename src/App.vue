<template>
  <div id="app">
    <header>
      <nav>
        <div class="nav-wrapper green">
          <ul class="hide-on-med-and-down">
            
          </ul>
        </div>
      </nav>
    </header>

    <Sidebar />

    <main>
      <div class="container">
        <router-view/>
      </div>
    </main>

    <footer></footer>
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

<style>
  header, main, footer {
    padding-left: 300px;
  }

  @media only screen and (max-width : 992px) {
    header, main, footer {
      padding-left: 0;
    }
  }
</style>
