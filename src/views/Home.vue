<template>
  <div class="home">
    <div @click="handleLogin">首页</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      loginForm: { username: 'fpc', password: '123456' }
    }
  },
  methods: {
    handleLogin() {
      console.log(111)
      this.$store
        .dispatch('login', this.loginForm)
        .then(() => {
          this.$router.push({
            path: this.redirect || '/',
            query: this.otherQuery
          })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
