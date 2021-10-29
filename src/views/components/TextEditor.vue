<template>
  <div ref="editor"
       class="text-editor"></div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted () {
    const editor = new E(this.$refs.editor)
    editor.config.onchange = (value) => {
      this.$emit('input', value)
    }
    editor.create()
    editor.txt.html(this.value)
  }
}
</script>

<style></style>
