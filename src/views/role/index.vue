<template>
  <div class="container">
    <div class="app-container">
      <!-- Operate Start -->
      <div class="app-container__Operate">
        <el-button type="primary" size="mini">添加角色</el-button>
      </div>
      <!-- Operate End -->

      <!-- Table Start -->
      <el-table :data="list">
        <el-table-column prop="name" width="200px" align="center" label="角色"></el-table-column>
        <el-table-column prop="state" width="200px" align="center" label="启用"></el-table-column>
        <el-table-column prop="description" align="center" label="描述"></el-table-column>
        <el-table-column align="center" label="操作"></el-table-column>
      </el-table>
      <!-- Table End -->

      <!-- Pagination Start -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px;">
        <el-pagination layout="prev, pager, next"></el-pagination>
      </el-row>
      <!-- Pagination End -->
    </div>
  </div>
</template>

<script>
import { apiGetRoleList } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await apiGetRoleList()
      this.list = rows
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
