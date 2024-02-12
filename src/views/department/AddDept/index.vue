<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="closeDialog">
    <!-- 放置弹层内容 -->
  </el-dialog>
</template>

<script>
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style>

</style>
