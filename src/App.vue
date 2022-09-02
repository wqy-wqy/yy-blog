<template>
  <Home />
</template>

<script>
import Home from './views/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>
<style lang="scss">
html,body,#app{
  margin: 0;
  padding: 0;
  height: 100%;
  background-image: url(../src/pic/1.jpg);
  /* background-repeat: repeat-y; */
  background-size: cover;
  /* overflow: hidden; */
}
::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
}
el-button{
  &:hover {
    color: rgb(240, 248, 255);
    background-color: rgb(148, 197, 238);
    border-color: rgb(148, 197, 238);
  }
  &:active {
    color: rgb(240, 248, 255);
    background-color: rgb(148, 197, 238);
    border-color: rgb(148, 197, 238);
  }
}
</style>
