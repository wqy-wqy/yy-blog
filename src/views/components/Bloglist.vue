<template>
    <div>
    <div style="margin-bottom: 15px; margin-left: 115%;"><el-switch v-model="fill" style="color: #39453f;"/></div>
    <el-space :fill="fill" wrap>
      <el-card v-for="item in allblog" :key="item.id" class="box-card">
        <template #header>
          <div class="card-header" style="margin: -10px 0">
            <span>{{item.title}}</span>
            <el-button class="blog-btn" text @click="seeBlog(item.id)">查看</el-button>
          </div>
        </template>
         <span>{{item.summary}}</span>
      </el-card>
    </el-space>
  </div>
</template>
<script>
import { ref } from 'vue'
import Aside from '../components/Aside.vue';
import router from '../../router';
import axios from 'axios';
export default {
  components: {
    Aside,
  },
  setup() {
    const allblog = ref([]);
    const fill = ref(true);
    // 获取所有文章
    const getAllblog = async () => {
      let { data } = await axios.post('http://1.15.245.33:8888/articles', {
        'page': 0,
        'pageSize':10
      })
      allblog.value = data.data;
      // console.log(data);
    }
    getAllblog();
    // 点击查看跳转路由查看按钮
    const seeBlog = (id) => {
      router.push({ path: '/home/see', query: { blogId: id } });
    }
    return {
      allblog,
      fill,
      seeBlog,
    }
  }
}
</script>
<style>
.box-card{
    /* position: relative; */
    height: 100%;
    width: 100%;
    margin-right: 20px;
    margin-bottom: 20px;
    box-shadow: 5px 5px 10px rgb(19, 19, 19) !important;
    opacity: 0.7;
}
.el-switch{
    --el-switch-on-color: #39453f !important;  
}

.blog-btn{
    /* position: absolute; */
    float: right;
}
</style>