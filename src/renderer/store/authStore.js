import {defineStore} from 'pinia'
import {ref} from "vue";
import api from "../api/axios";
import router from "../router";
import {ElMessage} from "element-plus";

export const useAuthStore = defineStore('auth', () => {
    const username = ref('')
    const password = ref('')
    const isAuthenticated = ref(false)

    function logout() {
        username.value = ''
        password.value = ''
        isAuthenticated.value = false
    }

    return {username, password, isAuthenticated, logout}
})