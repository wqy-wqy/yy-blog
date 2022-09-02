<template>
    <div class="main-card">
        <el-row :gutter="20">
        <el-col :span="4" :offset="3">
           <Aside />
        </el-col>
        <el-col :span="12" :offset="2">
        <Bloglist/>
        </el-col>
        </el-row>
     </div>
</template>
<script>
import { ref } from 'vue'
import Aside from '../components/Aside.vue'
import Bloglist from './Bloglist.vue';
export default {
    components: {
    Aside,
    Bloglist
},
    setup() {
        const allblog = ref([]);
        allblog.value = [1, 2, 3, 4,5,6,7,8,9];
        return {
            allblog,
        }
    }
}
</script>
<style scoped>
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