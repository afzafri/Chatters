<template>
  <div id="app" class="page-flexbox-wrapper">
    <header>
      <nav>
        <div class="nav-wrapper green">
          <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul class="right">

            <li><a href="#!" v-on:click="aboutApp"><i class="material-icons">info</i></a></li>
            <li v-if="username" class="dropdown-custom">
              <a class="dropdown-trigger" href="#!">
                {{username}}<i class="material-icons right">arrow_drop_down</i>
              </a>
              <div class="dropdown-content-custom">
                <span v-on:click="logOut">Log Out</span>
              </div>
            </li>
            <li v-else><a href="#" v-on:click="logIn">Login</a></li>

          </ul>
        </div>
      </nav>
      <Sidebar />
    </header>

    <main>
      <router-view/>
    </main>

    <footer></footer>
  </div>
</template>

<script type="text/javascript">
  import Sidebar from '@/components/Sidebar'
  import Swal from 'sweetalert2'

  export default {
    components: {
      Sidebar
    },
    data () {
      return {
        username: ''
      }
    },
    methods: {
      logIn() {
        Swal.fire({
            title: 'Login to start chatting!',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off',
              placeholder: 'Enter your name'
            },
            showCancelButton: true,
            confirmButtonText: 'Log In',
            showLoaderOnConfirm: true,
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              localStorage.username = result.value;
              this.username = localStorage.username;

              Swal.fire(
                'Log In Success',
                'Enter a chatroom to start chatting!',
                'success'
              );

              this.$router.push({ name: 'home' });
            }
          })
      },
      logOut() {
        let current = this;

        Swal.fire({
          title: 'Log Out?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Log Out'
        }).then((result) => {
          if (result.value) {
            localStorage.removeItem('username');
            this.username = "";
            current.$router.push({ name: 'home' })
          }
        })
      },
      aboutApp() {
        let current = this;

        Swal.fire({
          title: 'Chatters',
          html: '&copy; 2019 Afif Zafri',
          footer: '  <a href="https://github.com/afzafri/Chatters">GitHub Project Page</a>',
          icon: 'info',
        });
      }
    },
    mounted() {
      if (localStorage.username) {
        this.username = localStorage.username;
      }
    },
  }
</script>

<style>
  header, main, footer {
    padding-left: 400px;
  }

  @media only screen and (max-width : 992px) {
    header, main, footer {
      padding-left: 0;
    }
  }

  .page-flexbox-wrapper {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  main {
    flex: 1 0 auto;
  }


  /* The container <div> - needed to position the dropdown-custom content */
  .dropdown-custom {
    position: relative;
    display: inline-block;
  }

  /* dropdown-custom Content (Hidden by Default) */
  .dropdown-content-custom {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }

  /* Links inside the dropdown-custom */
  .dropdown-content-custom a, .dropdown-content-custom span {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;
  }

  /* Change color of dropdown-custom links on hover */
  .dropdown-content-custom a:hover, .dropdown-content-custom span:hover {background-color: #f1f1f1}

  /* Show the dropdown-custom menu on hover */
  .dropdown-custom:hover .dropdown-content-custom {
    display: block;
  }

  .messages {
    /* height: 100%; */
    height: 70vh;
    padding: 10px 20px 5px 10px;
    overflow-y: auto;
  }
</style>
