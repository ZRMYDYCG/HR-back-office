<template>
  <div class="container">
    <div class="app-container">
      <!-- Operate Start -->
      <div class="app-container__Operate">
        <el-button type="primary" size="mini" @click="showDialog = true">添加角色</el-button>
      </div>
      <!-- Operate End -->

      <!-- Table Start -->
      <el-table :data="list">
        <el-table-column width="200px" align="center" label="角色">
          <template v-slot="{ row }">
            <!-- 条件判断 -->
            <el-input size="mini" v-model="row.editRow.name" v-if="row.isEdit"></el-input>
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200px" align="center" label="启用">
          <template v-slot="{ row }">
            <el-switch v-if="row.isEdit" v-model="row.editRow.state" :active-value="1" :inactive-value="0"></el-switch>
            <span v-else>{{ row.state === 1 ? '已启用' : '禁用' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="描述">
          <template v-slot="{ row }">
            <el-input type="textarea" v-if="row.isEdit" v-model="row.editRow.description"></el-input>
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <!-- 编辑状态 -->
            <template v-if="row.isEdit">
              <el-button size="mini" type="primary" @click="btnEditOk(row)">确定</el-button>
              <el-button size="mini" type="warning" @click="row.isEdit = false">取消</el-button>
            </template>
            <!-- 非编辑状态 -->
            <template v-else>
              <el-button size="mini" type="text">分配权限</el-button>
              <el-button size="mini" type="text" @click="btnEditRow(row)">编辑</el-button>
              <el-button size="mini" type="text">删除</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <!-- Table End -->

      <!-- Pagination Start -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px;">
        <el-pagination :page-size="pageParams.pagesize" :current-page="pageParams.page" :total="pageParams.total"
          background @current-change="changePage" layout="prev, pager, next"></el-pagination>
      </el-row>
      <!-- Pagination End -->

      <!-- Dialog Start -->
      <el-dialog @close="btnCancel" title="新增角色" :visible.sync="showDialog">
        <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
          <el-form-item prop="name" label="角色名称">
            <el-input v-model="roleForm.name" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="启用" prop="state">
            <el-switch :active-value="1" :inactive-value="0" v-model="roleForm.state"></el-switch>
          </el-form-item>
          <el-form-item prop="description" label="角色描述">
            <el-input v-model="roleForm.description" type="textarea" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="center">
              <el-button @click="btnOk">确定</el-button>
              <el-button @click="btnCancel">取消</el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- Dialog End -->
    </div>
  </div>
</template>

<script>
import { apiGetRoleList, addRole, updateRole } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      list: [],
      pageParams: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      showDialog: false,
      roleForm: {
        name: '',
        description: '',
        state: 0
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await apiGetRoleList(this.pageParams)
      this.list = rows
      this.pageParams.total = total
      // this.$set(目标对象, 属性名称, 初始值) 可以针对目标对象添加加响应式属性
      this.list.forEach(item => {
        this.$set(item, 'isEdit', false)
        this.$set(item, 'editRow', {
          name: item.name,
          state: item.state,
          description: item.description
        })
      })
    },
    changePage(newPage) {
      this.pageParams.page = newPage
      this.getRoleList()
    },
    btnOk() {
      this.$refs.roleForm.validate(async (pass) => {
        if (pass) {
          await addRole(this.roleForm)
          this.$message.success("新增角色成功")
          this.getRoleList()
          this.btnCancel()
        }
      })
    },
    btnCancel() {
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    btnEditRow(row) {
      row.isEdit = true
      row.editRow.name = row.name
      row.editRow.state = row.state
      row.editRow.description = row.description
    },
    async btnEditOk(row) {
      if (row.editRow.name && row.editRow.description) {
        await updateRole({ ...row.editRow, id: row.id })
        this.$message.success("角色信息更新成功")
        Object.assign(row, {
          ...row.editRow,
          isEdit: false // 退出编辑模式
        })
      } else {
        this.$message.warning("角色和描述不能为空")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .app-container {
    .app-container__Operate {
      padding: 10px;
    }
  }
}
</style>
