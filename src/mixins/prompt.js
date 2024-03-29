export default {
  data() {
    return {
      prompt: '',
      promptType: 'success'
    }
  },
  methods: {
    promptFn(msg = '', type = 'success') {
      const that = this
      this.prompt = msg
      this.promptType = type
      setTimeout(() => {
        that.prompt = ''
      }, 3000)
    }
  }
}
