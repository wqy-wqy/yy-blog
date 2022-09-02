<template>
    <!-- <div class="top-header"> -->
    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#39453f"
    text-color="#fff"
    active-text-color="#6cb6ff"
    @select="handleSelect"
    :router="true"
  >
  <!-- 左侧标题 -->
    <span class="top-title">
     YY with YY
    </span>
  <!-- 中间菜单项 -->
  <!-- <div class="top-mid"> -->
    <el-menu-item index="/">首页</el-menu-item>
    <!-- <el-menu-item index="/place" v-if="isLogin">文章规档</el-menu-item> -->
    <el-menu-item index="/manage" v-if="isLogin">文章管理</el-menu-item>
    <el-menu-item index="/new" v-if="isLogin">写文章</el-menu-item>
  <!-- </div>    -->
  <!-- 右侧  搜索 -->
  </el-menu>
<div class="top-right">
    <el-input
        v-model="servalue"
        placeholder="请输入搜索内容"
        clearable
        :prefix-icon="Search"
      >
      <template #prefix>
                    <el-icon><Search /></el-icon>
        </template>
      </el-input> 
         <!-- 登录按钮 -->
    <el-button class="login-btn" @click="drawer = true" v-if="!isLogin">
    登录
  </el-button>  
   <!--退出按钮  -->
    <el-button class="log-btn" @click="closeDog()" v-if="isLogin">退出</el-button>
  </div>
      <!-- 登录表单 -->
  <el-drawer v-model="drawer" title="login" :with-header="false">
    <div>
         <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    label-width="120px"
    class="demo-ruleForm"
  >
  <el-form-item label="用户名" prop="pass">
      <el-input v-model="ruleForm.username" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button color="#5f7068" @click="loginDog()" >登录</el-button>
      <el-button color="#5f7068" @click="resetDog()">清空</el-button>
    </el-form-item>
  </el-form>
    </div>
  </el-drawer>
</template>
<script>
import { ref,reactive,getCurrentInstance,onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import router from '../../router'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
    components: {
        Search,
    },
  setup() {
    // 是否登录
    const isLogin = ref(false);
     // 菜单栏默认高亮
    const { currentRoute } = useRouter()
    const activeIndex = ref('');
    // 菜单栏
    const handleSelect = (key, keyPath) => {
      activeIndex.value = "/" + currentRoute.value.path.split('/')[1];
      
    };
    // 搜索框
    const servalue = ref("");
    // 登录表单
    const ruleFormRef = ref();
    const drawer = ref(false);
    const ruleForm = reactive({
      username: '',
      password: '',
      checkPass: '',
    });
   
    const { proxy } = getCurrentInstance() // 1.获取proxy实例
    
    //   登录功能
    const loginDog = async () => {
      if (!ruleForm.username) {
        ElNotification({
          title: 'Error',
          message: '填一下名字！',
          type: 'error',
          position: 'top-left',
        })
      } else if (!ruleForm.password) {
        ElNotification({
          title: 'Error',
          message: '填一下密码！',
          type: 'error',
          position: 'top-left',
        })
      } else {
        // 向后端访问验证用户名与密码
        try {
          // 解构
          // 根据传递的id值获取对应的数据
          let { data } = await proxy.$http.post('/login', {
            'account': ruleForm.username,
            'password': ruleForm.password
          });
         
          // 将数据赋值给posts，posts由ref定义响应式，可更新到页面
          if (data.code === 200) {
            isLogin.value = true;
            window.localStorage.setItem("token", data.data);
            drawer.value = !drawer.value
            ruleForm.username = '';
            ruleForm.password = '';
            ruleForm.checkPass = '';
          } else {
            ElNotification({
              message: '您输入的用户名与密码不正确，请重新输入！',
              type: 'error',
              position: 'top-left',
            })
            
          }
          // console.log(data)

        } catch (error) {
          console.log(error);
        }
      }

    };
    // 判断是否是登录状态:token 存在
    const isToken = () => {
      if (window.localStorage.getItem('token') != null) {
        // console.log(window.localStorage.getItem('token'))
        isLogin.value = true;
      } else {
        isLogin.value = false;
      }
    };
    // 执行
    isToken();
    // 重置按钮
    const resetDog = () => {
      ruleForm.username = '';
      ruleForm.password = '';
      ruleForm.checkPass = '';
    };
    // 退出按钮
    const closeDog = () => {
      ruleForm.username = '';
      ruleForm.password = '';
      ruleForm.checkPass = '';
      isLogin.value = false;
      activeIndex.value = '/';
      window.localStorage.removeItem('token');
      ElNotification({
        message: '您已经成功退出！',
        type: 'success',
        position: 'top-left',
      })
      router.push("/home")
      
    }
    const onMounted = () => {
      //高亮首页菜单
      activeIndex.value = '/';
    };
    return {
      activeIndex,
      handleSelect,
      servalue,
      drawer,
      ruleFormRef,
      ruleForm,
      loginDog,
      closeDog,
      resetDog,
      isLogin
    }
  }
}
</script>

<style lang="scss" scoped>
.top-title{
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 30px;
    font-style: italic;
    font-weight: 800;
    color: #fff;
    width: 30%;
}
.el-menu--horizontal {
  border-bottom: none !important;
  /* text-align: center; */
}
.el-menu-item{
  border-bottom: none !important;
  font-size: 18px !important;
}
.top-right{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 15%;
    position: fixed;
    right: 80px;
    top:13px
}
.login-btn{
    position: fixed;
    right: 0px;
    top:0px;
    opacity: 0;
}
.log-btn{
  position: fixed;
    right: 10px;
    top:15px;
    background-color: #171f1b;
    border: #000e0e;
    &:hover {
    color: rgb(240, 248, 255) !important;
    background-color: #5f7068 !important;
    border-color: #5f7068(148, 197, 238);
  }
  &:active {
    color: rgb(240, 248, 255);
    background-color: #5f7068;
    border-color: #5f7068(148, 197, 238);
  }
}
.el-drawer{
    flex-direction: column !important;
    justify-content: center;
    align-items: center;
}
.el-button{
    background-color:#222925 ;
    color: #fff;
  &:hover {
    color: rgb(240, 248, 255) !important;
    background-color: #5f7068 !important;
    border-color: #5f7068(148, 197, 238) !important;
  }
  &:focus{
    color: rgb(240, 248, 255) !important;
    background-color: #5f7068 !important;
    border-color: #5f7068(148, 197, 238) !important;
  }
  &:active {
    color: rgb(240, 248, 255) !important;
    background-color: #5f7068;
    border-color: #5f7068(148, 197, 238);
  }
}
    .el-menu--horizontal > .el-menu-item.is-active,
    .el-menu--horizontal > .el-menu-item.is-active:hover{
      /*高亮后 item 样式 */
      color: #a7dac9 !important;
    }
 
     .el-menu--horizontal > .el-menu-item:hover {
      /*鼠标滑过 item 样式 */
      /*高亮后 item 样式 */
      color: #d6e5de !important;

    }
</style>