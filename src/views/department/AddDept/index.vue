<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="closeDialog">
    <!-- 放置弹层内容 -->
    <el-form ref="addDept" :rules="rules" :model="formData" label-width="120px">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="formData.name" style="width: 80%;" size="mini" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="formData.code" style="width: 80%;" size="mini" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item prop="managerId" label="部门负责人">
        <el-select v-model="formData.managerId" style="width: 80%;" size="mini" placeholder="选择负责人" />
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input v-model="formData.introduce" type="textarea" :rows="4" style="width: 80%;" size="mini" placeholder="1-100个字符" />
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
import { getDepartment } from '@/api'
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        code: '',
        introduce: '',
        managerId: '',
        name: '',
        pid: ''
      },
      rules: {
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            min: 2, max: 10, message: '部门编码的长度为2-10个字符', trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: async(rule, value, callback) => {
              /*
              * @params(value:就是输入的编码)
              */
              const res = await getDepartment()
              if (res.some(item => item.code === value)) {
                callback(new Error('部门中已经有该编码了'))
              } else {
                callback()
              }
            }
          }
        ],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          {
            min: 1, max: 100, message: '部门介绍的长度为1-100个字符', trigger: 'blur'
          }
        ],
        managerId: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            min: 2, max: 10, message: '部门名称的长度为2-10个字符', trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: async(rule, value, callback) => {
              /*
              * @params(value:就是输入的编码)
              */
              const res = await getDepartment()
              if (res.some(item => item.name === value)) {
                callback(new Error('部门中已经有该名称了'))
              } else {
                callback()
              }
            }
          }
        ]
      }
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
