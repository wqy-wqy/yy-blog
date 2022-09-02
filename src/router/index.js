import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/components/Main.vue'
// 路由匹配规则
const routes = [{
        path: '/',
        component: () =>
            import ('../views/components/Main.vue'),
        redirect: '/home',
        children: [{
                path: '/home',
                component: () =>
                    import ('../views/components/Blogmain.vue'),
                children: [{
                    path: '/home',
                    component: () =>
                        import ('../views/components/Bloghome.vue'),
                }, {
                    path: '/home/see',
                    component: () =>
                        import ('../views/tabs/Seeblog.vue')
                }]
            }, {

                path: '/place',
                component: () =>
                    import ('../views/tabs/Blogplace.vue')
            },
            {
                path: '/new',
                component: () =>
                    import ('../views/tabs/Newblog.vue')
            },
            {
                path: '/manage',
                component: () =>
                    import ('../views/tabs/Manageblog.vue')
            },

        ]
    }, ]
    // 创建一个路由
const router = createRouter({
        // 路由形式
        history: createWebHistory(),
        routes
    })
    // 导出去
export default router