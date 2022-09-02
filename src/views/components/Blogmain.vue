<template>
<div class="mainmain">
    <router-view></router-view>
</div>
    <div class="footer"> 
        <a href="https://beian.miit.gov.cn" class="beian">琼ICP备2022010574号</a>
    </div>
</template>
<style scoped>
.mainmain{
    /* position: relative; */
    padding: 0;
    width: 100%;
    height: auto;

}
.footer {
   position:relative;
   display: flex;
   flex-direction: column;
   justify-content: center;
   width: 100%;
   height:40px;
   /* margin-top:0px; */
  background-color: black;
  /* z-index: -1; */
}
.beian{
  text-decoration: none;
  width: 180px;
  color: #fff;
  margin-left: 20px;
}
.main-card{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;   
}
.box-card{
    width: 40%;
    height: 20%;
    box-shadow: 12px 15px 10px 0px black;
    margin: 0 20px 20px 20px;
}
/* .main-card .box-card:last-child{margin-left: 0;} */
::-webkit-scrollbar {
    width: 0 !important;
}

 ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
}
</style>

