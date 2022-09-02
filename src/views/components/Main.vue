<template>
<div class="mainmain">
<router-view></router-view>
</div> 
</template>

<style scoped>
.mainmain{
    position: relative;
    width: 100%;
    height: auto;

}
/* .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20px;
    background-color: black;
} */
.main-card{
    display: flex;
    /* flex-wrap: wrap; */
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