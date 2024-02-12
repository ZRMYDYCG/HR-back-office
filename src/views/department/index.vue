<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree :data="depes" :props="defaultProps">
        <template v-slot="{ data }">
          <el-row type="flex" justify="space-betweent" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col span="4">
              <span class="el-col-span_manager">{{ data.managerName }}</span>
              <el-dropdown>
                <!-- 显示区域内容 -->
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <!-- 下拉菜单选项 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                  <el-dropdown-item>编辑部门</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script>
import { getDepartment } from '@/api'
export default {
  name: 'Department',
  data() {
    return {
      depes: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  mounted() {
    this.GETDEPARTMENT()
  },
  methods: {
    async GETDEPARTMENT() {
      const res = await getDepartment()
      this.depes = res
    }
  }
}
</script>

<style scoped lang="scss">
.app-container {
  padding: 30px 140px;
  font-size: 14px;
  .el-tree  {
    .el-row {
      width: 100%;
      .el-col {
        .el-col-span_manager {
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
