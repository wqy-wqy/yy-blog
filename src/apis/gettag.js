import { ref } from "vue"
import axios from "axios";
// 该方法在Details中使用，根据id获得所要展示的内容
const gettag = () => {
        // console.log(id)
        const post = ref({});
        // 定义一个异步方法获取数据
        const load = async() => {
                try {
                    // 解构
                    // 根据传递的id值获取对应的数据
                    // console.log(id)
                    let { data } = await axios(`/tag`);

                    // 将数据赋值给posts，posts由ref定义响应式，可更新到页面
                    console.log(data)
                        // data.body = data.body.replace(/\n/g, '<br>');
                    post.value = data;
                    // console.log(post)

                } catch (error) {
                    console.log(error);
                }
            }
            // 执行函数
        load();
        // 返回所被需要的内容，可以返回load，这样组件调用方也可以调用load方法
        return { post }
    }
    // 将所需要的内容导出
export default gettag