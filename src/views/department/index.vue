<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree :data="depes" :props="defaultProps"></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Department',
  data() {
    return {
      depes: [
        {name: '传智教育', children: [{
          name: '总裁办'
        }]}, {
          name: '行政部', children: [{}]
        }
      ], // 数据属性
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  }
}
</script>

<style>

</style>
