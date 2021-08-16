<template>
  <Navigation />
  <main>
    <router-view />
  </main>
  <footer>Everyone likes footer</footer>
</template>
<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation,
  },
  data() {
    return {};
  },
};
</script>

<style>
/* For mobile phones: */
body {
  position: relative;
  margin: 0px;
  padding-bottom: 6rem;
  min-height: 100%;
}
main {
  width: 90%;
  align-items: center;
  margin: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  color: #2c3e50;
}
#header {
  width: 100%;
  position: sticky;
  background-color: white;
  top: 0;
  right: 0;
  left: 0;
}
#navbar-logo {
  display: none;
}
#navbar-title {
  margin: auto;
  padding-left: 8px;
}
#navbar-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin: auto;
}

#navbar-container a {
  color: #2c3e50;
  border-bottom: 2px solid white;
  text-decoration: none;
}
#navbar-container a:hover {
  color: #42b983;
  border-bottom: 2px solid #42b983;
}

#navbar-container a.router-link-exact-active {
  border-bottom: 2px solid #42b983;
}
footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: #2c3e50;
  color: white;
  text-align: center;
}
.btn {
  font-weight: bold;
  padding: 14px 16px;
  cursor: pointer;
}
.btn.primary {
  border: 1px solid#42b983;
  background-color: #42b983;
  color: white;
  border-radius: 30px;
  padding: 10px 16px;
}
.btn.primary:hover {
  background-color: white;
  color: #42b983;
}
.row-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.shadow {
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.33);
  -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.33);
  -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.33);
}

@media only screen and (min-width: 768px) {
  /* For desktop: */
  main {
    width: 60%;
    height: 100vh;
  }
  #navbar-container {
    width: 80%;
    align-items: center;
    margin: auto;
  }
  #navbar-logo {
    display: flex;
  }
}
</style>
