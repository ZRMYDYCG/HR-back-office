<template>
  <div class="container">
    <div class="app-container">
      <!-- leftTree Start -->
      <div class="left">
        <el-input style="margin-bottom:10px" type="text" prefix-icon="el-icon-search" size="small"
          placeholder="输入员工姓名全员搜索" />
        <!-- 树形组件 -->
        <el-tree ref="deptTree" node-key="id" :data="depts" :props="defaultProps" default-expand-all
          :expand-on-click-node="false" highlight-current @current-change="selectNode"></el-tree>
      </div>
      <!-- leftTree End -->
      <!-- rightTable Start -->
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary">添加员工</el-button>
          <el-button size="mini">excel导入</el-button>
          <el-button size="mini">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <!-- 分页 -->
      </div>
      <!-- rightTable End -->
    </div>
  </div>
</template>

<script>
import { getDepartment } from '@/api/index'
import { transListToTreeData } from '@/utils/index'
export default {
  name: 'Employee',
  data() {
    return {
      depts: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      queryParams: {
        departmentId: null
      }
    }
  },
  methods: {
    async apiGetDepartment() {
      // 将列表转为树形结构
      this.depts = transListToTreeData(await getDepartment(), 0)
      // 定义默认要被选中的节点
      this.queryParams.departmentId = this.depts[0].id
      // 树组件渲染为异步, 等待其更新完毕
      this.$nextTick(() => {
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId)
      })
    },
    selectNode(node) {
      this.queryParams.departmentId = node.id
    }
  },
  created() {
    this.apiGetDepartment()
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;

  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }

  .right {
    flex: 1;
    padding: 20px;

    .opeate-tools {
      margin: 10px;
    }

    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display: inline-block;
    }
  }
}
</style>
