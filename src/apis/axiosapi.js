// import axios from 'axios'
// // element引入文件
// import { ElMessage } from 'element-plus'
// // 这是我放基准地址的文件
// // 创建一个axios 实例
// const api = axios.create({
//         baseURL: "http://1.15.245.33:8888/", // 基准地址
//         timeout: 5000 // 超时时间
//     })
//     // 请求拦截
// api.interceptors.request.use((config) => {
//         return config // 请求拦截里面的需求可以自己写，有的项目需要配置很多，有的很少，这里就                                                                                        
//             // 不放了
//     }, error => {
//         Promise.reject(error)
//     })
//     // 响应拦截
//     /**
//     响应拦截也是一样，最基本的可以把返回出来的一些数据做简单处理，
//     比如把请求回来的提示信息解构出来，给予提示，这样就不用在每次请求完成后单独去写
//     这里用的是element-ui 里面的提示
//     **/
// api.interceptors.response.use((res) => {
//         const { data: result, meta: { msg, status } } = res.data

//         ElMessage({
//             message: msg,
//             type: 'success',
//         });
//         return result
//     }, error => {
//         Promise.reject(error)
//     })
//     // 最后导出
// export default api