<template>
     <el-space direction="vertical" class="space">
    <el-card v-for="item in userlist" :key="item.id" class="box-card" style="width: 310px !important">
      <template #header>
        <div class="card-header" style="margin: -10px 0 ">
          <img :src=item.avatar style="width:60px;height:60px">
          <el-button class="jianli-btn" text>简历</el-button>
        </div>
      </template>
      <div class="textinfo" style="margin-top:-10px"><el-icon style="margin:0 10px 0 0px;"><Avatar /></el-icon>
      <span>{{item.name}}</span></div>
      <div class="textinfo"><span class="iconfont icon-ico-sex" style="margin:0 10px 0 0px;"></span>
      <span>{{item.gender}}</span></div>
      <div class="textinfo"><span class="iconfont icon-work" style="margin:0 10px 0 0px;"></span>
      <span>{{item.post}}</span></div>
       <div class="textinfo"><span class="iconfont icon-email" style="margin:0 10px 0 0px; width: 10px;height: 10px;"></span>
      <span style="text-decoration: none; color: black;">{{item.email}}</span></div>
      <div class="textinfo"><span class="iconfont icon-github" style="margin:0 10px 0 0px;"></span>
      <a :href=item.github style="text-decoration: none; color: black;">{{item.github}}</a></div>
      <div class=""><el-icon style="margin:0 10px 0 0px;"><Promotion /></el-icon>
      <span>{{item.aboutMe}}</span></div>
    </el-card>
  </el-space>
</template>
<script>
import axios from 'axios';
import { ref} from 'vue'
export default {
  setup() {
    const userlist = ref([]);
    // 获取当前用户信息
    const getUserlist = async () => {
      let { data } = await axios.get('http://1.15.245.33:8888/users/yy', {
        headers: {
          'Authorization': window.localStorage.getItem('token')
        },
      });
      userlist.value=data.data
      console.log(userlist.value);
    };
    getUserlist();
    // userlist.value = [{
    //   nickname: 'yy1',
    //   sex: "男",
    //   title:"后端"
    // },
    // {
    //   nickname: 'yy2',
    //   sex: "女",
    //   title:"前端"
    //   }];
    return {
      userlist,
    }
  }
}
</script>
<style scoped>
.textinfo {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  /* text-align: center; */
}
::v-deep(.el-card__body){
  padding: 10px;
}
/* .aisde-card{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50%;
    
} */
.space {
  margin-top: 46px;
}
.box-card{
    height: 100%;
    width: 100%;
    box-shadow: 5px 5px 10px rgb(19, 19, 19) !important;
    /* margin-top: 10px; */
    opacity: 0.8;
}
.jianli-btn{
  float: right;
  margin-top: 35px;
}
::v-deep(.el-card__header){
  padding: 15px 0px 10px 10px;
}
</style>