<script setup>
import axios from 'axios'
import {onMounted, ref} from "vue";

let msg = ref();
onMounted(() => {
  axios.get('http://localhost:8080/hello').then(res => {
    msg.value = res.data
  }).catch(err => {
    console.log(err)
  })
})

</script>

<template>
  <h1>{{msg}}</h1>
</template>

<style scoped>

</style>
