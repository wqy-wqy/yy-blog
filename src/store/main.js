// defineStore定义容器
// 参数1：是对仓库的命名，名称必须具备唯一性；
// 参数2：配置的选项对象，即state、getters、actions
// ，其中state的写法必须是函数，为了避免在服务端交叉请求
// 导致的状态数据污染，而且必须是箭头函数，为了更好的TS类型推导。
import { defineStore } from 'pinia'

export const mainStore = defineStore('main', {
    // pinia取消了vuex中的mutation，Actions既可以同步也可以异步

    // store:用来存储全局的状态的，这里边定义的，就可以是为SPA里全局的状态了,
    state: () => {
        return {
            count: 100,
            price: 250
        }
    },
    // getters属性：用来监视或者说是计算状态的变化的，有缓存的功能
    getters: {
        doubleCount() {
            return this.count * 2;
        },
        doublePrice() {
            return this.price * 2;
        }
    },
    //  actions属性：对state里数据变化的业务逻辑，需求不同，编写逻辑不同。说白了就是修改state全局状态数据的
    actions: {
        changeStore() {
            this.count += 1;
            this.price += 1;
        }
    }
})