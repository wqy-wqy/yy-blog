import { ref, reactive, getCurrentInstance } from 'vue'
import { createApp, } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import router from './router'
import axios from 'axios'
import './icon/iconfont.css'
// import VueSmoothScroll from "vue2-smooth-scroll";


const pinia = createPinia();
const app = createApp(App);
axios.defaults.baseURL = 'http://1.15.245.33:8888'
app.use(pinia)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
app.config.globalProperties.$http = axios

Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key])
})