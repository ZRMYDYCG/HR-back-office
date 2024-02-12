<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="closeDialog">
    <!-- 放置弹层内容 -->
    <el-form>
      <el-form-item label="部门名称">
        <el-input style="width: 80%;" size="mini" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input style="width: 80%;" size="mini" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select style="width: 80%;" size="mini" placeholder="选择负责人" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input type="textarea" :rows="4" style="width: 80%;" size="mini" placeholder="1-100个字符" />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button size="mini" type="primary">确定</el-button>
            <el-button size="mini" type="primary">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
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
