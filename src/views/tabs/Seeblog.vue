<template>
<div class="main-card">
       <el-card style="width:60%; opacity:0.9; overflow:auto;" >
       <h2>{{blog.title}}</h2>
       <el-card>
<MdEditor
           v-model="blog.body" 
           :previewOnly=isShow />
       </el-card>
        </el-card>
        <el-button style="margin-left:20px" @click="goBack()">返回</el-button>
        <el-button style="margin-left:20px" @click="goEditor()" v-if="isLogin">{{doact}}</el-button>
     </div>
</template>
<script>
import { ref,reactive,toRefs } from 'vue';
import axios from "axios";
import router from '../../router';
import { useRoute } from 'vue-router'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
export default {
    components: {
        MdEditor
    },
    setup() {
        // 是否登录
        const isLogin = ref(false);
        if (window.localStorage.getItem('token') === null) {
            isLogin.value=false
        } else {
            isLogin.value = true;
        }
        // 是否只预览
        const isShow = ref(true);
        const datamd = reactive({
            text: '',
            load: 0,
            isDis: false
        });
        const id = ref('');
        let route = useRoute();
        id.value = route.query.blogId;
        const blog = reactive({
            title: '',
            summary: '',
            createDate: '',
            body:''
        });
        const load = async() => {
                try {
                    // 解构
                    // 根据传递的id值获取对应的数据
                    let { data } = await axios.post(`/articles/detail/${id.value}`);
                    // console.log(data);
                    // 将数据赋值给posts，posts由ref定义响应式，可更新到页面
                    blog.title = data.data.title;
                    blog.summary = data.data.summary;
                    blog.createDate = data.data.createDate;
                    blog.body = data.data.body.content;
                    datamd.text = data.data.content;
                } catch (error) {
                    console.log(error);
                }
            }
            // 执行函数
        load();
        // 点击返回，回到首页
        const goBack = () => {
            router.push('/')
        };
        // 编辑or 保存
        const doact = ref('编辑');
        // 点击编辑
        const goEditor = () => {
            // isShow.value = false;
            // if (isShow.value) {
            //     doact.value = "编辑";
            // } else {
            //     doact.value = "保存";
            // };
            router.push({ path: '/new', query: { blogId: id.value } })
        };
        return {
            blog,
            goBack,
            ...toRefs(datamd),
            isShow,
            goEditor,
            doact,
           isLogin
        }
    }
}
</script>
<style lang="scss" scoped>
.el-button{
    background-color:#39453f ;
    border: #5f7068;
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
</style>