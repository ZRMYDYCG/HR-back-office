<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree default-expand-all :data="depes" :props="defaultProps" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Department',
  data() {
    return {
      depes: [
        { name: '传智教育', children: [{
          name: '总裁办'
        }] }, {
          name: '行政部', children: [{}]
        }
      ],
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  }
}
</script>

<style>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
