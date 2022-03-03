<template>
 <div id="App">
    <div class="logo">
      <router-link to="/">
        <img alt="Tarfin logo" src="https://tarfin.com/img/logo.svg" /> <span> / Events</span>
      </router-link>
    </div>
    <router-view></router-view>
 </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600&display=swap');
html{
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
body{
  position: relative;
  margin: 0;
  padding-bottom: 80px;
  min-height: 100%;
  background-color: #e6f1e8!important;
}
#app {
    font-family: 'Titillium Web', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2d4156;
    background-color: #fff;
    border-radius: 8px;;
    text-rendering: optimizeLegibility;
    -webkit-tap-highlight-color: transparent;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding-bottom: 80px;
    height: 100%!important;;
    font-size:16px;
    line-height: 32px;
      h1{
        margin-top: 45px;
        position: relative;
        display: block;
        font-weight: 300 !important;
        color: #22303a;
        font-size: 30px;
        text-align: left;
        padding: 0 0 20px 0;
      &::after {
        content: "";
        position: absolute;
        width: 40px;
        height: 2px;
        background-color: #57dcab;
        margin: 0 auto;
        display: block;
        top: 45px;
        left: 0;
      }
    }
    .container{
      max-width: 1296px;
    }
    .logo{
      width: 90%;
      text-align: left;
      margin: 30px auto 40px;
      padding: 60px 0 0;
      a{
        color: #2d4156;
        text-decoration: none;
      }
      span{
        font-size: 25px;
        top: 15px;
        position: relative;
        left: 5px;
        
      }
    }
    a{
      transition: all 0.3s ease;
    }
  }
</style>