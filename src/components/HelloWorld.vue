<template>
  <div>
    <input type="text" v-model="Phone">
    <button @click="getSmsCode">获取验证码</button>
    <input type="text" v-model="SmsCode">
  </div>
</template>

<script>
export default {
  data() {
    return {
      Phone: "",
      SmsCode: ''
    }
  },
  methods: {
    getSmsCode() {
      alert(90)
    }
  }
}
</script>

<style lang="scss">
body {
  font-size: 14px;
}
</style>
