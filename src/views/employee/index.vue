<template>
  <div class="container">
    <div class="app-container">
      <!-- leftTree Start -->
      <div class="left">
        <el-input v-model="queryParams.keyword" style="margin-bottom:10px" type="text" prefix-icon="el-icon-search"
          size="small" placeholder="输入员工姓名全员搜索" @input="inputChange" />
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
        <el-table :data="list">
          <el-table-column prop="staffPhoto" align="center" label="头像">
            <template v-slot="{ row }">
              <el-avatar v-if="row.staffPhoto" :src="row.staffPhoto"></el-avatar>
              <span v-else class="username">{{ row.username?.charAt(0) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" />
          <el-table-column prop="mobile" label="手机号" sortable />
          <el-table-column prop="workNumber" label="工号" sortable />
          <el-table-column prop="formOfEmployment" label="聘用形式">
            <template v-slot="{ row }">
              <span v-if="row.formOfEmployment === 1">正式</span>
              <span v-else-if="row.formOfEmployment === 2">非正式</span>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable />
          <el-table-column label="操作" width="280px">
            <template>
              <el-button size="mini" type="text">查看</el-button>
              <el-button size="mini" type="text">角色</el-button>
              <el-button size="mini" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row style="height: 60px" align="middle" type="flex" justify="end">
          <el-pagination layout="total,prev, pager, next" :total="total" :current-page="queryParams.page"
            :page-size="queryParams.pagesize" @current-change="changePage" />
        </el-row>
      </div>
      <!-- rightTable End -->
    </div>
  </div>
</template>

<script>
import { getDepartment } from '@/api/index'
import { apiGetEmployeeList } from '@/api/employee'
import { transListToTreeData } from '@/utils/index'
export default {
  name: 'Employee',
  data() {
    return {
      depts: [],
      defaultProps: {
        label: 'name',
        children: 'children',
      },
      queryParams: {
        departmentId: null,
        page: 1,
        pagesize: 10,
        keyword: ""
      },
      list: [],
      total: 0
    }
  },
  methods: {
    async getDepartment() {
      // 将列表转为树形结构
      this.depts = transListToTreeData(await getDepartment(), 0)
      // 定义默认要被选中的节点
      this.queryParams.departmentId = this.depts[0].id
      // 树组件渲染为异步, 等待其更新完毕
      this.$nextTick(() => {
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId)
      })

      this.getEmployeeList()
    },
    selectNode(node) {
      this.queryParams.departmentId = node.id
      this.queryParams.page = 1 // 重置为第一页
      this.getEmployeeList()
    },
    async getEmployeeList() {
      const { rows, total } = await apiGetEmployeeList(this.queryParams)
      this.list = rows
      this.total = total
    },
    changePage(newPage) {
      this.queryParams.page = newPage
      this.getEmployeeList()
    },
    inputChange() {
      // 防抖: 单位时间内只执行最后一次
      // this的实例上赋值了一个timer的属性
      clearTimeout(this.timer) // 清理上一次的定时器
      this.timer = setTimeout(() => {
        this.queryParams.page = 1
        this.getEmployeeList()
      }, 300)
    }
  },
  created() {
    this.getDepartment()
    this.getEmployeeList()
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
