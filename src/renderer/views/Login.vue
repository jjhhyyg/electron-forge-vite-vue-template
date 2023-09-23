<template>
  <el-form :model="loginForm" label-width="120px">
    <el-form-item label="用户名">
      <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>

import {reactive} from "vue"
import {useAuthStore} from "../store/authStore"
import {storeToRefs} from "pinia"
import api from "../api/axios";
import router from "../router";
import {ElMessage} from "element-plus";

const authStore = useAuthStore()

const loginForm = reactive({
  username: "",
  password: ""
})

const login = () => {
  api.post('/auth/login', {
    username: loginForm.username,
    password: loginForm.password
  }).then((res) => {
    authStore.isAuthenticated = res.data
    if (authStore.isAuthenticated) {
      authStore.username = loginForm.username
      authStore.password = loginForm.password
      router.push({name: 'Home'}).then(() => {
        ElMessage.success('登录成功')
      })
    } else {
      ElMessage.error('账号或密码错误')
    }
  })
}


</script>

<style lang="scss" scoped>

</style>