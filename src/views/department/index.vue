<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree :expand-on-click-node="false" default-expand-all :data="depes" :props="defaultProps">
        <template v-slot="{ data }">
          <el-row type="flex" justify="space-betweent" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col span="4">
              <span class="el-col-span_manager">{{ data.managerName }}</span>
              <!--
                  $event 实参 表示类型
                  operateDept($event) <=> operateDept
               -->
              <el-dropdown @command="operateDept($event, data.id)">
                <!-- 显示区域内容 -->
                <span class="el-dropdown-link">
                  操作 <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <!-- 下拉菜单选项 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <!-- 放置弹层组件 -->
    <!-- .sync 语法糖 说白了就是可以简化父组件对子组件传递过来的数据的接收 -->
    <!-- 会接受子组件的事件 update:isShowDialog => 并且可以接收到子组件对值的改变，进行重新赋值 -->
    <add-dept :current-node-id="currentNodeId" :show-dialog.sync="isShowDialog" @updateDepartment="updateDepartment" />
  </div>
</template>

<script>
import { getDepartment } from '@/api'
import { transListToTreeData } from '@/utils'
import AddDept from './AddDept'
export default {
  name: 'Department',
  components: {
    AddDept
  },
  data() {
    return {
      isShowDialog: false,
      currentNodeId: null,
      depes: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  mounted() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      const res = await getDepartment()
      this.depes = transListToTreeData(res, 0)
    },
    operateDept(type, id) {
      console.log(type, id)
      if (type === 'add') {
        // 添加子部门
        this.isShowDialog = !this.isShowDialog
        this.currentNodeId = id
      }
    },
    updateDepartment() {
      this.getDepartment()
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
