import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import {useAuthStore} from "../store/authStore";
import {ElMessage} from "element-plus";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/login',
        name: "Login",
        component: Login
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    let isAuthenticated = authStore.isAuthenticated
    if (to.meta.requiresAuth && !isAuthenticated) {
        ElMessage({
            type: 'warning',
            message: '请先登录'
        })
        next('/login')
    } else {
        next()
    }
})

export default router

