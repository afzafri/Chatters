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

  /* The container <div> - needed to position the dropdown-custom content */
  .dropdown-custom {
    position: relative;
    display: inline-block;
  }

  /* dropdown-custom Content (Hidden by Default) */
  .dropdown-custom-content-custom {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }

  /* Links inside the dropdown-custom */
  .dropdown-custom-content-custom a, .dropdown-custom-content-custom span {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;
  }

  /* Change color of dropdown-custom links on hover */
  .dropdown-custom-content-custom a:hover, .dropdown-custom-content-custom span:hover {background-color: #f1f1f1}

  /* Show the dropdown-custom menu on hover */
  .dropdown-custom:hover .dropdown-custom-content-custom {
    display: block;
  }

  /* Change the background color of the dropdown-custom button when the dropdown-custom content is shown */
  .dropdown-custom:hover .dropbtn {
    background-color: #3e8e41;
  }
</style>
