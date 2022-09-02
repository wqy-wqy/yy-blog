<template>
<div class="main-card">
        <el-card style="width:80%; height: 100%; opacity:0.9">
            <MdEditor
            toolbarsExclude="['link', 'mermaid', 'katex', 'github']"
            class="md"
            v-model="text"
            @onUploadImg="onUploadImg"
            @onHtmlChanged="saveHtml"
            @onSave="codeSave" />
        </el-card>
        <el-button style="margin-left:10px" @click="submitBlog()">提交</el-button>
     </div>
     <div>
  
      <!-- 提交博客对话框 -->
     <el-dialog
    v-model="dialogVisible"
    title="博客提交"
    width="40%"
    draggable
    style="color: aquamarine;"
  >
        <el-form :model="blogform" label-width="120px">
    <el-form-item label="博客标题">
      <el-input v-model="blogform.name" />
    </el-form-item>
    <el-form-item label="博客简介">
      <el-input v-model="blogform.summary" />
    </el-form-item>
    <el-form-item label="博客分类">
      <el-select v-model="selectValue" placeholder="请选择分类">
        <el-option
        v-for="item in blogform.cate"
        :key="item.id"
        :label="item.categoryName"
        :value="item.categoryName"
      />
      </el-select>
    </el-form-item>
    <el-form-item label="创建日期">
      <el-input v-model="blogform.createDate" disabled />
    </el-form-item>
  <el-form-item label="博客标签">
     <el-tag
    v-for="tag in dynamicTags"
    :key="tag.id"
    class="mx-1"
    closable
    :disable-transitions="false"
    @close="handleClose(tag)"
  >
    {{ tag.tagName }}
  </el-tag>
  <el-input
    v-if="inputVisible"
    ref="InputRef"
    v-model="inputValue"
    class="ml-1 w-20"
    size="small"
    @keyup.enter="handleInputConfirm"
    @blur="handleInputConfirm"
  />
  <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput" style="margin-top:5px">
    + New Tag
  </el-button>
    </el-form-item>
    <!-- <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item> -->
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="reset()">取消</el-button>
        <el-button @click="onSubmit()"
        >提交</el-button
        >
      </span>
        <!-- <img src="http://re87penua.hn-bkt.clouddn.com/git提交信息.png" /> -->
    </template>
  </el-dialog>
        
     </div>
</template>
 
<script>
import {defineComponent, reactive, toRefs, onMounted,ref,nextTick,getCurrentInstance} from 'vue'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ElInput } from 'element-plus'
import axios from 'axios';
import router from '../../router';
import { useRoute } from 'vue-router'
// import sanitizeHtml from 'sanitize-html';
export default defineComponent({
    components: {
        MdEditor,
        // sanitizeHtml,
    },
    setup() {
        // 显示对话框是否显示
        const dialogVisible = ref(false);
        const datamd = reactive({
            text: '',
            load: 0,
            isDis: false
        });
        const codeSave = () => {
            ElMessage.info('已保存')
            localStorage.setItem('codeSave', v)
        };
        onMounted(() => {
            if (localStorage.getItem('codeSave')) {
                datamd.text = localStorage.getItem('codeSave') || ''
            };
        })
        // 标签
        const inputValue = ref('')
        const dynamicTags = ref([])
        const inputVisible = ref(false)
        const InputRef = ref()

        const handleClose = (tag) => {
          dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
        }

        const showInput = () => {
            inputVisible.value = true
            nextTick(() => {
                // console.log(InputRef.value)
                InputRef.value.focus()
            })
        }

      const handleInputConfirm = () => {
        if (inputValue.value) {
          // 新建标签
          dynamicTags.value.push({
            id: null,
          tagName:inputValue.value
          })
        console.log(dynamicTags.value)
          // addTag();
        }

        inputVisible.value = false
        inputValue.value = ''
        // 重新获取所有标签
        // getAlltag()
      };
        // 新建标签
      // const addTag = async () => {
      //   // dynamicTags.value.push(inputValue.value)
      //   // console.log(inputValue.value);
      //   // const { data }=await axios.post(`http://1.15.245.33:8888/tag/new?name=${inputValue.value}`)
      //   // console.log(data);
      // }
        // 提交博客
        const submitBlog = () => {
          dialogVisible.value = true;
            console.log(datamd.text);
        }
        // 上传图片
        const onUploadImg = async (files, callback) => {
            const res = await Promise.all(
                files.map((file) => {
                    return new Promise((rev, rej) => {
                        let formData = new FormData();
                        formData.append('image', file);
                        axios({
                            method: 'post',
                            url: '/upload',
                            // headers: {
                            //     'Content-Type': 'multipart/form-data'
                            // },
                            data: formData
                        })
                            .then((res) => rev(res))
                            .catch((error) => rej(error));
                    });
                })
            );
            // console.log(res.data)
            callback(res.map((item) => item.data.data));
        };
        // 获取html内容
      const textHtml = ref('');
      const saveHtml = (h) => {
        textHtml.value = h;
      }
        // 当前创建博客的时间
        const dayDate = ref('')
        // 获取当前时间
        const day = () => {
            const nowDate = new Date();
            const date = {
                year: nowDate.getFullYear(),
                month: nowDate.getMonth() + 1,
                day: nowDate.getDate(),
            }
            dayDate.value = date.year + '-' + (date.month >= 10 ? date.month : '0' + date.month) + '-' + (date.day >= 10 ? date.day : '0' + date.day)
            // console.log(dayDate.value);
        };
      day();
        // 分类框选中的值
      const selectValue = ref('');
      // 分类框选中的id
      const secateId = ref('');
        // 提交表单对话框
      const blogform = reactive({
        name: '',
        summary: '',
        cate: '[]',
        cateId: '',
        // createDate: nowDate.getFullYear + '-' + ((nowDate.getMonth()+1) >= 10 ? nowDate.getMonth() : '0' + nowDate.getMonth()) + '-' + (nowDate.getDate >= 10 ? nowDate.getDate : '0' + nowDate.getDate),
        createDate: dayDate.value,
        tag: '[]',
        desc: '',
      });
      
        // 获取所有分类
      const getAllcate = async () => {
        let { data } = await axios.get('http://1.15.245.33:8888/cate');
        blogform.cate = toRefs(data).data;
        // console.log(blogform.cate);
        
      }
      getAllcate();
      // 获取所有标签
      const getAlltag = async () => {
        let { data } = await axios.get('http://1.15.245.33:8888/tag');
        // console.log(data.data);
        dynamicTags.value =data.data;
        // console.log(JSON.parse(JSON.stringify(dynamicTags.value)));
      };
      getAlltag();
      // 取消
      const reset = () => {
        selectValue.value = '';
        blogform.name = '';
        blogform.summary = '';
        getAlltag();
        dialogVisible.value = false
      }
      // 新建文章的id
      const articleId = ref(null);
      // 获取token
      const token = window.localStorage.getItem('token');
        // 向后端提交表单
    const { proxy } = getCurrentInstance() // 1.获取proxy实例
      const onSubmit =async () => {
        // 获取选中的分类id
        blogform.cate.forEach(element => {
          if (element.categoryName == selectValue.value) {
            secateId.value = element.id;
          }
        });
        // console.log(textHtml.value)
        let { data } = await proxy.$http.post('/articles/publish', {
          'token': token,
          'body': {
            'content': datamd.text,
            'contentHtml':textHtml.value,
          },
          'articleId':articleId.value,
          'categoryId': secateId.value,
          'summary': blogform.summary,
          'tags': JSON.parse(JSON.stringify(dynamicTags.value)),
          'title': blogform.name,
        }, {
          headers: {
            'Authorization': token
    },
        })
        // console.log(data);
        // console.log(JSON.parse(JSON.stringify(dynamicTags.value)));
            //  console.log(token+"主要内容："+data.text+"分类ID"+blogform.cateId+" 标签："+JSON.parse(JSON.stringify(dynamicTags.value)));
      // console.log(blogform.summary)
        dialogVisible.value = false
        datamd.text = '';
        router.push('/home')
      
      }
        // 编辑博客
        const id = ref('');
        let route = useRoute();
        id.value = route.query.blogId;
        // 获取该文章内容
         const load = async() => {
                try {
                    // 解构
                    // 根据传递的id值获取对应的数据
                    let { data } = await axios.post(`/articles/detail/${id.value}`);
                    console.log(data);
                    // 将数据赋值给posts，posts由ref定义响应式，可更新到页面
                    blogform.name = data.data.title;
                  blogform.summary = data.data.summary;
                  secateId.value = data.data.category.id;
                  selectValue.value = data.data.category.categoryName;
                  datamd.text = data.data.body.content;
                  dynamicTags.value = data.data.tags;
                  articleId.value = id.value;
                } catch (error) {
                    console.log(error);
                }
            }
            // 执行函数
            // console.log(id.value);
        load();
        return {
            ...toRefs(datamd),
            codeSave,
            submitBlog,
            dialogVisible,
            blogform,
            onSubmit,
            onUploadImg,
            // tags,
            dynamicTags,
            handleInputConfirm,
            showInput,
            handleClose,
            InputRef,
            inputValue,
          inputVisible,
          selectValue,
          reset,
          saveHtml
        }
    }


})
</script>
<style lang="scss" scoped>
.main-card{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;   
}
.el-button{
    background-color:#39453f ;
    border: none;
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
 .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .md {
    height: 95%;
  }
  ::v-deep(.el-card__body) {
    height: 100% !important;
  }
//   .el-input .el-input-small{
//     margin-top: 5px;
//   }
</style>