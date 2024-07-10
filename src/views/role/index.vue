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
        <el-table-column prop="name" width="200px" align="center" label="角色"></el-table-column>
        <el-table-column prop="state" width="200px" align="center" label="启用">
          <template v-slot="{ row }">
            {{ row.state === 1 ? '已启用' : '禁用' }}
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述"></el-table-column>
        <el-table-column align="center" label="操作">
          <template>
            <el-button size="mini" type="text">分配权限</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
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
      <el-dialog title="新增角色" :visible.sync="showDialog">
        <el-form label-width="120px">
          <el-form-item label="角色名称">
            <el-input size="mini"></el-input>
          </el-form-item>
          <el-form-item label="启用">
            <el-switch></el-switch>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input type="textarea" size="mini"></el-input>
          </el-form-item>
          <el-from-item>
            <el-row type="flex" justify="center">
              <el-button>确定</el-button>
              <el-button>取消</el-button>
            </el-row>
          </el-from-item>
        </el-form>
      </el-dialog>
      <!-- Dialog End -->
    </div>
  </div>
</template>

<script>
import { apiGetRoleList } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      list: [],
      pageParams: {
        page: 1,
        pagesize: 2,
        total: 0
      },
      showDialog: false
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
    },
    changePage(newPage) {
      this.pageParams.page = newPage
      this.getRoleList()
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
