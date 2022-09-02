<template>
<div class="common-layout">
    <el-container>
      <el-header> 
        <Header />
      </el-header>
          <el-main>
             <router-view></router-view>
            <!-- <Main/> -->
          </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from '../views/components/Header.vue';
import Aside from "./components/Aside.vue";
import Main from './components/Main.vue';
export default {
  name: 'Home',
  components: {
    Header,
    Aside,
    Main,
},
  setup(props) {
    
  }
}
</script>

<style scoped>
.common-layout,
.el-container {
  height: 100%;
}
.el-header{
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background-color:rgb(211, 236, 248); */
  background-color: #39453f;
  box-shadow: -1px 8px 5px -3px #5c7066;
}
/* .el-aside{
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  opacity: 0.8  ;
  box-shadow: 5px 5px 10px rgb(19, 19, 19);

} */
::v-deep(.el-main){
  display: flex;
  justify-content: center;
  padding: 20px 0 20px 0;
  /* background-color: rgb(250, 255, 255); */
}
.el-footer{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40px;
  background-color: black;
  color: #fff;;
}
</style>